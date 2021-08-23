import React from "react";
import Invite from "./FriendInvite.jsx";
import { connect } from "react-redux";
import axios from "axios";
import "../scss/Invites.scss";

import { ToastContainer } from 'react-toastify';

class FriendInvatesBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invites: []
        }

        this.fetchInvites = this.fetchInvites.bind(this);
    }

    fetchInvites() {
        console.log("aaaasd");
        axios.get("http://localhost:5000/api/users/getfriendinvites?userId=" + this.props.auth.user.id)
             .then((invites) => {
                
                this.setState(() => ({
                    invites: invites.data
                }))
                console.log(invites);
             })
    }

    componentDidMount() {
        this.fetchInvites();
    }

    renderInviteList() {
        
    }

    render() {
        return(
            <div className="invitesBlock">
                    <ToastContainer />
                    {this.state.invites.length > 0 &&
                        <div id="title">
                            Запити
                        </div>
                    }
                    {this.state.invites.length > 0 &&
                        this.state.invites.map((invite) => <Invite key={invite.id} requesterId={invite.id} name={invite.name} surname={invite.surname} callback={this.fetchInvites} />)
                    }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(FriendInvatesBlock);