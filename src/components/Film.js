import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Box, Button, Card, CardContent, CardMedia, Container, Grid, IconButton, Pagination, Stack, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { ThemeContext } from './ThemeContext';
import { CheckLogin } from './CheckLogin';

export default function Film() {
    const [profile, setProfile] = useState(null);
    const [data, setData] = useState([]);
    const [films, setFilms] = useState([]);
    const [favoFilms, setFavo] = useState([]);
    const { dark } = useContext(ThemeContext)
    const [openDiaglog, setOpenDiaglog] = useState(false);

    const handleOpenDialog = () => {
        setOpenDiaglog(true);
    };

    const handleCloseDialog = () => {
        setOpenDiaglog(false);
    };

    const [page, setPage] = useState(1);
    const handleChangePage = (event, value) => {
        switch (value) {
            case 1:
                setFilms(data.slice(0, 6));
                break;
            case 2:
                setFilms(data.slice(6, 12));
                break;
            case 3:
                setFilms(data.slice(12, 18));
                break;
            default:
                setFilms(data.slice(0, 6));
                break;
        }
        setPage(value);
    };

    const getFavoFilm = async () => {
        try {
            const urlName = 'https://64e75fafb0fd9648b78fdde6.mockapi.io/listFavo/'
            const res = await fetch(urlName); //Prototype - Response
            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }
            const films = await res.json(); //Promise
            let arrayFavo = []
            for (let i = 0; i < films.length; i++) {
                if (films[i].userID.includes(JSON.parse(localStorage.getItem('profile'))?.id)) {
                    arrayFavo.push('true');
                } else {
                    arrayFavo.push('false');
                }
            }
            setData(films);
            setFilms(films.slice(0, 6));
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
        }).then(fillms => {
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
            arrayOfUserID.splice(index, 1); //Xóa 1 phần tử từ vị trí đó(index bắt đầu từ 1)
            await updateFavo(filmID, arrayOfUserID);
            console.log('Unfavo film: ' + filmName);
        } else {
            newValue = 'true';
            arrayOfUserID.push(userID);
            await updateFavo(filmID, arrayOfUserID);
            console.log('Favo film: ' + filmName);
        }
        setFavo(prevArray => {
            const newArray = [...prevArray];
            newArray[filmID - 1] = newValue;
            return newArray;
        });
    }

    useEffect(() => {
        getFavoFilm();
        if (localStorage.getItem('isLogin') === 'true') {
            setProfile(JSON.parse(localStorage.getItem('profile')))
        }
    }, [])
    return (
        <Container className={dark ? 'darkTheme' : 'whiteTheme'} fixed>
            <Box>
                <Grid container spacing={2}>
                    {films.map((film) => (
                        <Grid item key={film.id} xs={6} sm={4} lg={3}>
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
                                        {localStorage.getItem('isLogin') === 'true' ?
                                            <Link onClick={() => { handelFavo(film.id, film.name, favoFilms[film.id - 1], profile.id) }}>
                                                {favoFilms[film.id - 1] === 'true' ?
                                                    <StarIcon className='is_favo_icon yes' /> : <StarIcon className='is_favo_icon no' />}
                                            </Link>
                                            :
                                            <Box>
                                                <IconButton className='custom_icon_btn' onClick={handleOpenDialog}>
                                                    <StarIcon className='is_favo_icon no'>star</StarIcon>
                                                </IconButton>
                                                <CheckLogin open={openDiaglog} handleClose={handleCloseDialog} profile={profile} />
                                            </Box>

                                        }
                                    </Box>
                                    <Button className='custom_btn' variant='contained'>
                                        <Link className='custom_link' to={`detail/${film.id}`}>
                                            <Typography className='custom_txt' variant='body1'>Detail</Typography>
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Stack spacing={2} className={'custom_pagination'}>
                    <Pagination count={3} page={page} onChange={handleChangePage} />
                </Stack>
            </Box>
        </Container>
    )
}