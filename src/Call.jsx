import React from 'react'
import './call.scss'

const Call = ({show, noTrato, oferta, contraoferta, trato}) => {
    const [showEnterContraoferta, setShowEnterContraoferta] = React.useState(false)
    const [contraofertaValor, setContraofertaValor] = React.useState(oferta)
    const [isFirstContraoferta, setIsFirstContraoferta] = React.useState(true)
    return (
        show ? (
            <div className="notificaciones">
                     <div className="call">
                <span>El tesorero te ofrece</span>
                <h2>{`$ ${oferta}`}</h2>
                <span>por tu maletin</span>
                {
                    !showEnterContraoferta ? (
                        <div>

                        <input type="button" value="Trato" onClick={trato}></input>
                        <input type="button" value="No hay trato" onClick={noTrato}></input>
                        <input type="button" disabled={!isFirstContraoferta} value="Contraoferta" onClick={()=>{
                            setShowEnterContraoferta(true)
                            setIsFirstContraoferta(false)
                            
                        }}></input>
    
    
                    </div>

                    ): null
                }
             

                
   
            </div>
            {
                showEnterContraoferta ? (
                    <div className="call contra">
                        <span>Realizar una contra oferta de </span>
                        <span className="contra-oferta-valor">{`$ ${contraofertaValor}`}</span>
                        <input type="range" value={contraofertaValor}  min={oferta} max={oferta*2} onChange={(e)=>{setContraofertaValor(e.target.value)}}/>
                        <input type="button" value="Aceptar" onClick={()=>{
                            contraoferta(contraofertaValor)
                            setShowEnterContraoferta(false)
                        }}/>
                    </div>
                ): null
            }
            
            </div>
   
        ) : null
        
        
    )

}

export default Call;