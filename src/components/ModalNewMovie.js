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
import { map } from 'lodash';

export function ModalNewMovie(props) {
  const { actors, genres } = props;
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const [personName, setPersonName] = useState([]);
  const [stateGenre, setStateGenre] = useState({});

  const handleOpen = () => {
    setPersonName([]);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  const handleChangeGenre = (event) => {
    const name = event.target.name;
    setStateGenre({
      ...stateGenre,
      [name]: event.target.value,
    });
  };

  return (
    <>
      <Button
        type="button"
        variant="contained"
        color="primary"
        onClick={handleOpen}
      >
        Nueva Película
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
            <Title>Nueva Película</Title>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                required
                id="standard-required"
                label="Nombre"
                variant="outlined"
                fullWidth
              />
              <TextField
                id="standard-number"
                label="Duración (minutos)"
                type="number"
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
                  value={personName}
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
                      style={getStyles(actor, personName, theme)}
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
                  <Button variant="contained" color="primary">
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
