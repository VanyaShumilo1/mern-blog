import React from 'react';
import Button from '@mui/material/Button';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout, selectIsAuth} from "../../redux/slices/auth";

export const Header = () => {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch()
    const onClickLogout = () => {
        if(window.confirm("Are you sure you want to logout?")) {
            dispatch(logout())
        }
    };

    const userData = useSelector(state => state.auth.data)


    return (
        <div className={styles.root}>
            <Container maxWidth="lg">
                <div className={styles.inner}>
                    <Link className={styles.logo} to="/">
                        <div>VANYA'S BLOG</div>
                    </Link>
                    <div className={styles.buttons}>
                        {isAuth ? (
                            <>
                                <div>{userData.fullName}</div>
                                <Link to="/add-post">
                                    <Button variant="contained">Add post</Button>
                                </Link>
                                <Button onClick={onClickLogout} variant="contained" color="error">
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <Button variant="outlined">Login</Button>
                                </Link>
                                <Link to="/register">
                                    <Button variant="contained">Register</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
};
