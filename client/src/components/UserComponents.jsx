import React from 'react';
import { Friend, Ass, Post } from "../components";
import axios from 'axios';

export class UserPosts extends React.Component {
    constructor(props) {
        super(props);
        const { id } = this.props.match.params;
        this.state = {
            // posts: {},
            userId: id
        }
    }

    componentDidMount() {
        console.log(this.state.userId);
        axios.get('http://localhost:5000/api/users/getuserposts?userId=' + this.state.userId)
             .then(res => {
                this.setState({
                    posts: res.data
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
    
    render(){
        return (
            <div className="user_posts">
               {this.state.posts &&
                   this.state.posts.content.reverse().map((post) => {
                       return <Post userId={this.state.posts.user.id} username={this.state.posts.user.username} content={post.caption} />
                   })
               }
            </div>
        )
    }
}

export class UserFriends extends React.Component {
    constructor(props) {
        super(props);
        const { id } = this.props.match.params;
        this.state = {
            userId: id,
            friends: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:5000/api/users/getusersfriends?userId=" + this.state.userId)
             .then((res) => {
                 console.log(res);
                 this.setState({friends: res.data});
             })
    }
    
    render(){
        return (
            <div className="jopaBilly">
                <div className="avakus">
                    {
                        this.state.friends.map((friend) => <Friend {...friend} />)
                    }
                </div>
            </div>
        )
    }
}

export function UserPhotos() {
    return (
        <div className="jopaBilly">
           Posts
        </div>
    )
}

export function UserVideos() {
    return (
        <div className="jopaBilly">
           Posts
        </div>
    )
}