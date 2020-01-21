import React from 'react'
import './Contraoferta.scss'


const Contraoferta = ({show, defaultValue, onRealized}) => {
    const [contraoferta, setContraoferta] = React.useState(defaultValue)
    return (
        <div className="call contra">
        <span>Realizar una contra oferta de </span>
        <span className="contra-oferta-valor">{`$ ${contraoferta}`}</span>
        <input 
            type="range"
            value={contraoferta}
            min={defaultValue}
            max={defaultValue * 2}
            onChange={(e)=>{setContraoferta(e.target.value)}}
        />
        <input type="button" value="Aceptar" onClick={()=>{onRealized(contraoferta)}}/>
    </div>

    )
 }

 export default Contraoferta