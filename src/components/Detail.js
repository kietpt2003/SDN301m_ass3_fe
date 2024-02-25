import { useParams } from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react'
import ModalCase from './ModalCase';
import { ThemeContext } from './ThemeContext';
import axios from 'axios';
import { Box, Button, Container, Typography, styled } from '@mui/material';
import { blue, grey, yellow } from '@mui/material/colors';
import { makeStyles } from '@material-ui/core';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function Detail() {
    const { dark } = useContext(ThemeContext)
    const useStyle = makeStyles(() => ({
        darkTheme: {
            '& .custom_pagination': {
                marginTop: '0.5rem',
                '& .MuiButtonBase-root': {
                    color: 'white',
                },
                '& .css-yuzg60-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected': {
                    backgroundColor: grey[800]
                },
                '& .css-yuzg60-MuiButtonBase-root-MuiPaginationItem-root:hover': {
                    backgroundColor: grey[900]
                },
            },
            '& .custom_card_content': {
                '&.css-46bh2p-MuiCardContent-root': {
                    backgroundColor: grey[800]
                },
                '& .content_favo': {
                    display: 'flex',
                    '& .is_favo_icon': {
                        '&.yes': {
                            color: yellow[700]
                        },
                        '&.no': {
                            color: grey[400]
                        }
                    }
                },
                '& .custom_txt': {
                    '&.css-ag7rrr-MuiTypography-root': {
                        color: 'white',
                        fontFamily: 'monospace',
                    },
                    '&.css-2ulfj5-MuiTypography-root': {
                        color: 'white',
                        fontFamily: 'monospace',
                    }
                },
                '& .custom_btn': {
                    '& .custom_link': {
                        textDecoration: 'none',
                        '& .css-ahj2mt-MuiTypography-root': {
                            color: 'white',
                            fontFamily: 'monospace',
                        }
                    },
                    '&.css-sghohy-MuiButtonBase-root-MuiButton-root': {
                        textTransform: 'none',
                        border: '0.05rem solid white',
                        backgroundColor: grey[700],
                    },
                    '&.css-sghohy-MuiButtonBase-root-MuiButton-root:hover': {
                        backgroundColor: grey[900],
                    },
                },
            },
            '& .custom_film': {
                with: '100%',
                height: '35rem',
                border: '0.3rem solid white',
                marginBottom: '0.5rem',
                borderRadius: '1rem',
                backgroundColor: 'black',
                color: 'whitesmoke',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                '& .custom_no_film': {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                '& .css-i4bv87-MuiSvgIcon-root': {
                    fontSize: '2rem',
                },
                '& .css-ahj2mt-MuiTypography-root': {
                    fontSize: '2rem',
                    fontFamily: 'monospace',
                }
            },
            '& .film_detail': {
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                '& .custom_img': {
                    border: '0.2rem solid white',
                    borderRadius: '1rem',
                },
                '& .detail_form': {
                    position: 'relative',
                    paddingLeft: '1rem',
                    '& .custom_txt': {
                        '&.css-gepadz-MuiTypography-root': {
                            fontFamily: 'monospace',
                        },
                        '&.css-ag7rrr-MuiTypography-root': {
                            fontFamily: 'monospace',
                        },
                        '&.css-1vf69em-MuiTypography-root': {
                            fontFamily: 'monospace',
                        },
                        '&.custom_line': {
                            borderTop: '0.1rem solid',
                            borderColor: grey[900],
                        },
                        '&.custom_description': {
                            maxHeight: '7rem'
                        }
                    },
                    '& .custom_btn': {
                        position: 'absolute',
                        bottom: 0,
                        color: 'white',
                        textTransform: 'none',
                        border: '0.05rem solid black',
                        backgroundColor: grey[900],
                        '&:hover': {
                            backgroundColor: grey[700],
                        },
                        '& .custom_txt': {
                            '&.css-ahj2mt-MuiTypography-root': {
                                fontFamily: 'monospace',
                            }
                        }
                    }
                }
            },
        },
        whiteTheme: {
            '& .custom_pagination': {
                marginTop: '0.5rem',
                '& .MuiButtonBase-root': {
                    color: blue[900],
                },
                '& .css-yuzg60-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected': {
                    color: 'white',
                    backgroundColor: blue[900]
                },
                '& .css-yuzg60-MuiButtonBase-root-MuiPaginationItem-root:hover': {
                    backgroundColor: yellow[700]
                },
            },
            '& .custom_card_content': {
                '&.css-46bh2p-MuiCardContent-root': {
                    backgroundColor: blue[900]
                },
                '& .content_favo': {
                    display: 'flex',
                    '& .is_favo_icon': {
                        '&.yes': {
                            color: yellow[700]
                        },
                        '&.no': {
                            color: grey[400]
                        }
                    }
                },
                '& .custom_txt': {
                    '&.css-ag7rrr-MuiTypography-root': {
                        color: 'white',
                        fontFamily: 'monospace',
                    },
                    '&.css-2ulfj5-MuiTypography-root': {
                        color: 'white',
                        fontFamily: 'monospace',
                    }
                },
                '& .custom_btn': {
                    '& .custom_link': {
                        textDecoration: 'none',
                        '& .css-ahj2mt-MuiTypography-root': {
                            color: 'white',
                            fontFamily: 'monospace',
                        }
                    },
                    '&.css-sghohy-MuiButtonBase-root-MuiButton-root': {
                        textTransform: 'none',
                        border: '0.05rem solid white',
                        backgroundColor: blue[800],
                    },
                    '&.css-sghohy-MuiButtonBase-root-MuiButton-root:hover': {
                        backgroundColor: yellow[700],
                    },
                },
            },
            '& .custom_film': {
                with: '100%',
                height: '35rem',
                border: '0.3rem solid',
                borderColor: blue[900],
                marginBottom: '0.5rem',
                borderRadius: '1rem',
                backgroundColor: blue[900],
                color: 'whitesmoke',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                '& .custom_no_film': {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                '& .css-i4bv87-MuiSvgIcon-root': {
                    fontSize: '2rem',
                },
                '& .css-ahj2mt-MuiTypography-root': {
                    fontSize: '2rem',
                    fontFamily: 'monospace',
                }
            },
            '& .film_detail': {
                color: blue[900],
                display: 'flex',
                justifyContent: 'space-between',
                '& .custom_img': {
                    border: '0.2rem solid',
                    borderColor: blue[900],
                    borderRadius: '1rem',
                },
                '& .detail_form': {
                    position: 'relative',
                    paddingLeft: '1rem',
                    '& .custom_txt': {
                        '&.css-gepadz-MuiTypography-root': {
                            fontFamily: 'monospace',
                        },
                        '&.css-ag7rrr-MuiTypography-root': {
                            fontFamily: 'monospace',
                        },
                        '&.css-1vf69em-MuiTypography-root': {
                            fontFamily: 'monospace',
                        },
                        '&.custom_line': {
                            borderTop: '0.1rem solid',
                            borderColor: blue[900],
                        },
                        '&.custom_description': {
                            maxHeight: '7rem'
                        }
                    },
                    '& .custom_btn': {
                        position: 'absolute',
                        bottom: 0,
                        color: 'white',
                        textTransform: 'none',
                        border: '0.05rem solid black',
                        backgroundColor: blue[900],
                        '&:hover': {
                            backgroundColor: yellow[700],
                        },
                        '& .custom_txt': {
                            '&.css-ahj2mt-MuiTypography-root': {
                                fontFamily: 'monospace',
                            }
                        }
                    }
                }
            }
        }
    }))
    const classes = useStyle();
    const [isOpen, setIsOpen] = useState(false);
    const userName = useParams();
    const [film, setFilm] = useState(null);
    const getFilm = async () => {
        await axios.get('https://64e75fafb0fd9648b78fdde6.mockapi.io/listFavo', {
            params: {
                id: userName.id
            }
        })
            .then(response => {
                if (response.data) {
                    setFilm(response.data[0]);
                }
            })
            .catch(error => {
                console.error(error);
            }
            )
    }
    function isValidURL(str) {
        // Tạo một biểu thức chính quy để kiểm tra đường dẫn
        // Biểu thức chính quy này kiểm tra xem chuỗi có bắt đầu bằng 'http', 'https' hay không
        let pattern = /^(http(s)?:\/\/)[\w-]+(\.[a-z]{2,})(:\d{1,5})?(.*)?$/;
        // Sử dụng test() để kiểm tra chuỗi với biểu thức chính quy 
        return pattern.test(str);
    }
    useEffect(() => {
        getFilm()
    }, [])
    return (
        <Container className={dark ? classes.darkTheme : classes.whiteTheme}>
            <Box className='custom_film'>
                {isValidURL(film?.filmURL) ?
                    <Box
                        component={'iframe'}
                        borderRadius={'1rem'}
                        width={'100%'} height={'35rem'} src={film?.filmURL} frameBorder="0"
                        allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                    />
                    :
                    <Box className='custom_no_film'>
                        <ErrorOutlineIcon />
                        <Typography>We will update film soon</Typography>
                    </Box>
                }
            </Box>
            {isOpen && <ModalCase isOpen={isOpen} setIsOpen={setIsOpen} film={film} dark={dark} />}
            {dark ? <FilmDetail film={film} setIsOpen={setIsOpen} /> : <FilmDetail film={film} setIsOpen={setIsOpen} />}
        </Container>
    )
}

function FilmDetail(props) {
    const film = props.film;
    return (
        <Box className='film_detail'>
            <Box className='custom_img' component={'img'} alt={`Picture of ${film?.name}`} src={film?.img} />
            <Box className='detail_form'>
                <Typography className='custom_txt' variant='h3'>{film?.name}</Typography>
                <Typography className='custom_txt custom_line' variant='h5'>Ticket price: € {film?.cost}</Typography>
                <Typography className='custom_txt custom_line' variant='h5'>Description:</Typography>
                <Typography className='custom_txt custom_description' variant='body1' overflow={'auto'}>{film?.info}</Typography>
                <Button className='custom_btn' onClick={() => props.setIsOpen(true)}>
                    <Typography className='custom_txt' variant='body1'>Watch Trailer</Typography>
                </Button>
            </Box>
        </Box>
    )
}


