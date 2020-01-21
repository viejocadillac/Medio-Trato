
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


const generarMaletines = (valores)=>{

    const unorderedMaletines = pickRandomNoDuplicated(valores)
    const maletines = []

    for (let i = 0; i < valores.length; i++) {
        maletines.push({numero:i+1, valor:unorderedMaletines[i]})
        
    }
    return maletines
    


}

const generarOferta = (array) => {
    let suma = 0
    array.forEach((v)=> suma += v)
    return suma / array.length
}


const quitarMaletin = (maletines, numero) => {
    return maletines.filter((maletin) => maletin.numero !== numero)
}

export {
    pickRandom,
    pickRandomNoDuplicated,
    generarMaletines,
    generarOferta,
    quitarMaletin,
}