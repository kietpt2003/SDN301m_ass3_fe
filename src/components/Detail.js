import { useParams } from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react'
import ModalCase from './ModalCase';
import { ThemeContext } from './ThemeContext';
import axios from 'axios';
import { Box, Button, Card, CardMedia, Container, Grid, Tab, Tabs, Typography, styled } from '@mui/material';
import { blue, grey, yellow } from '@mui/material/colors';
import { makeStyles } from '@material-ui/core';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import StarIcon from '@mui/icons-material/Star';

export default function Detail() {
    const [isOpen, setIsOpen] = useState(false);
    const flowerParams = useParams();
    const [film, setFilm] = useState(null);
    const [flower, setFlower] = useState(null);
    const [averageRating, setAverage] = useState(0);
    const [tab, setTab] = useState(0);

    const getFlowerById = async () => {
        await axios.get(`http://localhost:8080/api/Orchids/${flowerParams.id}`)
            .then(response => {
                if (response.data) {
                    console.log('check data: ', response.data);
                    // setFilm(response.data[0]);
                    setFlower(response.data.data);
                    setAverage(handleAverageRating(response.data.data.comments));
                    // console.log('check rating: ', averageRating);
                }
            })
            .catch(error => {
                console.error(error);
            }
            )
    }

    const handleAverageRating = (commentsArr) => {
        if (!commentsArr || commentsArr.length === 0) {
            return 0;
        }

        const totalRatings = commentsArr.reduce((sum, comment) => sum + comment.rating, 0);
        const averageRating = totalRatings / commentsArr.length;

        return averageRating;
    }

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };
    const { dark } = useContext(ThemeContext)
    const useStyle = makeStyles(() => ({
        darkTheme: {
            '& .custom_tabs': {
                borderBottom: 1,
                borderColor: 'divider',
                '& .MuiTabs-flexContainer': {//đổi màu background tabs
                    borderRadius: '1rem',
                    display: 'flex',
                    justifyContent: 'space-around',
                    backgroundColor: grey[800],
                },
                '& .MuiTabs-indicator': {//gạch chân cái đang chọn
                    backgroundColor: grey['A100'],
                },
                '& .custom_tab': {
                    '&.css-1h9z7r5-MuiButtonBase-root-MuiTab-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontFamily: 'monospace',
                    },
                    '&.css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected.Mui-selected': {
                        color: 'white',
                    },
                    '&.css-1h9z7r5-MuiButtonBase-root-MuiTab-root:hover': {
                        color: yellow[700],
                    },
                }
            },
            '& .custom_tab_panel': {
                padding: '1rem 0rem 1rem 0.5rem'
            },
            '& .custom_card': {
                '&.css-bhp9pd-MuiPaper-root-MuiCard-root': {
                    border: '0.25rem solid',
                    borderColor: grey[900],
                    borderRadius: '1rem',
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
                }
            },
            '& .custom_behind_the_scenes': {
                border: '0.3rem solid',
                borderColor: grey[800],
                borderRadius: '1rem',
                backgroundColor: grey[800],
                '& .custom_film': {
                    with: '100%',
                    height: '35rem',
                    border: '0.1rem solid',
                    borderColor: grey[800],
                    borderRadius: '1rem',
                    marginTop: '0.3rem',
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
                '& .custom_scenes': {
                    '& .custom_txt': {
                        '&.css-ag7rrr-MuiTypography-root': {
                            padding: '0.4rem',
                            color: 'white',
                            fontFamily: 'monospace',
                        },
                    },
                }
            }
        },
        whiteTheme: {
            '& .custom_tabs': {
                borderBottom: 1,
                borderColor: 'divider',
                '& .MuiTabs-flexContainer': {//đổi màu background tabs
                    borderRadius: '1rem',
                    backgroundColor: blue[900],
                    display: 'flex',
                    justifyContent: 'space-around',
                },
                '& .MuiTabs-indicator': {//gạch chân cái đang chọn
                    backgroundColor: yellow[700],
                },
                '& .custom_tab': {
                    '&.css-1h9z7r5-MuiButtonBase-root-MuiTab-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontFamily: 'monospace',
                    },
                    '&.css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected.Mui-selected': {
                        color: 'white',
                    },
                    '&.css-1h9z7r5-MuiButtonBase-root-MuiTab-root:hover': {
                        color: yellow[700],
                    },
                }
            },
            '& .custom_tab_panel': {
                padding: '1rem 0rem 1rem 0.5rem'
            },
            '& .custom_card': {
                '&.css-bhp9pd-MuiPaper-root-MuiCard-root': {
                    border: '0.25rem solid',
                    borderColor: blue[900],
                    borderRadius: '1rem',
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
                }
            },
            '& .custom_behind_the_scenes': {
                border: '0.3rem solid',
                borderColor: blue[900],
                borderRadius: '1rem',
                backgroundColor: blue[900],
                '& .custom_no_film': {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                '& .custom_film': {
                    with: '100%',
                    height: '35rem',
                    border: '0.1rem solid',
                    borderColor: blue[900],
                    borderRadius: '1rem',
                    marginTop: '0.3rem',
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
                '& .custom_scenes': {
                    '& .custom_txt': {
                        '&.css-ag7rrr-MuiTypography-root': {
                            padding: '0.4rem',
                            color: 'white',
                            fontFamily: 'monospace',
                        },
                    },
                }
            }
        }
    }))

    const classes = useStyle();

    const getFilm = async () => {
        await axios.get('https://64e75fafb0fd9648b78fdde6.mockapi.io/listFavo', {
            params: {
                id: flowerParams.id
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
        // getFilm();
        getFlowerById();
    }, [])
    return (
        <Container className={dark ? classes.darkTheme : classes.whiteTheme}>
            <Card className='custom_card'>
                <CardMedia
                    component="img"
                    height="300"

                    image={flower?.image}
                    alt={`Pic of ${flower?.name}`}
                />
            </Card>

            <Box className='custom_tabs' marginTop={5}>
                <Tabs value={tab} onChange={handleChange}>
                    <Tab className={'custom_tab'} label="The Details" {...a11yProps(0)} />
                    <Tab className={'custom_tab'} label={`Ratings & Reviews (${flower?.comments.length})`} {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={tab} index={0}>
                <Grid container spacing={1}>
                    <Box flexDirection={'column'} display={'flex'} padding={'1rem'}>
                        <Box width={'70em'} display={'flex'} justifyContent={'center'}>
                            <Typography variant='h4'>{flower?.name}</Typography>
                        </Box>
                        <Box>
                            <Box>
                                <Box flexDirection={'row'} display={'flex'} alignItems={'center'}>
                                    <StarIcon sx={{ color: '#fbc02d' }} />
                                    <Typography sx={{ fontSize: 19 }}>({averageRating})</Typography>
                                </Box>
                                <Box flexDirection={'column'} display={'flex'}>
                                    <Typography variant='p'>Cate: {flower?.category.categoryName}</Typography>
                                    <Typography variant='p'>Is nature: {flower?.isNatural == true ? 'Natural' : 'Not natural'}</Typography>
                                    <Typography variant='p'>From: {flower?.origin}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </CustomTabPanel>
            <CustomTabPanel value={tab} index={1}>
                <Grid container spacing={1}>
                    <Box flexDirection={'column'} display={'flex'}>
                        <Typography variant='h4'>Discussion</Typography>
                        {flower?.comments.map((comment, index) => (
                            <Box key={index} flexDirection={'column'} alignItems={'center'} display={'flex'}>
                                <Box width={'40rem'} flexDirection={'row'} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                                    <Typography variant='h5'>{comment.author.username}</Typography>
                                    <Box flexDirection={'row'} display={'flex'} alignItems={'center'}>
                                        <StarIcon sx={{ color: '#fbc02d' }} />
                                        <Typography sx={{ fontSize: 19 }}>{comment.rating}</Typography>
                                    </Box>

                                </Box>
                                <Box width={'40rem'} flexDirection={'row'} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                                    <Typography>{comment.comment}</Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Grid>
            </CustomTabPanel>
            {/* <Box className='custom_film'>
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
            {dark ? <FilmDetail film={film} setIsOpen={setIsOpen} /> : <FilmDetail film={film} setIsOpen={setIsOpen} />} */}
        </Container>
    )
}

function CustomTabPanel(props) {
    const { children, value, index } = props;
    return (
        <Box>
            {value === index && (
                <Box className='custom_tab_panel'>
                    {children}
                </Box>
            )}
        </Box>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
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


