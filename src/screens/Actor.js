import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../Title';
import { Avatar } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { getMovies } from '../api/movies';
import { getActors } from '../api/actors';
import { getGenres } from '../api/genres';
import { map } from 'lodash';
import { ModalMovie } from '../components/ModalMovie';
import { ModalNewMovie } from '../components/ModalNewMovie';
import { ModalVerInfo } from '../components/ModalVerInfo';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Actors(props) {
  const classes = useStyles();

  const { route } = props;
  //const {id} = route.params;
  const [movies, setMovies] = useState(null);
  const [actors, setActors] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    getMovies().then((response) => {
      console.log(response);
      setMovies(response);
    });
  }, []);

  useEffect(() => {
    getActors().then((response) => {
      setActors(response);
    });
  }, []);

  useEffect(() => {
    getGenres().then((response) => {
      setGenres(response);
    });
  }, []);
  if (!movies) return null;
  return (
    <React.Fragment>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8} lg={9}>
            <Title>Lista de actores</Title>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <ModalNewMovie genres={genres} actors={actors} />
          </Grid>
        </Grid>
      </Container>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Foto</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Edad</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {map(actors, (actor) => (
            <ActorRow actor={actor} />
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

function ActorRow(props) {
  const { actor } = props;
  return (
    <TableRow key={actor.id}>
      <TableCell>
        <Avatar alt={actor.names} src={actor.photoURL} />
      </TableCell>
      <TableCell>{actor.names}</TableCell>
      <TableCell>{actor.age}</TableCell>
      <TableCell align="center">
        {/* <ModalVerInfo movie={movie} />
        <ModalMovie movie={movie} actors={actors} genres={genres} /> */}
      </TableCell>
    </TableRow>
  );
}
