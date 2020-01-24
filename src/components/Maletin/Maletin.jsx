import React from 'react';
import PropTypes from 'prop-types';
import Animate from 'animate.css-react';
import maletin from './maletin.svg';
import 'animate.css/animate.css';
import './Maletin.scss';

/**
 * Representa a un maletin
 * @component
 */
const Maletin = ({
  numero, valor, className, onClick,
}) => (
  <Animate
    appear="fadeIn"
    leave="fadeOut"
    durationAppear={500}
    component="div"
  >
    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
    <div className={`maletin ${className}`} onClick={(e) => onClick(e, numero, valor)} role="button" tabIndex={0} focusable>
      <img src={maletin} alt="" />
      <span>{numero}</span>
    </div>


  </Animate>

);

Maletin.propTypes = {
  /** Numero que va a mostrar el maletin en el exterior */
  numero: PropTypes.number.isRequired,
  /** Valor interno del maletin */
  valor: PropTypes.number.isRequired,
  /** Clase que se le agregara ademas de la que ya posee por ser un maletin "maletin" */
  className: PropTypes.string,
  /** Funcion a ejecutar cuando se haga click sobre el maletin */
  onClick: PropTypes.func,
};

Maletin.defaultProps = {
  className: '',
  onClick: () => {},
};

export default Maletin;
