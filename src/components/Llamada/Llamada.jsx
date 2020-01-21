import React from 'react'
import './Llamada.scss'

const Llamada = ({valorOferta, disableBtnContraoferta, onTrato, onNoTrato, onContraoferta}) => {
    return (
        <div className="call">
            <span>El tesorero te ofrece</span>
            <h2>{`$ ${valorOferta}`}</h2>
            <span>por tu maletin</span>
            <div>
                <input type="button" value="Trato" onClick={onTrato}></input>
                <input type="button" value="No hay trato" onClick={onNoTrato}></input>
                <input type="button" value="Contraoferta" disabled={disableBtnContraoferta} onClick={onContraoferta}></input>
            </div>
        </div>
    )
}

export default Llamada