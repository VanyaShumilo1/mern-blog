import React, {useEffect, useState} from "react";

import {Post} from "../components";
import {Index} from "../components";
import {CommentsBlock} from "../components";
import {useParams} from "react-router-dom";
import axios from "../axios";
import ReactMarkdown from "react-markdown";

export const FullPost = () => {

    const {id} = useParams()
    const [post, setPost] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [isCommentsLoading, setIsCommentsLoading] = useState(true)

    const [comments, setComments] = useState([])
    const [test, setTest] = useState(0)
    const getComments = async () => {
        setIsCommentsLoading(false)
        const com = await axios.get(`/comments/${id}`)
        setComments(com.data)
        setIsCommentsLoading(false)
    }

    useEffect(() => {
        axios.get(`/posts/${id}`).then(res => {
            setPost(res.data)
            setIsLoading(false)
        }).catch(err => {
            alert(err)
        })

        getComments()

    }, [test])


    if(isLoading) {
        return <Post isLoading={isLoading} isFullPost/>
    }

    return (
        <>
            <Post
                id={post._id}
                title={post.title}
                imageUrl={post.imageUrl}
                user={post.user}
                createdAt={post.createdAt}
                viewsCount={post.viewsCount}
                commentsCount={3}
                tags={post.tags}
                isFullPost
            >
                <ReactMarkdown children={post.text}/>

            </Post>
            <CommentsBlock
                items={comments}
                isLoading={isCommentsLoading}
            >
                <Index postID={id} setTest={setTest} test={test}/>
            </CommentsBlock>
        </>
    );
};
