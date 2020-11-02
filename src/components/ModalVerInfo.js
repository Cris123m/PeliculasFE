import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {
  Button,
  Container,
  Grid,
  FormLabel,
  Typography,
} from '@material-ui/core';
import Title, { Subtitle } from './Title';

//Modal que muestra los datos de cada uno de las películas
export function ModalVerInfo(props) {
  const { movie } = props; //Recibe la película al ser mostrado los datos
  const classes = useStyles(); //Recibe los estilos a ser usados

  const [open, setOpen] = React.useState(false); //Constante para el control de Modal

  //Control para abrir el modal actual
  const handleOpen = () => {
    setOpen(true);
  };

  //Control para cerrar el modal actual
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="button" color="primary" onClick={handleOpen}>
        Ver Info
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className={classes.root}>
              <Title>{movie.name}</Title>
              <FormLabel>{movie.duration} minutos</FormLabel>
              <Subtitle>Sinopsis</Subtitle>
              <Typography variant="body2" component="p">
                {movie.synopsis}
              </Typography>
              <Subtitle>Actores</Subtitle>
              {movie.actors.map((actor) => (
                <Container maxWidth="lg">
                  <Grid container spacing={2}>
                    <Grid item xs={6} md={6} lg={6}>
                      {actor.names}
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                      {actor.age}
                    </Grid>
                  </Grid>
                </Container>
              ))}
            </div>
            <Container maxWidth="lg" className={classes.container}>
              <Grid container alignContent="right" spacing={1}>
                <Grid className={classes.buttons} item xs={12} md={12} lg={12}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleClose}
                  >
                    Cerrar
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </div>
        </Fade>
      </Modal>
    </>
  );
}

//Estilos para ser usados en modal
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1, 0),
      display: 'block',
    },
    margin: theme.spacing(0),
    width: '35ch',
    display: 'block',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  container: {
    margin: 10,
  },
  subtitle: {
    fontSize: '10px',
    color: '#000',
  },
  buttons: {
    alignContent: 'right',
  },
}));
