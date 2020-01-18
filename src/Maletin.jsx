import React from 'react'
import './maletin.scss'

const Maletin = ({numero, valor, className, onClick})=>{
    return (
        <div className={`maletin ${className}`} onClick={(e)=> onClick(e, numero, valor) }>
            <img src="/maletin.svg" alt=""/>
            <span>{numero}</span>
        </div>
    )
}

export default Maletin