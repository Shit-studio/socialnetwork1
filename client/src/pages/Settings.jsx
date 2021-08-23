import React from 'react';
import '../scss/Settings.scss';
import { Route, Switch, Link } from "react-router-dom";
import axios from 'axios';

function Profile(props) {

    const [file, setFile] = React.useState(null);


    async function onFormSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        try {
            const response = await axios.post("http://localhost:5000/api/users/uploaduseravatar", formData, config);
            console.log(response);
        } catch {
            console.log("Error");
        }
    }   
    
    return (
        <form onSubmit={onFormSubmit}>
            <input type="file" name="image" onChange={(e) => setFile({file: e.target.files})} />
            {console.log(file)}
            <button className="upload-button" type="submit">Upload</button>
        </form>
    )
}

function Test1() {
    return (
        <div>Test1</div>
    )
}

function Test2() {
    return (
        <div>Test2</div>
    )
}

function Test3() {
    return (
        <div>Test3</div>
    )
}

export function Settings() {
    return (
        <div id="page">
            <div id="main">
                <div id="navigation">
                    <ul>
                        <Link to="/settings/profile">
                            <li className="active">
                                Профіль
                            </li>
                        </Link>
                        <Link to="/settings/1">
                            <li className="">
                                1
                            </li>
                        </Link>
                        <Link to="/settings/2">
                            <li className="">
                                2
                            </li>
                        </Link>
                        <Link to="/settings/3">
                            <li className="">
                                3
                            </li>
                        </Link>
                    </ul>
                </div>
                <div id="content">
                    <Switch>
                        <Route exact path="/settings/profile" component={Profile} />
                        <Route exact path="/settings/1" component={Test1} />
                        <Route exact path="/settings/2" component={Test2} />
                        <Route exact path="/settings/3" component={Test3} />
                    </Switch>
                </div>
            </div>
        </div>
    )
}