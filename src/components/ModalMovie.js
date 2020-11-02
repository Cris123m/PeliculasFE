import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { ModalMessage } from '../components/ModalMessage';
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
import Title from './Title';
import { map } from 'lodash';
import { createMovie, editMovie } from '../api/movies';

//Modal para la crear/actualizar una pélicula
//Como atributos en los props debe recibir
//movie: con los datos de la pélicula de ser editado
//actors: recibe la clase con el listado de actores
//genres: recibe la clase con el listado de géneros
//type: recibe si el modal es para crear(create) o editar (edit)

//Función para igualar el objeto de actores para cada una de las películas
function actorSelected(movie, actors) {
  var actorSel = [];
  if (movie) {
    actors.forEach((actor) => {
      movie.actors.forEach((act) => {
        if (actor.id === act.id) {
          actorSel.push(actor);
        }
      });
    });
  }
  return actorSel;
}

export function ModalMovie(props) {
  const { movie, actors, genres, type } = props;
  const classes = useStyles();
  const theme = useTheme();

  //Constantes para ser usadas en cada acción
  const [title, setTitle] = useState(''); //Titulo del modal
  const [typeButton, setTypeButton] = useState({}); //Tipo de botón crear/editar
  const [open, setOpen] = React.useState(false); //Control del modal abierto/cerrado
  const [openM, setOpenM] = React.useState(false); //Control del modal de mensaje abierto/cerrado
  const [message, setMessage] = useState(''); //Mensaje a ser enviado al modal Message
  const [stateGenre, setStateGenre] = useState({
    //Datos recibido dentro del select género
    genre: movie.genre.id,
  });
  const [idMovie, setIdMovie] = useState(''); //Id de la película a ser editada
  const [form, setForm] = useState({
    //Datos a ser enviados a la API
    name: '',
    duration: '',
    genre: '',
    synopsis: '',
    actors: [],
  });

  //Datos a ser expuestos al crear/editar actor
  useEffect(() => {
    if (type === 'create') {
      setTitle('Nueva Pelicula');
      setTypeButton({
        name: 'Nueva Película',
        variant: 'contained',
        color: 'primary',
      });
    } else if (type === 'edit') {
      setTitle('Editar Pelicula');
      setTypeButton({
        name: 'Editar',
        variant: 'outlined',
        color: 'secondary',
      });
      setIdMovie(movie.id);
      setForm({
        name: movie.name,
        duration: movie.duration,
        genre: movie.genre,
        synopsis: movie.synopsis,
        actors: actorSelected(movie, actors),
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

  //Control de cambios en cada entrada, excepto género
  const handleChange = (event) => {
    switch (event.target.name) {
      case 'actors':
        setForm({
          name: form.name,
          duration: form.duration,
          genre: form.genre,
          synopsis: form.synopsis,
          actors: event.target.value,
        });
        break;
      case 'name':
        setForm({
          name: event.target.value,
          duration: form.duration,
          genre: form.genre,
          synopsis: form.synopsis,
          actors: form.actors,
        });
        break;
      case 'duration':
        setForm({
          name: form.name,
          duration: event.target.value,
          genre: form.genre,
          synopsis: form.synopsis,
          actors: form.actors,
        });
        break;
      case 'synopsis':
        setForm({
          name: form.name,
          duration: form.duration,
          genre: form.genre,
          synopsis: event.target.value,
          actors: form.actors,
        });
        break;

      default:
        break;
    }
  };

  //Control de cambios para cada género
  const handleChangeGenre = (event) => {
    const name = event.target.name;
    setStateGenre({
      ...stateGenre,
      [name]: event.target.value,
    });
    setForm({
      name: form.name,
      duration: form.duration,
      genre: { id: event.target.value },
      synopsis: form.synopsis,
      actors: form.actors,
    });
  };

  //Acción en el caso de realizar el guardado de actor
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (type === 'create') {
      if (createMovie(form)) {
        setMessage('La película se ha creado correctamente');
        handleOpenM();
        handleClose();
      } else {
        setMessage('Ocurrió un error al intentar crear');
        handleOpenM();
      }
    } else if (type === 'edit') {
      if (editMovie(idMovie, form)) {
        setMessage('La película se ha editado correctamente');
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
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                required
                id="standard-required"
                label="Nombre"
                name="name"
                defaultValue={form.name}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
              <TextField
                id="standard-number"
                label="Duración (minutos)"
                type="number"
                name="duration"
                defaultValue={form.duration}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <FormControl
                required
                variant="outlined"
                fullWidth
                className={classes.formControl}
              >
                <InputLabel htmlFor="outlined-age-native-simple">
                  Género
                </InputLabel>
                <Select
                  native
                  value={stateGenre.genre}
                  onChange={handleChangeGenre}
                  label="Género"
                  inputProps={{
                    name: 'genre',
                    id: 'outlined-age-native-simple',
                  }}
                >
                  {map(genres, (genre) => (
                    <option value={genre.id}>{genre.nameGenre}</option>
                  ))}
                </Select>
              </FormControl>
              <TextField
                id="outlined-multiline-static"
                label="Sinopsis"
                multiline
                rows={4}
                name="synopsis"
                defaultValue={movie.synopsis}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
              <FormControl
                variant="outlined"
                fullWidth
                className={classes.formControl}
              >
                <InputLabel id="demo-mutiple-chip-label">Actores</InputLabel>
                <Select
                  labelId="demo-mutiple-chip-label"
                  id="demo-mutiple-chip"
                  multiple
                  name="actors"
                  value={form.actors}
                  onChange={handleChange}
                  fullWidth
                  defaultValue={actors[2]}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={(selectedActor) => (
                    <div className={classes.chips}>
                      {selectedActor.map((actor) => (
                        <Chip
                          key={actor.id}
                          label={actor.names}
                          className={classes.chip}
                        />
                      ))}
                    </div>
                  )}
                  MenuProps={MenuProps}
                >
                  {actors.map((actor) => (
                    <MenuItem
                      key={actor.id}
                      value={actor}
                      style={getStyles(actor, form.actors, theme)}
                    >
                      {actor.names}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
