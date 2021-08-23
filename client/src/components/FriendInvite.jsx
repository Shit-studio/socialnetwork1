import React from "react";
import userImg from '../assets/img/userImg.png';
import { AcceptIcon } from '../assets/img/accept.jsx';
import { DeclineIcon } from '../assets/img/decline.jsx';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import axios from "axios";

class Invite extends React.Component {
    constructor(props) {
        super(props);
        this.id = this.props.requesterId;
        this.acceptInvite = this.acceptInvite.bind(this);
    }

    acceptInvite() {
        toast.success("Accepted");
        axios.post("http://localhost:5000/api/users/acceptfriendinvite", {
            requesterId: this.id,
            addresseeId: this.props.auth.user.id
        });
        setTimeout(this.props.callback, 2000);
    }

    declineInvite() {
        toast.error("Declined");
        axios.post("http://localhost:5000/api/users/declinefriendinvite", {
            requesterId: this.id,
            addresseeId: this.props.auth.user.id
        });
        setTimeout(this.props.callback, 2000);
    }

    render() {
        return (
            <div className="invite">
                <img width={60} height={60} src={userImg} alt="User" />
                <div>{this.props.name} {this.props.surname}</div>
                <div className="btns">
                    <AcceptIcon acceptInvite={this.acceptInvite} />
                    <DeclineIcon declineInvite={this.declineInvite} />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Invite);