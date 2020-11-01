import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import { Movie, RecentActors } from '@material-ui/icons';
import { Link } from 'react-router-dom';

export const mainListItems = (
  <div>
    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItem button>
        <ListItemIcon>
          <Movie />
        </ListItemIcon>

        <ListItemText primary="Películas" />
      </ListItem>
    </Link>
    <Link to="/actors" style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Actores" />
      </ListItem>
    </Link>
    <ListItem button>
      <ListItemIcon>
        <RecentActors />
      </ListItemIcon>
      <ListItemText primary="Géneros" />
    </ListItem>
  </div>
);
