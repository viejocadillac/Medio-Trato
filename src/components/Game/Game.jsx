import React from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Maletines from '../Maletines/Maletines';
import Mensaje from '../Mensaje/Mensaje';
import MaletinSeleccionado from '../MaletinSeleccionado/MaletinSeleccionado';
import ProgressTracker from '../ProgressTracker/ProgressTracker';


import './Game.scss';

import {
  generarMaletines,
  generarOferta,
  quitarMaletin,
} from '../../utils';

/**
 * Valores de los maletines
 */
const VALORES = [
  1, 2, 5, 10, 25, 50, 75, 100, 200, 300, 400, 500, 750, 1000,
  2500, 5000, 10000, 20000, 30000, 40000, 50000, 75000, 100000, 250000, 500000, 1000000];

/**
 * Maletines que se deben abrir antes de cada contraoferta
 */
const STEPS_PER_SEGMENT = [6, 5, 4, 3, 2, 1, 1, 1, 1];

const MySwal = withReactContent(Swal);

const isValidContraoferta = (oferta, valorContraoferta) => {
  /* Entre 15% y 20% */
  const porcentajeRandom = (15 + (Math.random() * 5)) / 100;
  const valorMaximoContraoferta = Math.floor(oferta + (oferta * porcentajeRandom));
  return valorContraoferta < valorMaximoContraoferta;
}
const Game = () => {
  const [maletinesDisponibles, setMaletinesDisponibles] = React.useState([]);
  const [isFirstSelection, setFirstSelection] = React.useState(true);
  const [seleccionado, setSeleccionado] = React.useState({});
  const [valoresAbiertos, setValoresAbiertos] = React.useState([]);
  const [tratoAceptado, setTratoAceptado] = React.useState(false);
  const [oferta, setOferta] = React.useState(0);
  const [disableBtnContraoferta, setDisableBtnContraoferta] = React.useState(false);

  // Esto se ejecuta solo al montar el componente
  React.useEffect(() => {
    MySwal.fire({
      title: <p>Bienvenido</p>,
      html: <p>Selecciona un maletin para empezar a jugar</p>,
      footer: 'Medio Trato',
      confirmButtonColor: 'Gold',
    });

    setMaletinesDisponibles(generarMaletines(VALORES))
  }, []);

  const ofertar = () => {
 
    const valoresNoAbiertos = VALORES.filter((valor) => !valoresAbiertos.includes(valor));
    const valorDeOferta = Math.floor(generarOferta(valoresNoAbiertos));

    const Buttons = ()=> {
      return (
        <div className="footer-buttons">
          <button className="swal2-confirm swal2-styled" style={{backgroundColor:'gold'}} type="button" onClick={onTratoAceptado} >Trato</button>
          <button className="swal2-confirm swal2-styled" style={{backgroundColor:'gold'}} type="button" onClick={()=>{MySwal.clickCancel()}} >No hay trato</button>
          <button
            className="swal2-confirm swal2-styled"
            style={disableBtnContraoferta ? {display: 'none'} : {backgroundColor: 'gold'}}
            type="button"
            disabled={disableBtnContraoferta}
            onClick={() => {
              MySwal.fire({
                title: 'Contraoferta',
                input: 'range',
                inputAttributes: {
                  min: valorDeOferta,
                  max: valorDeOferta * 1.5,
                  step: 1,
                },
                inputValue: valorDeOferta,
                text: 'Selecciona el valor de la contraoferta',
                footer: false,
                confirmButtonColor: 'Gold',
              }).then((result) => {
            

                if (isValidContraoferta(valorDeOferta, result.value)) {
                  setOferta(result.value);
                  setTratoAceptado(true);
                } else {
                  const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    onOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'error',
                    title: 'La contraoferta no fue aceptada'
                  })
                  setDisableBtnContraoferta(true)
                }
              })
             
            }}
          >
             Contraoferta
          </button>
        </div>
      );
    };

    MySwal.fire({
      allowOutsideClick: false,
      title: <p>Oferta</p>,
      html: (
        <div>
          <p>El tesorero te ofrece:</p>
          <h2>{`$ ${valorDeOferta}`}</h2>
        </div>
      ),
      footer: <Buttons />,
      showConfirmButton: false,
    });
    setOferta(valorDeOferta);
  };



  const onTratoAceptado = () => {
    
    setTratoAceptado(true);
    MySwal.clickConfirm();
  };

  const maletinClickeado = (event, numero, valor) => {
    if (isFirstSelection) {
      setSeleccionado({ numero, valor });
      setFirstSelection(false);

      setMaletinesDisponibles((prev) => quitarMaletin(prev, numero));
    } else if (!tratoAceptado) {
      setValoresAbiertos((prev) => [].concat(prev, valor));
      setMaletinesDisponibles((prev) => quitarMaletin(prev, numero));
    }
  };

  return (
    <div className="game">
      <div className="left">
        <h1 className="title">Medio/Trato!</h1>

        <ProgressTracker
          stepsPerSegment={STEPS_PER_SEGMENT}
          completedSteps={valoresAbiertos.length}
          onSegmentCompleted={ofertar}
        />

        {
          isFirstSelection
          && <MaletinSeleccionado maletin={{}} mensaje="Selecciona un maletin" />
        }


        {
          !isFirstSelection
          && <MaletinSeleccionado maletin={seleccionado} mensaje="Este es tu maletin"/>
        }
        <Maletines maletines={maletinesDisponibles} onClickedMaletin={maletinClickeado} />



        {
          tratoAceptado && (
          <Mensaje>
            <div className="trato-aceptado">
              <h2>{`Ganaste $ ${oferta}`}</h2>
              <span>{`Tu maletin tenia $ ${seleccionado.valor}`}</span>
            </div>
          </Mensaje>
          )
        }

        {
          (maletinesDisponibles.length === 0) && (
          <Mensaje>
            <h2>{`Ganaste $ ${seleccionado.valor}`}</h2>
          </Mensaje>
          )
        }


      </div>
      <RigthSide valoresAbiertos={valoresAbiertos} />
    </div>
  );
};

const RigthSide = ({ valoresAbiertos }) => (
  <div className="rigth">

    {
      VALORES.map((valor) => (

        <div key={`valores-${valor}`} className={valoresAbiertos.includes(valor) ? 'valor valor-abierto' : 'valor'}>
          <div className="valor-disponible">{`$ ${valor}`}</div>
        </div>

      ))
    }
  </div>
);

RigthSide.propTypes = {
  valoresAbiertos: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Game;
