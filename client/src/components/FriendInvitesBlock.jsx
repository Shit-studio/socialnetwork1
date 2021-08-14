import React from "react";
import Invite from "./FriendInvite.jsx";
import { connect } from "react-redux";
import axios from "axios";
import "../scss/Invites.scss";

class FriendInvatesBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invites: []
        }
    }

    componentDidMount() {
        console.log(this.props);
        axios.get("http://localhost:5000/api/users/getfriendinvites?userId=" + this.props.auth.user.id)
             .then((invites) => {
                
                this.setState({
                    invites: invites.data
                })
             })
    }

    render() {
        return(
            <div className="invitesBlock">
                    {this.state.invites.length > 0 &&
                        <div id="title">
                            Запити
                        </div>
                    }
                    {this.state.invites.length > 0 &&
                        this.state.invites.map((invite) => <Invite requesterId={invite.id} name={invite.name} surname={invite.surname} />)
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