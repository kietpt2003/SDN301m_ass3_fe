import { makeStyles } from '@material-ui/core';
import { Box, Button, Modal, Typography } from '@mui/material'
import { blue, grey, yellow } from '@mui/material/colors';
import React from 'react'

export default function ModalCase(props) {
    const { isOpen, setIsOpen, film, dark } = props;
    const useStyle = makeStyles(() => ({
        darkTheme: {
            '& .custom_modal_content': {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '60%',
                border: '0.1rem solid',
                borderColor: 'white',
                borderRadius: '1rem',
                padding: '1rem',
                backgroundColor: grey[800],
                '& .custom_txt': {
                    '&.css-2ulfj5-MuiTypography-root': {
                        color: 'white',
                        fontFamily: 'monospace',
                    }
                },
                '& .custom_btn': {
                    paddingTop: '1rem',
                    display: 'flex',
                    justifyContent: 'end',
                    '& .css-1e6y48t-MuiButtonBase-root-MuiButton-root': {
                        color: 'white',
                        textTransform: 'none',
                        border: '0.05rem solid',
                        borderColor: 'white',
                        backgroundColor: grey[800],
                    },
                    '& .css-1e6y48t-MuiButtonBase-root-MuiButton-root:hover': {
                        backgroundColor: grey[900],
                    }
                }
            }
        },
        whiteTheme: {
            '& .custom_modal_content': {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '60%',
                border: '0.1rem solid',
                borderColor: yellow[700],
                borderRadius: '1rem',
                padding: '1rem',
                backgroundColor: blue[900],
                '& .custom_txt': {
                    '&.css-2ulfj5-MuiTypography-root': {
                        color: 'white',
                        fontFamily: 'monospace',
                    }
                },
                '& .custom_btn': {
                    paddingTop: '1rem',
                    display: 'flex',
                    justifyContent: 'end',
                    '& .css-1e6y48t-MuiButtonBase-root-MuiButton-root': {
                        color: 'white',
                        textTransform: 'none',
                        border: '0.05rem solid',
                        borderColor: yellow[700],
                        backgroundColor: blue[800],
                    },
                    '& .css-1e6y48t-MuiButtonBase-root-MuiButton-root:hover': {
                        backgroundColor: yellow[700],
                    }
                }
            }
        }
    }))
    const classes = useStyle();
    return (
        <Modal
            className={dark ? classes.darkTheme : classes.whiteTheme}
            open={isOpen}
            onClose={() => { setIsOpen(false) }}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box className='custom_modal_content'>
                <Typography className='custom_txt' variant='h6'>{film.name} - Trailer</Typography>
                <Box
                    component={'iframe'}
                    width={'100%'} height={400} src={film.clip} title={film.name} frameBorder="0"
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                />
                <Box className='custom_btn'>
                    <Button onClick={() => { setIsOpen(false) }}>Close</Button>
                </Box>
            </Box>
        </Modal>
    )
}
