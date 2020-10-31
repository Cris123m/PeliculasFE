import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Movie, RecentActors } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const preventDefault = (event) => event.preventDefault();
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
