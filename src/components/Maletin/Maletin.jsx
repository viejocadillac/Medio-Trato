import React from 'react'
import PropTypes from 'prop-types'
import maletin from './maletin.svg'
import './Maletin.scss'

/**
 * Representa a un maletin
 * @component
 */
const Maletin = ({numero, valor, className, onClick})=>{
    return (
        <div className={`maletin ${className}`} onClick={(e)=> onClick(e, numero, valor) } >
        <img src={maletin} alt=""/>
        <span>{numero}</span>
    </div>
    )
}

Maletin.propTypes = {
    /** Numero que va a mostrar el maletin en el exterior */
    numero: PropTypes.number.isRequired,
    /** Valor interno del maletin */
    valor: PropTypes.number.isRequired,
    /** Clase que se le agregara ademas de la que ya posee por ser un maletin "maletin" */
    className: PropTypes.string,
    /** Funcion a ejecutar cuando se haga click sobre el maletin */
    onClick: PropTypes.func,
}

Maletin.defaultProps = {
    className: '',
    onClick: ()=>{},
}

export default Maletin