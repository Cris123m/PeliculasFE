import React, {useState, useEffect} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { FormControl, TextField, Button, Input, InputLabel, Select, Chip, MenuItem } from '@material-ui/core';
import Title from '../Title';


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
    margin: theme.spacing(1),
    width: '35ch',
    display: 'block',
    },
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
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

export function ModalMovie(props) {
    const {movie, actors, genres} = props;
	const classes = useStyles();
	const theme = useTheme();

  const [open, setOpen] = React.useState(false);
	const [personName, setPersonName] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
	};
	
	const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setPersonName(value);
  };
  return (
    <>
      <Button type="button" color="secondary" onClick={handleOpen}>
        Editar
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
            <Title>Editar Película</Title>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField 
                    required 
                    id="standard-required" 
                    label="Nombre" 
                    defaultValue={movie.name} 
                    variant="outlined"
                    fullWidth
                />
                <TextField
                    id="standard-number"
                    label="Duración (minutos)"
                    type="number"
                    defaultValue={movie.duration}
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField 
                    required 
                    id="standard-required" 
                    label="Género" 
                    defaultValue={movie.genre.nameGenre} 
                    variant="outlined"
                    fullWidth
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Sinopsis"
                    multiline
                    rows={4}
                    defaultValue={movie.synopsis}
                    variant="outlined"
                    fullWidth
                />
								<FormControl variant="outlined" fullWidth className={classes.formControl}>
									<InputLabel id="demo-mutiple-chip-label">Actores</InputLabel>
									<Select
									labelId="demo-mutiple-chip-label"
									id="demo-mutiple-chip"
									multiple
									value={personName}
									onChange={handleChange}
									fullWidth
									input={<Input id="select-multiple-chip" />}
									renderValue={(selected) => (
											<div className={classes.chips}>
											{movie.actors.map((actor) => (
													<Chip key={actor.id} label={actor.names} className={classes.chip} />
											))}
											</div>
									)}
									MenuProps={MenuProps}
									>
									{actors.map((actor) => (
											<MenuItem key={actor.id} value={actor.names} style={getStyles(actor.names, personName, theme)}>
											{actor.names}
											</MenuItem>
									))}
									</Select>
								</FormControl>
            </form>
              
              
            <h2 id="transition-modal-title">Transition modal</h2>
            <p id="transition-modal-description">react-transition-group animates me.</p>
          </div>
        </Fade>
      </Modal>
    </>
  );
}
