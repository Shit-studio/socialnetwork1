import React from 'react'
import GayBilly from "../assets/img/977.jpg";
import { Link } from "react-router-dom";
import "../scss/Friend.scss";

export function Friend(props) {
    return (
        
        <div className="Friend">
            <Link to={`/users/${props.id}/`}>
            <img
                src={GayBilly}
                alt="Тло профілю"
                style={{
                    borderRadius: "50%",
                    height: 130,
                    width: 130,
                    overflow: "hidden",
                    objectFit: "cover",
                    marginTop: 34
                }}
            />
            <p>{props.name} {props.surname}</p>
            </Link>
            <a className="btn" href="https://www.pornhub.com/video/search?search=girlscore" target="_blank" rel="noreferrer">Надіслати повідомлення</a>
        </div>
        
    );
}
