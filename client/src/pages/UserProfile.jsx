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
        this.state = {
            id: Number(this.props.match.params.id),
            user: {
              name: "",
              surname: "",
            },
            activeTab: 0,
            itsMe: this.props.auth.user.id === this.id ? true : false,
          }
      
          this.addFriend = this.addFriend.bind(this);
          this.setActiveTab = this.setActiveTab.bind(this);
          this.fetchUserData = this.fetchUserData.bind(this);
    }

    fetchUserData() {
      axios.get("http://localhost:5000/api/users/getuser?userId=" + this.state.id)
             .then((user) => {
               this.setState(() => ({
                 itsMe: this.props.auth.user.id === user.data.id ? true : false,
                 user: user.data,
               }))

        })
    }

    componentDidMount() {
      this.fetchUserData();
    }

    componentDidUpdate(prevState, newState) {
      if(this.props.match.params.id !== prevState.match.params.id) {
        newState.id = this.props.match.params.id;
        this.fetchUserData();
      }
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
            addresseeId: this.state.id,
            status: "Pending"
          })
          .then(() => console.log("FriendShip is created!!!"))
        } else {
          console.log("Fuck you!!!");
        }
      }

    render(){
        return (
            <div className="main" key={this.state.id}>
              <div className="dBilly">
                <div className="stylesept">
                  <div className="BillyGayTlo">
                    {/* <img  alt="Тло профілю" className="ebanetlo" /> */}
                  </div>
                  <div className="tipamenu">
                    <ul>
                      <Link to={`/users/${this.state.id}/posts`}>
                        <li onClick={() => this.setActiveTab(1)} className={classNames({ active: this.state.activeTab === 1 })} >Пости</li>
                      </Link>
                      <Link to={`/users/${this.state.id}/friends`}>
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
                      <Link to={`/users/${this.state.id}/photos`}>
                        <li onClick={() => this.setActiveTab(3)} className={classNames({ active: this.state.activeTab === 3 })} >Фото</li>
                      </Link>
                      <Link to={`/users/${this.state.id}/videos`}>
                        <li onClick={() => this.setActiveTab(4)} className={classNames({ active: this.state.activeTab === 4 })} >Відео</li>
                      </Link>
                    </ul>
                  </div>
                  <div className="tipamenu2" style={{display: this.state.itsMe ? "none" : "block"}}>
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