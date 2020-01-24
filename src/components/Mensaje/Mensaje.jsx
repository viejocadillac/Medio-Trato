import React from 'react';
import PropTypes from 'prop-types';
import Animate from 'animate.css-react';
import 'animate.css/animate.css';

const Mensaje = ({ children }) => (
  <Animate
    appear="zoomIn"
    leave="fadeOut"
    durationAppear={2000}
    component="div"
  >
    {children}
  </Animate>
);

Mensaje.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Mensaje;
