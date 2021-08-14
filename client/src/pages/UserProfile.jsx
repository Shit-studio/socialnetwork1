import React from 'react';
import { connect } from 'react-redux';
import axios from "axios";
import GayBilly from "../assets/img/977.jpg";
import { Switch, Route, Link } from "react-router-dom";
import { UserPosts, UserFriends, UserPhotos, UserVideos } from "../components";
import "../scss/MainEpt.scss";
import classNames from "classnames";

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        const { id } = this.props.match.params;
        this.id = Number(id);
        this.state = {
            user: {
              name: "",
              surname: ""
            },
            activeTab: 0
          }
      
          this.addFriend = this.addFriend.bind(this);
          this.setActiveTab = this.setActiveTab.bind(this);
    }

    componentDidMount() {
        axios.get("http://localhost:5000/api/users/getuser?userId=" + this.id)
             .then((user) => {
               console.log("aaaaaaaaaaaa", user);
               this.setState({
                 user: user.data
               })
        })
    }

    setActiveTab(tab) {
        this.setState({
          activeTab: tab
        });
      }
    
      addFriend() {
        if(this.id !== this.props.auth.user.id){
          axios.post("http://localhost:5000/api/users/addfriendship", {
            requesterId: this.props.auth.user.id,
            addresseeId: this.id,
            status: "Pending"
          })
          .then(() => console.log("FriendShip is created!!!"))
        } else {
          console.log("Fuck you!!!");
        }
      }

    render(){
        return (
            <div className="main">
              <div className="dBilly">
                <div className="stylesept">
                  <div className="BillyGayTlo">
                    {/* <img  alt="Тло профілю" className="ebanetlo" /> */}
                  </div>
                  <div className="tipamenu">
                    <ul>
                      <Link to={`/users/${this.id}/posts`}>
                        <li onClick={() => this.setActiveTab(1)} className={classNames({ active: this.state.activeTab === 1 })} >Пости</li>
                      </Link>
                      <Link to={`/users/${this.id}/friends`}>
                        <li onClick={() => this.setActiveTab(2)} className={classNames({ active: this.state.activeTab === 2 })} >Друзі</li>
                      </Link>
                      <li style={{
                        position: "relative",
                        bottom: 100
                      }}>
                        <img
                          src={GayBilly}
                          alt="Тло профілю"
                          style={{
                            borderRadius: "50%",
                            height: 207,
                            width: 207,
                            overflow: "hidden",
                            objectFit: "cover",
                          }}
                        />
                      </li>
                      <Link to={`/users/${this.id}/photos`}>
                        <li onClick={() => this.setActiveTab(3)} className={classNames({ active: this.state.activeTab === 3 })} >Фото</li>
                      </Link>
                      <Link to={`/users/${this.id}/videos`}>
                        <li onClick={() => this.setActiveTab(4)} className={classNames({ active: this.state.activeTab === 4 })} >Відео</li>
                      </Link>
                    </ul>
                  </div>
                  <div className="tipamenu2">
                    <div><span>{this.state.user.name + " " + this.state.user.surname}</span></div>
                    <div className="tipaknopky">
                      <a href="#" style={{ marginLeft: 40 }}>Надіслати повідомлення</a>
                      <a onClick={this.addFriend}>Додати в друзі</a>
                    </div>
                  </div>
                </div>
              </div>
                <Switch>
                  <Route path='/users/:id/posts' component={UserPosts} />
                  <Route path='/users/:id/friends' component={UserFriends} />
                  <Route path='/users/:id/photos' component={UserPhotos} />
                  <Route path='/users/:id/videos' component={UserVideos} />
                </Switch>
            </div>
          );
        }
}

function mapStateToProps(state){
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(UserProfile);