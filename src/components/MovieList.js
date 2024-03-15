import { AppBar, Box, Container, IconButton, Toolbar, Typography } from '@mui/material'
import MovieCard from './MovieCard'
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { useEffect, useState } from 'react'
import axios from 'axios';
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));


export default function MovieList() {
    const [movies, setMovies] = useState([])
    const [search, setSearch] = useState('')

    const filteredMovies = movies.filter((movie) => movie.title.toLowerCase().includes(search))

    const [page, setPage] = useState(1);
    const [pageNumber, setPageNumber] = useState(0);

    const handleChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        const retrieveData = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}&api_key=5a4606e9fa5d9db42f9efe109f82b8d7`)
                setMovies(response.data.results);
                setPageNumber(response.data.total_pages)
            } catch (error) {
                console.log(error);
            }
        }
        retrieveData()
    }, [page])



    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            Movie App
                        </Typography>movie
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                onChange={(e) => setSearch(e.target.value)}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container fixed sx={{ marginTop: '4%' }}>
                <Stack spacing={2}>
                    <Pagination count={pageNumber} page={page} onChange={handleChange} />
                </Stack>
            </Container>
            <Container fixed sx={{ marginTop: '4%' }}>
                <Grid container spacing={2}>
                    {filteredMovies.map((movie, index) => (
                        <Grid key={index} lg={4}>
                            <MovieCard item={movie} />
                        </Grid>
                    ))}
                </Grid>
                <Stack spacing={2}>
                    <Pagination count={pageNumber} page={page} onChange={handleChange} />
                </Stack>
            </Container>
        </>
    )
}
