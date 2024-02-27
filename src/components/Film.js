import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Box, Button, Card, CardContent, CardMedia, Container, Grid, IconButton, Pagination, Stack, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { ThemeContext } from './ThemeContext';
import { CheckLogin } from './CheckLogin';
import axios from 'axios';

export default function Film() {
    const [profile, setProfile] = useState(null);
    const [data, setData] = useState([]);
    const [films, setFilms] = useState([]);
    const [favoFilms, setFavo] = useState([]);
    const { dark } = useContext(ThemeContext)
    const [openDiaglog, setOpenDiaglog] = useState(false);
    const [page, setPage] = useState(1);
    const [flowers, setFlowers] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    const getFlowersByPage = async (page) => {
        try {
            const res = await axios.get(`http://localhost:8080/api/Orchids?page=${page.toString()}`)
            setFlowers(res.data.data.orchidsArr);
            setTotalPages(res.data.data.totalPages);
            setPage(res.data.data.page);
            console.log('check data: ', res.data);
        } catch (error) {
            console.log("error getFlowersByPage: ", error);
        }
    }

    const handleOpenDialog = () => {
        setOpenDiaglog(true);
    };

    const handleCloseDialog = () => {
        setOpenDiaglog(false);
    };

    const handleChangePage = async (event, value) => {
        await getFlowersByPage(value);
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

    useEffect(() => {
        getFlowersByPage(page);
        if (localStorage.getItem('isLogin') === 'true') {
            setProfile(JSON.parse(localStorage.getItem('profile')))
        }
    }, [])
    return (
        // <Container className={dark ? 'darkTheme' : 'whiteTheme'} fixed>
        //     <Box>
        //         <Grid container spacing={2}>
        //             {films.map((film) => (
        //                 <Grid item key={film.id} xs={6} sm={4} lg={3}>
        //                     <Card className='custom_card'>
        //                         <CardMedia
        //                             component="img"
        //                             image={film.img}
        //                             alt={`Pic of ${film.name}`}
        //                         />
        //                         <CardContent className='custom_card_content'>
        //                             <Typography className='custom_txt' variant='h5'>{film.name}</Typography>
        //                             <Box className='content_favo'>
        //                                 <Typography className='custom_txt' variant='h6'>Favourited: </Typography>
        //                                 {localStorage.getItem('isLogin') === 'true' ?
        //                                     <Link onClick={() => { handelFavo(film.id, film.name, favoFilms[film.id - 1], profile.id) }}>
        //                                         {favoFilms[film.id - 1] === 'true' ?
        //                                             <StarIcon className='is_favo_icon yes' /> : <StarIcon className='is_favo_icon no' />}
        //                                     </Link>
        //                                     :
        //                                     <Box>
        //                                         <IconButton className='custom_icon_btn' onClick={handleOpenDialog}>
        //                                             <StarIcon className='is_favo_icon no'>star</StarIcon>
        //                                         </IconButton>
        //                                         <CheckLogin open={openDiaglog} handleClose={handleCloseDialog} profile={profile} />
        //                                     </Box>

        //                                 }
        //                             </Box>
        //                             <Button className='custom_btn' variant='contained'>
        //                                 <Link className='custom_link' to={`detail/${film.id}`}>
        //                                     <Typography className='custom_txt' variant='body1'>Detail</Typography>
        //                                 </Link>
        //                             </Button>
        //                         </CardContent>
        //                     </Card>
        //                 </Grid>
        //             ))}
        //         </Grid>
        //         <Stack spacing={2} className={'custom_pagination'}>
        //             <Pagination count={3} page={page} onChange={handleChangePage} />
        //         </Stack>
        //     </Box>
        // </Container>
        <Container className={dark ? 'darkTheme' : 'whiteTheme'} fixed>
            <Box>
                <Grid container spacing={2}>
                    {flowers.map((flower, index) => (
                        <Grid item key={flower?._id} xs={6} sm={4} lg={3}>
                            <Card className='custom_card'>
                                <CardMedia
                                    component="img"
                                    height="194"
                                    image={flower.image}
                                    alt={`Pic of ${flower.name}`}
                                />
                                <CardContent className='custom_card_content'>
                                    <Typography sx={{ fontSize: 20, color: 'white' }} className='custom_txt' variant='h6'>{flower.name}</Typography>
                                    <Typography sx={{ fontSize: 15, color: 'white' }} className='custom_txt' variant='h6'>Cate: {flower.category.categoryName}</Typography>
                                    <Button className='custom_btn' variant='contained'>
                                        <Link className='custom_link' to={`detail/${flower._id}`}>
                                            <Typography className='custom_txt' variant='body1'>Detail</Typography>
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Stack spacing={2} className={'custom_pagination'}>
                    <Pagination count={totalPages} page={page} onChange={handleChangePage} />
                </Stack>
            </Box>
        </Container>
    )
}