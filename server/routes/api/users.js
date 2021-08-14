const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const { User, Post, Friendship } = require("../../models");
const { response } = require("express");

router.post("/acceptfriendinvite", async (req, res) => {
  console.log(req.body);
  Friendship.update({
      status: "Accepted"
    }, {
      where: {
        requesterId: req.body.requesterId,
        addresseeId: req.body.addresseeId
      }
  })
  .then((a) => {
    console.log(a);
  })
})

router.get("/getfriendinvites", (req, res) => {
  if(req.query.userId !== "") {
    let result = [];
    User.findAll({
        raw: true, 
        where: {
          id: req.query.userId
        },
        include: [ "Requesters" ]
      })
      .then((invites) => {
        invites.map((invite) => {
          if(invite['Requesters.friendship.status'] === "Pending") {
            console.log("Invite: ", invites);
            result.push({
              id: invite['Requesters.id'],
              name: invite['Requesters.name'],
              surname: invite['Requesters.surname']
            });
          }
        })
      })
      .then(() => res.json(result))
  }
});

router.get("/getuser", (req, res) => {
  if(req.query.userId !== "") {
    User.findOne({raw: true, where: {id: req.query.userId}})
        .then((user) => {
          res.status(200).json({
            name: user.name,
            surname: user.surname
          });
        })
  }
});

router.get("/getusersfriends", async (req, res) => {
  if(req.query.userId) {
    result = [];
    
    const requesters = await User.findAll({
      raw: true,
      include: [ "Requesters" ],
      where: {
        id: req.query.userId
      }
    })

    const addressees = await User.findAll({
      raw: true,
      include: [ "Addressees" ],
      where: {
        id: req.query.userId
      }
    })
    
    requesters.map((friend) => {
      if(friend['Requesters.friendship.status'] === "Accepted" && friend['Requesters.id'] !== null) {
        result.push({
          status: friend['Requesters.friendship.status'],
          id: friend['Requesters.id'],
          name: friend['Requesters.name'],
          surname: friend['Requesters.surname']
        });
      }
    })

    addressees.map((friend) => {
      if(friend['Addressees.friendship.status'] === "Accepted" && friend['Addressees.id'] !== null) {
        result.push({
          status: friend['Addressees.friendship.status'],
          id: friend['Addressees.id'],
          name: friend['Addressees.name'],
          surname: friend['Addressees.surname']
        });
      }
    })

    console.log(result);
    res.status(200).json(result);
  }
});

router.get("/getuserposts", (req, res) => {
    if(req.query.userId) {
      result = {content: [], user: {}}
      User.findOne({where: {id: req.query.userId}})
        .then(user => {
          result.user.id = user.dataValues.id;
          result.user.username = user.dataValues.name + " " + user.dataValues.surname;
          user.getPosts().then(posts => {
            posts.map((post) =>  
              result.content.push({
                id: post.dataValues.id,
                caption: post.dataValues.caption
              })
            );
          })
          .then(() => {
            res.json(result)
          })
        })
    }
})

router.post("/addfriendship", (req, res) => {
  Friendship.create(req.body);
  res.status(200)
})

router.get("/getposts", (req, res) => {
  result = []
  Post.findAll({include: [ User ], order: [['updatedAt',  'DESC']]})
      .then(posts => {
        posts.map((post) => {
          result.push(
            {
              id: post.dataValues.id,
              caption: post.dataValues.caption,
              username: post.dataValues.user.dataValues.name + " " + post.dataValues.user.dataValues.surname,
              userId: post.dataValues.user.dataValues.id
            }
          );
          })
      })
        .then(() => res.json(result))
      

})

router.post("/createpost", (req, res) => {
  Post.create({
    userId: req.body.userId,
    caption: req.body.caption
  });
  res.status(200);
})

router.post("/register", (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ where: { email: req.body.email }})
        .then(user => {
            if (user) {
                return res.status(400).json({email: "Email already exists!"})
            } else {

                const newUser = User.build({
                    name: req.body.name,
                    surname: req.body.surname,
                    email: req.body.email,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    })
                })


            }
        });
})


router.post("/login", (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({where: { email: req.body.email }}).then(user => {
        if (!user) {
          return res.status(404).json({ emailnotfound: "Email not found" });
        }

        bcrypt.compare(req.body.password, user.password).then(isMatch => {
          if (isMatch) {
            const payload = {
              id: user.id,
              name: user.name,
              surname: user.surname
            };

            jwt.sign(
              payload,
              keys.secretOrKey,
              {
                expiresIn: 31556926
              },
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token
                });
              }
            );
          } else {
            return res
              .status(400)
              .json({ passwordincorrect: "Password incorrect" });
          }
        });
      });
});

module.exports = router;