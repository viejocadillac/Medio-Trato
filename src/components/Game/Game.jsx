import React from 'react'

import Maletines from '../Maletines/Maletines'
import Mensaje from '../Mensaje/Mensaje'
import MaletinSeleccionado from '../MaletinSeleccionado/MaletinSeleccionado'
import ProgressTracker from '../ProgressTracker/ProgressTracker'
import Contraoferta from '../Contraoferta/Contraoferta'
import Notifications from '../Notifications/Notifications'
import Llamada from '../Llamada/Llamada'

import './Game.scss'

import {generarMaletines,
        generarOferta,
        quitarMaletin,} from '../../utils.js'

const VALORES = [1, 2, 5, 10, 25, 50, 75, 100, 200, 300, 400, 500, 750, 1000, 2500, 5000, 10000, 20000, 30000, 40000, 50000, 75000, 100000, 250000, 500000, 1000000]
const STEPS_PER_SEGMENT = [6, 5, 4, 3, 2, 1, 1, 1, 1,]

const Game = () => {


    const [maletinesDisponibles, setMaletinesDisponibles] = React.useState([])
    const [isFirstSelection, setFirstSelection] = React.useState(true)
    const [seleccionado, setSeleccionado] = React.useState({})
    const [valoresAbiertos, setValoresAbiertos] = React.useState([])
    const [showCall, setShowCall] = React.useState(false)
    const [showContraoferta, setShowContraoferta] = React.useState(false)
    const [tratoAceptado, setTratoAceptado] =React.useState(false)
    const [oferta, setOferta] = React.useState(0)
    const [disableBtnContraoferta, setDisableBtnContraoferta] = React.useState(false)

    // Esto se ejecuta solo al montar el componente
    React.useEffect(()=>setMaletinesDisponibles(generarMaletines(VALORES)),[])

    const ofertar = ()=>{
        let oferta = Math.floor(generarOferta(VALORES.filter((valor)=>!valoresAbiertos.includes(valor))))
        setOferta(oferta)
        setShowCall(true)
    }

    const contraofertaRealizada = (contraoferta)=>{
        setShowContraoferta(false)
        setShowCall(false)
        const valorMaximoContraoferta = Math.floor(oferta + (oferta * ((15 + (Math.random() * 5)) / 100)))
        if (contraoferta < valorMaximoContraoferta) {
            setOferta(contraoferta)
            setTratoAceptado(true)
        }
    }

    const onTratoAceptado = () => {
        setShowCall(false)
        setTratoAceptado(true)
    }

    const maletinClickeado = (event, numero, valor)=>{
        if(isFirstSelection){
            setSeleccionado({numero, valor})
            setFirstSelection(false)
          
            setMaletinesDisponibles((prev)=>quitarMaletin(prev, numero))
        }else if (!showCall && !tratoAceptado){
            setValoresAbiertos((prev)=>[].concat(prev, valor))
            setMaletinesDisponibles((prev)=>quitarMaletin(prev, numero))
        }
    }

    return (
        <div className="game">
            <div className="left">
                <h1 className="title">Medio/Trato!</h1>
                
                <ProgressTracker stepsPerSegment={STEPS_PER_SEGMENT} completedSteps={valoresAbiertos.length} onSegmentCompleted={ofertar} />
                <Maletines maletines={maletinesDisponibles} onClickedMaletin={maletinClickeado} />

                {
                    !isFirstSelection &&
                    <MaletinSeleccionado maletin={seleccionado}/>
                }
                

                {
                    tratoAceptado &&
                    <Mensaje >
                        <div className="trato-aceptado">
                            <h2>{`Ganaste $ ${oferta}`}</h2>
                            <span>{`Tu maletin tenia $ ${seleccionado.valor}`}</span>
                        </div>
                    </Mensaje>
                }

                {
                    (maletinesDisponibles.length === 0) &&
                    <Mensaje >
                        <h2>{`Ganaste $ ${seleccionado.valor}`}</h2>
                    </Mensaje>
                }
                {
            
                    <Notifications>
                        {
                            showCall &&
                            <Llamada
                                key="llamada"
                                valorOferta={oferta}
                                disableBtnContraoferta={disableBtnContraoferta}
                                onTrato={onTratoAceptado} onNoTrato={()=>{setShowCall(false)}}
                                onContraoferta={()=>{setShowContraoferta(true); setDisableBtnContraoferta(true)}}
                            />
                        }
                        {
                            showContraoferta &&
                            <Contraoferta key="contraoferta" defaultValue={oferta} onRealized={contraofertaRealizada} />
                        }
                    </Notifications>
                }

            </div>
            <RigthSide valoresAbiertos={valoresAbiertos}/>
        </div>
    )
}

const RigthSide = ({valoresAbiertos}) => {
    return (
        <div className="rigth">
            {
                VALORES.map((valor)=>{
                    return (
                        <div key={`valores-${valor}`} className={valoresAbiertos.includes(valor) ? 'valor valor-abierto':'valor'}>
                            <div className="valor-disponible">{`$ ${valor}`}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Game