import React from 'react'
import Maletin from '../Maletin/Maletin'
import './Maletines.scss'

const Maletines = ({maletines, onClickedMaletin})=>{
    return (
        <div className="maletines">
            {
                maletines.map((m) => {
                    return <Maletin key={`maletin-${m.numero}`} numero={m.numero} valor={m.valor} onClick={onClickedMaletin} />
                })
            }
        </div>
    )
}

export default Maletines