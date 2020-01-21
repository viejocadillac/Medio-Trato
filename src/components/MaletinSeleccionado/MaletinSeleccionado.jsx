import React from 'react'
import PropTypes from 'prop-types'

import Maletin from '../Maletin/Maletin'
import './MaletinSeleccionado.scss'

const MaletinSeleccionado = ({maletin}) => {

    return (
        <div className="display-seleccionado">
        <span>Este es tu maletin</span>
        <Maletin
            className="seleccionado"   
            numero={maletin.numero}
            valor={maletin.valor}
            onClick={()=>{}}
        />
    </div>
    )
    
}

MaletinSeleccionado.propTypes = {
    /** Representa a los datos de un maletin */
    maletin: PropTypes.shape({
        numero: PropTypes.number,
        valor: PropTypes.number
    }).isRequired,

}

export default MaletinSeleccionado