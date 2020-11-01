import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {
  FormControl,
  TextField,
  Button,
  Input,
  InputLabel,
  Select,
  Chip,
  MenuItem,
  Container,
  Grid,
} from '@material-ui/core';
import Title from '../Title';
import FileUpload from './FileUpload';
import { map } from 'lodash';
import firebase from 'firebase/app';
import 'firebase/storage';
import { createActor } from '../api/actors';

firebase.initializeApp({
  apiKey: 'AIzaSyDmtraQk6rXhD6_yoWbuCgPNg_ruCRaWc0',
  authDomain: 'peliculas-294019.firebaseapp.com',
  databaseURL: 'https://peliculas-294019.firebaseio.com',
  projectId: 'peliculas-294019',
  storageBucket: 'peliculas-294019.appspot.com',
  messagingSenderId: '617239861404',
  appId: '1:617239861404:web:51bfc0f548e4a239cbf559',
});

export function ModalNewActor() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [names, setNames] = useState({});
  const [age, setAge] = useState({});
  const [photoUrl, setPhotoUrl] = useState({});
  const [percentage, setPercentage] = useState({});
  const [photoURL, setPhotoURL] = useState({});
  const [form, setForm] = useState({
    uploadValue: 0,
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          uploadValue: percentage,
        });
        setPercentage({
          percentage,
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
              uploadValue: 100,
              names: names,
              age: age,
            });
          });
      },
    );
  };

  const handleChange = (e) => {
    console.log(`${e.target.name}: ${e.target.value}`);
    if (e.target.name === 'names') {
      setNames(e.target.value);
    }
    if (e.target.name === 'age') {
      setAge(e.target.value);
    }
    setForm({
      photoURL: form.photoURL,
      uploadValue: form.uploadValue,
      names: names,
      age: age,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    createActor(form);
    /* try {
      let config = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      };
      let res = await fetch('', config);
      let json = await res.json();
      console.log(json);
    } catch (error) {} */
  };

  return (
    <>
      <Button
        type="button"
        variant="contained"
        color="primary"
        onClick={handleOpen}
      >
        Nuevo Actor
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
            <Title>Nuevo Actor</Title>
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
