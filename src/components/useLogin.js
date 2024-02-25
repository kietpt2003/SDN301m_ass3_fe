import { useContext, useEffect, useState } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Dialog } from '@mui/material';
import { blue, grey, yellow } from '@mui/material/colors';
import { ThemeContext } from './ThemeContext';
import { makeStyles } from '@material-ui/core';

export function useLogin() {
    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState(null);
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setUser(codeResponse)
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    const handleGetUserData = async () => {
        if (user.length !== 0) {
            await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    Accept: 'application/json'
                }
            })
                .then((res) => {
                    localStorage.setItem('isLogin', 'true');
                    localStorage.setItem('profile', JSON.stringify(res.data));
                    setProfile(JSON.parse(localStorage.getItem('profile')));
                    window.location.href = 'http://localhost:3000/';
                })
                .catch((err) => console.log(err));
        }
        if (localStorage.getItem('isLogin') === 'true') {
            setProfile(JSON.parse(localStorage.getItem('profile')))
        }
    }

    useEffect(() => {
        handleGetUserData();
    }, [user]);

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        localStorage.removeItem('isLogin');
        localStorage.removeItem('profile');
        setProfile(null);
        window.location.href = 'http://localhost:3000/';
    };
    return {
        profile,
        login,
        logOut
    }
}

export function Login(props) {
    const { dark } = useContext(ThemeContext)
    const useStyle = makeStyles(() => ({
        darkTheme: {
            '& .css-yiavyu-MuiBackdrop-root-MuiDialog-backdrop': {
                backgroundColor: 'rgba(0, 0, 0, 0.2)',

            },
            '& .css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
                border: '0.1rem solid',
                borderColor: grey[900],
                borderRadius: '0.5rem',
                backgroundColor: grey[900]
            },
            '& .custom_btn': {
                '&.css-1e6y48t-MuiButtonBase-root-MuiButton-root': {
                    color: 'white',
                    textTransform: 'none',
                    border: '0.1rem solid white',
                    backgroundColor: grey[800]
                },
                '&.css-1e6y48t-MuiButtonBase-root-MuiButton-root:hover': {
                    backgroundColor: grey[900]
                }
            },
            '& .custom_dialog_text': {
                '&.css-bdhsul-MuiTypography-root-MuiDialogTitle-root': {
                    color: 'white',
                    paddingBottom: '0.2rem',
                },
                '&.css-qfso29-MuiTypography-root-MuiDialogContentText-root': {
                    color: 'white',
                    borderTop: '0.1rem solid white',

                }
            }
        },
        whiteTheme: {
            '& .css-yiavyu-MuiBackdrop-root-MuiDialog-backdrop': {
                backgroundColor: 'rgba(0, 0, 0, 0.2)',

            },
            '& .css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
                border: '0.1rem solid',
                borderColor: yellow[700],
                borderRadius: '0.5rem',
                backgroundColor: blue[900]
            },
            '& .custom_btn': {
                '&.css-1e6y48t-MuiButtonBase-root-MuiButton-root': {
                    color: 'white',
                    textTransform: 'none',
                    border: '0.1rem solid white',
                    backgroundColor: blue[800]
                },
                '&.css-1e6y48t-MuiButtonBase-root-MuiButton-root:hover': {
                    backgroundColor: yellow[700]
                }
            },
            '& .custom_dialog_text': {
                '&.css-bdhsul-MuiTypography-root-MuiDialogTitle-root': {
                    color: 'white',
                    paddingBottom: '0.2rem',
                },
                '&.css-qfso29-MuiTypography-root-MuiDialogContentText-root': {
                    color: 'white',
                    borderTop: '0.1rem solid white',

                }
            }
        }
    }))
    const classes = useStyle();

    return (
        <Dialog
            className={dark ? classes.darkTheme : classes.whiteTheme}
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            {props.children}
        </Dialog>
    );
}