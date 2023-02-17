import React, {useEffect, useRef, useState} from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import {useSelector} from "react-redux";
import {selectIsAuth} from "../../redux/slices/auth";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import axios from "../../axios";

export const AddPost = () => {
    const {id} = useParams()
    const isAuth = useSelector(selectIsAuth)
    const [isLoading, setIsLoading] = useState(false)
    const [text, setText] = React.useState('')
    const [title, setTitle] = useState('')
    const [tags, setTags] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const inputFileRef = useRef(null)
    const navigate = useNavigate()
    const isEditing = Boolean(id)

    useEffect(() => {
        if (id) {
            axios.get(`/posts/${id}`).then(res => {
                setTitle(res.data.title)
                setText(res.data.text)
                setImageUrl(res.data.imageUrl)
                setTags(res.data.tags.join(','))
            })
        }
    }, [])


    const handleChangeFile = async (event) => {
        try {
            const formData = new FormData()
            const file = event.target.files[0]
            formData.append('image', file)

            const {data} = await axios.post('/upload', formData)
            setImageUrl(data.url)
        } catch (e) {
            console.log(e)
            alert('Error while uploading file')
        }
    };

    const onClickRemoveImage = () => {
        setImageUrl('')
    };

    const onChange = React.useCallback((value) => {
        setText(value);
    }, []);

    const onSubmit = async () => {
        try {
            setIsLoading(true)
            const fields = {
                title,
                tags: tags.split(','),
                imageUrl,
                text
            }

            //const {data} = await axios.post('/posts', fields)

            const {data} = isEditing
                ?  await axios.patch(`/posts/${id}`, fields)
                : await axios.post('/posts', fields)

            console.log(data)

            const _id = isEditing ? id : data._id

            navigate(`/posts/${_id}`)
        } catch (err) {
            console.log(err)
            alert('error while creating post!')
        }
    }

    const options = React.useMemo(
        () => ({
            spellChecker: false,
            maxHeight: '400px',
            autofocus: true,
            placeholder: 'Enter text...',
            status: false,
            autosave: {
                enabled: true,
                delay: 1000,
            },
        }),
        [],
    );


    if (!localStorage.getItem('token') && !isAuth) {
        return <Navigate to={'/'}/>
    }




    return (
        <Paper style={{padding: 30}}>
            <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
                Preview
            </Button>
            <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden/>
            {imageUrl && (
                <>
                    <Button variant="contained" color="error" onClick={onClickRemoveImage}>
                        Remove
                    </Button>
                    <img className={styles.image} src={`http://localhost:5000${imageUrl}`} alt="Uploaded"/>
                </>

            )}
            <br/>
            <br/>
            <TextField
                classes={{root: styles.title}}
                variant="standard"
                placeholder="Title..."
                value={title}
                onChange={e => setTitle(e.target.value)}
                fullWidth
            />
            <TextField
                value={tags}
                onChange={e => setTags(e.target.value)}
                classes={{root: styles.tags}} variant="standard" placeholder="Tags" fullWidth/>
            <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options}/>
            <div className={styles.buttons}>
                <Button onClick={onSubmit} type="submit" size="large" variant="contained">
                    {isEditing ? 'Save' : "Create post"}
                </Button>
                <a href="/">
                    <Button size="large">Cancel</Button>
                </a>
            </div>
        </Paper>
    );
};
