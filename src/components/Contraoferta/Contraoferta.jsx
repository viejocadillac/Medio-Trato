import React from 'react';
import PropTypes from 'prop-types';
import './Contraoferta.scss';
import Animate from 'animate.css-react';
import 'animate.css/animate.css';


const Contraoferta = ({ defaultValue, onRealized }) => {
  const [contraoferta, setContraoferta] = React.useState(defaultValue);
  return (
    <Animate
      appear="bounceInLeft"
      leave="bounceOut"
      durationAppear={1000}
      durationLeave={600}
      component="div"
    >
      <div className="notificacion contraoferta">
        <span>Realizar una contra oferta de </span>
        <span className="contra-oferta-valor">{`$ ${contraoferta}`}</span>
        <input
          type="range"
          value={contraoferta}
          min={defaultValue}
          max={defaultValue * 2}
          onChange={(e) => { setContraoferta(e.target.value); }}
        />
        <input type="button" value="Aceptar" onClick={() => { onRealized(contraoferta); }} />
      </div>
    </Animate>
  );
};

Contraoferta.propTypes = {
  /* Valor que se muestra en el range cuando se abre la oferta */
  defaultValue: PropTypes.number.isRequired,
  /* Funcion a ejecutar cuando el boton de aceptar es clickeado */
  onRealized: PropTypes.func.isRequired,
};

export default Contraoferta;
