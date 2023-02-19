import React, {useState} from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import {useSelector} from "react-redux";
import axios from "../../axios";

export const Index = ({postID, setTest, test}) => {

    const userData = useSelector(state => state.auth.data)

    const [value, setValue] = useState('')

    const sendComment = () => {
        const comment = axios.post(`/comments/${postID}`, {
            content: value
        })

        setValue('')
        setTest(test + 1)
    }

    return (
        <>
            <div className={styles.root}>
                <Avatar
                    classes={{root: styles.avatar}}
                    src={userData.avatarUrl}
                />
                <div className={styles.form}>
                    <TextField
                        label="Write comment"
                        variant="outlined"
                        maxRows={10}
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        multiline
                        fullWidth
                    />
                    <Button onClick={sendComment} variant="contained">Send</Button>
                </div>
            </div>
        </>
    );
};
