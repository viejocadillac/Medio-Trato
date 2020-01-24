import React from 'react';
import PropTypes from 'prop-types';
import Animate from 'animate.css-react';
import Maletin from '../Maletin/Maletin';
import './Maletines.scss';
import 'animate.css/animate.css';

const Maletines = ({ maletines, onClickedMaletin }) => (
  <div className="maletines">
    <Animate
      appear="fadeIn"
      leave="bounceOut"
      durationAppear={1000}
      durationLeave={300}
      component="div"
    >
      {
        maletines.map((m) => <Maletin key={`maletin-${m.numero}`} numero={m.numero} valor={m.valor} onClick={onClickedMaletin} />)
      }
    </Animate>
  </div>
);

Maletines.propTypes = {
  maletines: PropTypes.arrayOf(PropTypes.shape({
    numero: PropTypes.number,
    valor: PropTypes.number,
  })).isRequired,
  onClickedMaletin: PropTypes.func.isRequired,
};

export default Maletines;
