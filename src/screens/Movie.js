import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../components/Title';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { getMovies } from '../api/movies';
import { getActors } from '../api/actors';
import { getGenres } from '../api/genres';
import { map } from 'lodash';
import { ModalMovie } from '../components/ModalMovie';
import { ModalVerInfo } from '../components/ModalVerInfo';

//EStilos a ser usados dentro del componente
const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

//Función principal a ser usado para mostrar el listado de Películas
export default function Movies() {
  const classes = useStyles();
  const [movies, setMovies] = useState(null); //Recibe el listado de peliculas
  const [actors, setActors] = useState(null); //Recibe el lsitado de actores
  const [genres, setGenres] = useState([]); //Recibe el listado de géneros

  //Recibe desde la API el listado de películas
  useEffect(() => {
    getMovies().then((response) => {
      //console.log(response);
      setMovies(response);
    });
  }, [movies]);

  //Recibe desde la API el listado de actores
  useEffect(() => {
    getActors().then((response) => {
      setActors(response);
    });
  }, []);

  //Recibe desde la API el listado de géneros
  useEffect(() => {
    getGenres().then((response) => {
      setGenres(response);
    });
  }, []);
  if (!movies) return null; //Si no hay peliculas no retorna nada
  if (!actors) return null; //Si no hay actores no retorna nada
  return (
    <React.Fragment>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8} lg={9}>
            <Title>Lista de películas</Title>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <ModalMovie
              movie={{ genre: { id: 1 } }}
              actors={actors}
              genres={genres}
              type="create"
            />
          </Grid>
        </Grid>
      </Container>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Duración (minutos)</TableCell>
            <TableCell>Género</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {map(movies, (movie) => (
            <MovieRow movie={movie} actors={actors} genres={genres} />
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

//Datos a ser mostrado para cada una de las filas de películas
function MovieRow(props) {
  const { movie, actors, genres } = props;
  return (
    <TableRow key={movie.id}>
      <TableCell>{movie.name}</TableCell>
      <TableCell>{movie.duration}</TableCell>
      <TableCell key={movie.genre.id}>{movie.genre.nameGenre}</TableCell>
      <TableCell align="center">
        <ModalVerInfo movie={movie} />
        <ModalMovie movie={movie} actors={actors} genres={genres} type="edit" />
      </TableCell>
    </TableRow>
  );
}
