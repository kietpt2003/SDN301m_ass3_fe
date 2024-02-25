import React, { useContext, useEffect, useState } from 'react'
import { news } from '../Shared/ListOfNews';
import { Link } from 'react-router-dom';
import { Box, Button, Card, CardContent, CardMedia, Container, Grid, IconButton, Tab, Tabs, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { blue, grey, yellow } from '@mui/material/colors';
import { ThemeContext } from './ThemeContext';
import { makeStyles } from '@material-ui/core';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function News() {
    const [profile, setProfile] = useState(null);
    const [data, setData] = useState([]);
    const [favoFilms, setFavo] = useState([]);
    const [value, setValue] = useState(0);

    const { dark } = useContext(ThemeContext)
    const useStyle = makeStyles(() => ({
        darkTheme: {
            '& .custom_tabs': {
                borderBottom: 1,
                borderColor: 'divider',
                '& .MuiTabs-flexContainer': {//đổi màu background tabs
                    borderRadius: '1rem',
                    display: 'flex',
                    justifyContent: 'center',
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
                padding: '1rem 0 1rem 0'
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
                    justifyContent: 'center',
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
                padding: '1rem 0 1rem 0'
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

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const getFavoFilm = async () => {
        try {
            const urlName = 'https://64e75fafb0fd9648b78fdde6.mockapi.io/listFavo/'
            const res = await fetch(urlName);
            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }
            const films = await res.json();
            let arrayFavo = []
            for (let i = 0; i < films.length; i++) {
                if (films[i].userID.includes(JSON.parse(localStorage.getItem('profile')).id)) {
                    arrayFavo.push('true');
                } else {
                    arrayFavo.push('false');
                }
            }
            setData(films);
            setFavo(arrayFavo);
        } catch (error) {
            console.log(error)
        }
    }
    const getArrayUserID = async (name) => {
        try {
            const urlName = 'https://64e75fafb0fd9648b78fdde6.mockapi.io/listFavo/?name=' + name
            const res = await fetch(urlName);
            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }
            const film = await res.json();
            return film[0].userID;
        } catch (error) {
            console.log(error)
        }
    }

    const updateFavo = async (filmID, userID) => {
        const urlUpdate = 'https://64e75fafb0fd9648b78fdde6.mockapi.io/listFavo/' + filmID
        fetch(urlUpdate, {
            method: 'PUT', // or PATCH
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ userID: userID })
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            // handle error
        }).then(films => {
            // Do something with updated task
        }).catch(error => {
            // handle error
        })
    }

    const handelFavo = async (filmID, filmName, notFavo, userID) => {
        let newValue;
        let arrayOfUserID = await getArrayUserID(filmName);
        const index = arrayOfUserID.indexOf(userID);
        if (notFavo === 'true') {
            newValue = 'false';
            arrayOfUserID.splice(index, 1); //Xóa 1 phần tử từ vị trí đó(do index truyền vô là id mà id bắt đầu từ 1)
            console.log('sau: ' + arrayOfUserID.length);
            await updateFavo(filmID, arrayOfUserID);
            console.log('Unfavo');
        } else {
            newValue = 'true';
            arrayOfUserID.push(userID);
            await updateFavo(filmID, arrayOfUserID);
            console.log('Favo')
        }
        setFavo(prevArray => {
            const newArray = [...prevArray];
            newArray[filmID - 1] = newValue;
            return newArray;
        });
    }
    function isValidURL(str) {
        // Tạo một biểu thức chính quy để kiểm tra đường dẫn
        // Biểu thức chính quy này kiểm tra xem chuỗi có bắt đầu bằng 'http', 'https' hay không
        let pattern = /^(http(s)?:\/\/)[\w-]+(\.[a-z]{2,})(:\d{1,5})?(.*)?$/;
        // Sử dụng test() để kiểm tra chuỗi với biểu thức chính quy
        return pattern.test(str);
    }

    useEffect(() => {
        if (localStorage.getItem('isLogin') === 'true') {
            setProfile(JSON.parse(localStorage.getItem('profile')));
            getFavoFilm();
        }
    }, [])
    return (
        <Container className={dark ? classes.darkTheme : classes.whiteTheme}>
            <Box className='custom_tabs'>
                <Tabs value={value} onChange={handleChange}>
                    <Tab className={'custom_tab'} label="Your Favorite" {...a11yProps(0)} />
                    <Tab className={'custom_tab'} label="News" {...a11yProps(1)} />
                    <Tab className={'custom_tab'} label="Stars" {...a11yProps(2)} />
                    <Tab className={'custom_tab'} label="Behind The Scenes" {...a11yProps(3)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                {localStorage.getItem('isLogin') === 'true' &&
                    <Grid container spacing={2}>
                        {data.map((film) => (
                            <React.Fragment key={film.id}>
                                {favoFilms[film.id - 1] === 'true' &&
                                    <Grid item xs={6} sm={4} lg={3}>
                                        <Card className='custom_card'>
                                            <CardMedia
                                                component="img"
                                                image={film.img}
                                                alt={`Pic of ${film.name}`}
                                            />
                                            <CardContent className='custom_card_content'>
                                                <Typography className='custom_txt' variant='h5'>{film.name}</Typography>
                                                <Box className='content_favo'>
                                                    <Typography className='custom_txt' variant='h6'>Favourited: </Typography>
                                                    <IconButton onClick={() => { handelFavo(film.id, film.name, favoFilms[film.id - 1], profile.id) }}>
                                                        <StarIcon sx={{ color: yellow[700] }} />
                                                    </IconButton>
                                                </Box>
                                                <Button className='custom_btn' variant='contained'>
                                                    <Link className='custom_link' to={`http://localhost:3000/detail/${film.id}`}>
                                                        <Typography className='custom_txt' variant='body1'>Detail</Typography>
                                                    </Link>
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                }
                            </React.Fragment>
                        ))}
                    </Grid>
                }
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <Grid container spacing={2}>
                    {news.map((newsItem) => (
                        <Grid item key={newsItem.id} xs={12}>
                            <Card className='custom_card'>
                                <CardMedia
                                    component="img"
                                    image={newsItem.img}
                                    alt={`Pic of news id ${newsItem.id}`}
                                />
                                <CardContent className='custom_card_content'>
                                    <Typography className='custom_txt' variant='h5'>{newsItem.title}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <Grid container spacing={2}>
                    {news.map((newsItem) => (
                        <Grid item key={newsItem.id} xs={12}>
                            <Card className='custom_card'>
                                <CardMedia
                                    component="img"
                                    image={newsItem.star}
                                    alt={`Pic of ${newsItem.starname}`}
                                />
                                <CardContent className='custom_card_content'>
                                    <Typography className='custom_txt' variant='h5'>{newsItem.starname}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                <Grid container spacing={2}>
                    {news.map((newsItem) => (
                        <Grid item key={newsItem.id} xs={12}>
                            <Box className='custom_behind_the_scenes'>
                                <Box className='custom_film'>
                                    {isValidURL(newsItem.clip) ?
                                        <Box
                                            component="iframe"
                                            borderRadius={'1rem'}
                                            width={'99%'} height={'35em'} src={newsItem.clip} title={newsItem.id} frameBorder="0"
                                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                            allowFullScreen
                                        />
                                        :
                                        <Box className='custom_no_film'>
                                            <ErrorOutlineIcon />
                                            <Typography>We will update film soon</Typography>
                                        </Box>
                                    }

                                </Box>
                                <Box className='custom_scenes'>
                                    <Typography className='custom_txt' variant='h5'>{newsItem.clipname}</Typography>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </CustomTabPanel>
        </Container >
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