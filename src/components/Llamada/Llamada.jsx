import React from 'react';
import PropTypes from 'prop-types';
import Animate from 'animate.css-react';
import 'animate.css/animate.css';

import './Llamada.scss';

const Llamada = ({
  valorOferta, disableBtnContraoferta, onTrato, onNoTrato, onContraoferta,
}) => (
  <Animate
    appear="bounceInLeft"
    leave="bounceOut"
    durationAppear={1000}
    durationLeave={600}
    component="div"
  >
    <div className="notificacion">
      <span>El tesorero te ofrece</span>
      <h2>{`$ ${valorOferta}`}</h2>
      <span>por tu maletin</span>
      <div>
        <input type="button" value="Trato" onClick={onTrato} />
        <input type="button" value="No hay trato" onClick={onNoTrato} />
        <input type="button" value="Contraoferta" disabled={disableBtnContraoferta} onClick={onContraoferta} />
      </div>
    </div>
  </Animate>
);

Llamada.propTypes = {
  valorOferta: PropTypes.number.isRequired,
  disableBtnContraoferta: PropTypes.bool.isRequired,
  onTrato: PropTypes.func.isRequired,
  onNoTrato: PropTypes.func.isRequired,
  onContraoferta: PropTypes.func.isRequired,
};

export default Llamada;
