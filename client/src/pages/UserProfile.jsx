import React from 'react';
import { connect } from 'react-redux';
import axios from "axios";
import GayBilly from "../assets/img/977.jpg";
import { Switch, Route, Link } from "react-router-dom";
import { UserPosts, UserFriends, UserPhotos, UserVideos } from "../components";
import "../scss/MainEpt.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';
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
        toast.info("Request are sended!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        axios.post("http://localhost:5000/api/users/addfriendship", {
          requesterId: this.props.auth.user.id,
          addresseeId: this.state.id,
          status: "Pending"
        })
        .then(() => toast("FriendShip is created!!!"))
        .catch(() => toast("Something gets wrong!!!"))
      }
    }

    render(){
        return (
            <div className="main" key={this.state.id}>
              <ToastContainer />
              <div className="dBilly">
                <div className="stylesept">
                  <div className="BillyGayTlo">
                    {/* <img  alt="?????? ??????????????" className="ebanetlo" /> */}
                  </div>
                  <div className="tipamenu">
                    <ul>
                      <Link to={`/users/${this.state.id}/posts`}>
                        <li onClick={() => this.setActiveTab(1)} className={classNames({ active: this.state.activeTab === 1 })} >??????????</li>
                      </Link>
                      <Link to={`/users/${this.state.id}/friends`}>
                        <li onClick={() => this.setActiveTab(2)} className={classNames({ active: this.state.activeTab === 2 })} >??????????</li>
                      </Link>
                      <li style={{
                        position: "relative",
                        bottom: 100
                      }}>
                        <img
                          src={GayBilly}
                          alt="?????? ??????????????"
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
                        <li onClick={() => this.setActiveTab(3)} className={classNames({ active: this.state.activeTab === 3 })} >????????</li>
                      </Link>
                      <Link to={`/users/${this.state.id}/videos`}>
                        <li onClick={() => this.setActiveTab(4)} className={classNames({ active: this.state.activeTab === 4 })} >??????????</li>
                      </Link>
                    </ul>
                  </div>
                  <div className="tipamenu2" style={{display: this.state.itsMe ? "none" : "block"}}>
                    <div><span>{this.state.user.name + " " + this.state.user.surname}</span></div>
                    <div className="tipaknopky">
                      <a href="#" style={{ marginLeft: 40 }}>?????????????????? ????????????????????????</a>
                      <a onClick={this.addFriend}>???????????? ?? ??????????</a>
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