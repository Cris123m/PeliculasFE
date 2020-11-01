import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { ModalMessage } from '../components/ModalMessage';
import { TextField, Button, Container, Grid } from '@material-ui/core';
import Title from '../Title';
import FileUpload from './FileUpload';
import 'firebase/storage';
import { createActor, editActor } from '../api/actors';

export function ModalActor(props) {
  const { firebase, type, actor } = props;
  const classes = useStyles();

  const [title, setTitle] = useState('');
  const [typeButton, setTypeButton] = useState({});
  const [open, setOpen] = useState(false);
  const [openM, setOpenM] = useState(false);
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({
    uploadValue: 0,
    photoURL: '',
    names: '',
    age: '',
  });
  const [idActor, setIdActor] = useState('');

  useEffect(() => {
    if (type === 'create') {
      setTitle('Nuevo Actor');
      setTypeButton({
        name: 'Nuevo Actor',
        variant: 'contained',
        color: 'primary',
      });
    } else if (type === 'edit') {
      setTitle('Editar Actor');
      setTypeButton({
        name: 'Editar',
        variant: 'outlined',
        color: 'secondary',
      });
      setIdActor(actor.id);
      setForm({
        photoURL: actor.photoURL,
        uploadValue: 100,
        names: actor.names,
        age: actor.age,
      });
    }
  }, [type]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenM = () => {
    setOpenM(true);
  };

  const handleCloseM = () => {
    setOpenM(false);
  };

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref(`pictures/${file.name}`);
    const task = storageRef.put(file);

    task.on(
      'state_changed',
      (snapshot) => {
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setForm({
          photoURL: form.photoURL,
          uploadValue: percentage,
          names: form.names,
          age: form.age,
        });
      },
      (error) => {
        console.error(error.message);
      },
      () => {
        firebase
          .storage()
          .ref('pictures')
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            setForm({
              photoURL: url,
              uploadValue: form.uploadValue,
              names: form.names,
              age: form.age,
            });
          });
      },
    );
  };

  const handleChange = (e) => {
    if (e.target.name === 'names') {
      setForm({
        photoURL: form.photoURL,
        uploadValue: form.uploadValue,
        names: e.target.value,
        age: form.age,
      });
    }
    if (e.target.name === 'age') {
      setForm({
        photoURL: form.photoURL,
        uploadValue: form.uploadValue,
        names: form.names,
        age: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (type === 'create') {
      if (createActor(form)) {
        setMessage('El actor se ha creado correctamente');
        handleOpenM();
        handleClose();
      } else {
        setMessage('Ocurrió un error al intentar crear');
        handleOpenM();
      }
    } else if (type === 'edit') {
      if (editActor(idActor, form)) {
        setMessage('El actor se ha editado correctamente');
        handleOpenM();
        handleClose();
      } else {
        setMessage('Ocurrió un error al intentar editar');
        handleOpenM();
      }
    }
  };

  return (
    <>
      <ModalMessage
        title={title}
        message={message}
        open={openM}
        handleClose={handleCloseM}
      />
      <Button
        type="button"
        variant={typeButton.variant}
        color={typeButton.color}
        onClick={handleOpen}
      >
        {typeButton.name}
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
            <Title>{title}</Title>
            <form
              className={classes.root}
              onSubmit={handleSubmit}
              noValidate
              autoComplete="off"
            >
              <TextField
                required
                id="standard-required"
                label="Nombre"
                variant="outlined"
                fullWidth
                name="names"
                defaultValue={form.names}
                onChange={handleChange}
              />
              <TextField
                required
                id="standard-number"
                label="Edad"
                type="number"
                variant="outlined"
                fullWidth
                name="age"
                defaultValue={form.age}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <FileUpload onChange={handlePictureChange} form={form} />
            </form>
            <Container maxWidth="lg" className={classes.container}>
              <Grid container alignItems="right" spacing={2}>
                <Grid item xs={12} md={6} lg={6}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleClose}
                  >
                    Cancelar
                  </Button>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                  >
                    Guardar
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
      //width: '35ch',
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
