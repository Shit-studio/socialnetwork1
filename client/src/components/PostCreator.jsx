import React from 'react';
import userImg from '../assets/img/userImg.png';
import SendIcon from '../assets/img/send.jsx';
import { useSelector, connect } from "react-redux";
import '../scss/PostCreator.scss'
import axios from 'axios';

export function PostCreator(props) {

    const [ caption, setCaption ] = React.useState();
    const [ rows, setRows ] = React.useState(2);
    const [ minRows ] = React.useState(2);
    const [ maxRows ] = React.useState(7);

    const auth = useSelector(state => state.auth);

    const onSubmit = () => {
        const newPost = {
            'userId': auth.user.id,
            'caption': caption
        }
        setCaption('');

        axios.post("http://localhost:5000/api/users/createpost", newPost);
        setTimeout(props.callback, 4000);
    }

    const handleChange = (event) => {
        const textareaLineHeight = 24;
		
		const previousRows = event.target.rows;
  	    event.target.rows = minRows; 
		
		const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);
    
        if (currentRows === previousRows) {
    	    event.target.rows = currentRows;
        }
		
		if (currentRows >= maxRows) {
			event.target.rows = maxRows;
			event.target.scrollTop = event.target.scrollHeight;
		}
    
        setCaption(event.target.value);
        setRows(currentRows < maxRows ? currentRows : maxRows);
    }

    return (
        <div className="post-creator">
            <div id="user_img">
                <img width={60} height={60} src={userImg} alt="User" />
            </div>
            <textarea 
                rows={rows}
                value={caption}
                onChange={handleChange}
            />
            <div id="btns">
                <div class="send" onClick={onSubmit}>
                    <SendIcon />
                </div>
            </div>
        </div>
    )
}
  
export default connect()(PostCreator);