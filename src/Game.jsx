import React from 'react'

import Maletin from './Maletin'
import ProgressTracker from './ProgressTracker'
import Call from './Call'
const VALORES = [1, 2, 5, 10, 25, 50, 75, 100, 200, 300, 400, 500, 750, 1000, 2500, 5000, 10000, 20000, 30000, 40000, 50000, 75000, 100000, 250000, 500000, 1000000]


const Maletines = ({maletines, onClickedMaletin})=>{
    return (
        <div className="maletines">
            {
                maletines.map((m) => <Maletin key={`maletin-${m.numero}`} numero={m.numero} valor={m.valor} onClick={onClickedMaletin} />)
            }
        </div>

    )
}

const MaletinSeleccionado = ({maletin, show}) => {
    if (show){
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
    } else {
        return null
    }
}



const pickRandom = (array)=>{
    const randomIndex = Math.floor(Math.random() * array.length)
    let random = array[randomIndex]
    return random
}

const pickRandomNoDuplicated = (valores)=> {
    const generados = []
    let random;

    while(generados.length < valores.length){
        random = pickRandom(valores)
        if(!generados.includes(random)){
            generados.push(random)
        }

    }
    return generados
}

const generarMaletines = ()=>{
    const unorderedMaletines = pickRandomNoDuplicated(VALORES)
    const maletines = []

    for (let i = 0; i < VALORES.length; i++) {
        maletines.push({numero:i+1, valor:unorderedMaletines[i]})
        
    }
    return maletines
}

const generarOferta = (array) => {
    let suma = 0
    array.forEach((v)=> suma += v)
    return suma / array.length
}

const maletines = generarMaletines()

const quitarMaletin = (maletines, numero) => {
    return maletines.filter((maletin) => maletin.numero !== numero)
}


const Game = () => {

    const [maletinesDisponibles, setMaletinesDisponibles] = React.useState(maletines)
    const [isFirstSelection, setFirstSelection] = React.useState(true)
    const [seleccionado, setSeleccionado] = React.useState(false)
    const [valoresAbiertos, setValoresAbiertos] = React.useState([])
    const [showCall, setShowCall] = React.useState(false)
    const [tratoAceptado, setTratoAceptado] =React.useState(false)

    const ofertar = ()=>{
        let oferta = Math.floor(generarOferta(VALORES.filter((valor)=>!valoresAbiertos.includes(valor))))
        setOferta(oferta)
        setShowCall(true)
    }

    const segments = [6, 5, 4, 3, 2, 1, 1, 1, 1,].map((valor)=>{ return {steps: valor, completedCallback:ofertar} })

    const maletinClickeado = (event, numero, valor)=>{
        if(isFirstSelection){
            setFirstSelection(false)
            setSeleccionado({numero, valor})
            setMaletinesDisponibles((prev)=>quitarMaletin(prev, numero))
        }else if (!showCall && !tratoAceptado){
            setValoresAbiertos((prev)=>[].concat(prev, valor))
            setMaletinesDisponibles((prev)=>quitarMaletin(prev, numero))
        }
    }
    const [oferta, setOferta] = React.useState(0)
    const valorMaximoContraoferta = Math.floor(oferta + (oferta * ((15 + (Math.random() * 5)) / 100)))

    return (
        <div className="game">
            <div className="left">
                <h1>Medio Trato!</h1>
                <ProgressTracker segments={segments} completed={valoresAbiertos.length}/>
                <Maletines maletines={maletinesDisponibles} onClickedMaletin={maletinClickeado} />
                <MaletinSeleccionado maletin={seleccionado} show={seleccionado} />
                

                {
                    maletinesDisponibles.length === 0 ? <h2>{`Ganaste $ ${seleccionado.valor}`}</h2>: null
                    
                }
                {
                    tratoAceptado ? <div className="trato-aceptado"><h2>{`Ganaste $ ${oferta}`}</h2><span>{`Tu maletin tenia $ ${seleccionado.valor}`}</span></div>: null
                    
                }

                <Call 
                    show={showCall}
                    trato={()=>{
                        setTratoAceptado(true)
                        setShowCall(false)
          

                    }}
                    noTrato={()=>{
                        setShowCall(false)
                        setTratoAceptado(false)
                        
                    }}
                    contraoferta={(ofertaRealizada)=>{
                      
                        if(ofertaRealizada < valorMaximoContraoferta){
                            // contraoferta aceptada
                            setTratoAceptado(true)
                            setOferta(ofertaRealizada)
                        }
                        setShowCall(false)
                    }}
                    oferta={oferta}
                />


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