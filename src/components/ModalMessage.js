import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import Title from './Title';

//Modal para mostrar un mensaje determinado con controles
//para ser usado desde un componente superior
//Se debe enviar en los props el título, mensaje, el atributo de abierto/cerrado en true o false,
//y la función de cerrado para usar en el botón Cerrar
export function ModalMessage(props) {
  const { title, message, open, handleClose } = props;
  const classes = useStyles();

  return (
    <>
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
            <Title>{title}</Title>
            <Typography variant="body2" component="p">
              {message}
            </Typography>
            <Container maxWidth="lg" className={classes.container}>
              <Grid container alignItems="right" spacing={2}>
                <Grid item xs={12} md={6} lg={6}></Grid>
                <Grid item xs={12} md={6} lg={6}>
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

//Estilos para cada elemento del modal
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
}));
