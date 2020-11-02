import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { ModalMessage } from '../components/ModalMessage';
import { TextField, Button, Container, Grid } from '@material-ui/core';
import Title from './Title';
import FileUpload from './FileUpload';
import 'firebase/storage';
import { createActor, editActor } from '../api/actors';

//Modal para la crear/actualizar un actor
//Como atributos en los props debe recibir
//El componente de firebase para almacenamiento de las imágenes
//type: recibe si el modal es para crear(create) o editar (edit)
//actor: recibe la clase con los datos de actor
export function ModalActor(props) {
  const { firebase, type, actor } = props;
  const classes = useStyles();

  //Constantes para ser usadas en cada acción
  const [title, setTitle] = useState(''); //Titulo del modal
  const [typeButton, setTypeButton] = useState({}); //Tipo de botón crear/editar
  const [open, setOpen] = useState(false); //Control del modal abierto/cerrado
  const [openM, setOpenM] = useState(false); //Control del modal de mensaje abierto/cerrado
  const [message, setMessage] = useState(''); //Mensaje a ser enviado al modal Message
  const [form, setForm] = useState({
    //Datos a ser enviados a la API
    uploadValue: 0,
    photoURL: '',
    names: '',
    age: '',
  });
  const [idActor, setIdActor] = useState(''); //Id de actor a ser editado

  //Datos a ser expuestos al crear/editar actor
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

  //Control para abrir el modal actual
  const handleOpen = () => {
    setOpen(true);
  };

  //Control para cerrar el modal actual
  const handleClose = () => {
    setOpen(false);
  };

  //Control para abrir el modal de mensaje
  const handleOpenM = () => {
    setOpenM(true);
  };

  //Control para cerrar el modal de mensaje
  const handleCloseM = () => {
    setOpenM(false);
  };

  //Acción al cambiar la imágen cargada o subir una imagen
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

  //Control al cambiar cada atributo del formulario
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

  //Control de acción al enviar formulario a la API
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
