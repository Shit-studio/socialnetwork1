import React from 'react';
import { PostCreator, Post } from '../components';
import FriendInvitesBlock from '../components/FriendInvitesBlock';
import { useSelector, connect } from 'react-redux';
import axios from 'axios';
import "../scss/Home.scss";

export class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            posts: []        
        }

        this.fetchPosts = this.fetchPosts.bind(this);
    }

    fetchPosts() {
        axios.get('http://localhost:5000/api/users/getposts')
             .then(res => {
                 console.log("Reload...");
                this.setState({
                    posts: res.data
                })
            })
    }

    componentDidMount() {
        this.fetchPosts();
    }

    // const [ isLoaded, setIsLoaded ] = React.useState(false);

    // React.useEffect(() => {
    //     axios.get('http://localhost:5000/api/users/getposts')
    //          .then(res => {
    //             result = res.data;
    //             console.log(result);
    //             setIsLoaded(true);
                
    //         })
    // })

    render() {
    return (
        <div id="home">
            <div id="primary">
                <PostCreator callback={this.fetchPosts} />
                {
                    this.state.posts.map((post, key) => <Post key={key} userId={post.userId} username={post.username} content={post.caption} />)
                }
            </div>
            <div id="secondary">
                <FriendInvitesBlock />
            </div>
        </div>
    )
    }
}

export default Home;
// export default connect()(Home);