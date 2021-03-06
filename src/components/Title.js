import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

//Componente para poner los títulos y subtítulos de la página
export default function Title(props) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}

export function Subtitle(props) {
  return (
    <Typography component="h2" variant="h8" color="secundary" gutterBottom>
      {props.children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};
Subtitle.propTypes = {
  children: PropTypes.node,
};
