import React from 'react';
import userImg from '../assets/img/userImg.png';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import '../scss/Post.scss'

export function Post(props) {
    
    return (
        <div className="post">
            <div className="post_header">
                <div className="user">
                    <Link to={`/users/${props.userId}/`}>
                        <img width={60} height={60} src={userImg} alt="User" />
                        <div>
                            <span>{props.username}</span>
                            <span>...</span>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="post_content">
                {props.content}
            </div>
            <div className="post_btns">
                <div>
                    <span>Подобається</span>
                </div>
                <div>
                    <span>Коментувати</span>
                </div>
                <div>
                    <span>Поширити</span>
                </div>
            </div>
        </div>
    )
}

export default connect()(Post);