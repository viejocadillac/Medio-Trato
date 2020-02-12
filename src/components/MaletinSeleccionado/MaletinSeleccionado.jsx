import React from 'react';
import PropTypes from 'prop-types';

import Maletin from '../Maletin/Maletin';
import './MaletinSeleccionado.scss';

const MaletinSeleccionado = ({ maletin, mensaje }) => (
  <div className="display-seleccionado">
    <span>{mensaje}</span>
    <Maletin
      className="seleccionado"
      numero={maletin.numero}
      valor={maletin.valor}
      onClick={() => {}}
    />
  </div>
);

MaletinSeleccionado.propTypes = {
  /** Representa a los datos de un maletin */
  maletin: PropTypes.shape({
    numero: PropTypes.number,
    valor: PropTypes.number,
  }).isRequired,
  mensaje: PropTypes.string.isRequired,

};

export default MaletinSeleccionado;
