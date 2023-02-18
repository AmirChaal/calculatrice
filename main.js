var OperationCalcul = undefined

const clearButton = document.querySelector('[data-all-clear]')
const output = document.querySelector('[data-output]')
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const pointButton = document.querySelector('[data-point]')
const plusMinusButton = document.querySelector('[data-plusminus]')

//----------------------------------------------------------------------------------------//
function appendNumber(number) {
    //--- ESPACE APRES UN CHARACTERE OPERATION -----------//
    if (['+', 'x', '÷', '-'].includes(output.innerText.slice(-1))){
        output.innerText = output.innerText.toString() + ' ' + number.innerText
    } else {
        output.innerText = output.innerText.toString() + number.innerText
    }
}
function appendPoint() {
    if (output.innerText === '') return;

    if(OperationCalcul === undefined) {
        console.log('OperationCalcul undefined')
        if (output.innerText.toString().includes('.')) return
        output.innerText = output.innerText.toString() + '.'
    }

    let split = output.innerHTML.split(' ')
    let nombre1 = parseFloat(split[0])
    let nombre2 = parseFloat(split[2])

    if (!isNaN(nombre1) && !isNaN(nombre2)) {
        console.log('nombre1 et nombre2 sont des nombres')
        split = output.innerHTML.split(' ')
        if (split[2].toString().includes('.')) return;
        output.innerText = output.innerText.toString() + '.'
    }
}

function plusMinus() {
    if (output.innerText === '') return;

    if(OperationCalcul === undefined) {
        if (output.innerText.toString().includes('-')) {
            output.innerText = output.innerText.toString().replace('-', '')
        } else {
            output.innerText = '-' + output.innerText.toString()
        }
    }

    let split = output.innerHTML.split(' ')
    let nombre1 = parseFloat(split[0])
    let nombre2 = parseFloat(split[2])

    if (!isNaN(nombre1) && !isNaN(nombre2)) {
        console.log('nombre2 est un nombre')
        split = output.innerHTML.split(' ')
        if (split[2].toString().includes('-')) {
            output.innerText = split[0] + ' ' + split[1] + ' ' + split[2].replace('-', '')
        } else {
            output.innerText = split[0] + ' ' + split[1] + ' -' + split[2]
        }
    }
}

function clear() {
    output.innerText = ''
    OperationCalcul = undefined
}

function chooseOperation(operation) {
    if (output.innerText === '') {
        console.log('Output vide')
        return;
    }

    if (output.innerText.startsWith('-')) {
        outputClean = output.innerText.slice(1)
        console.log(outputClean)
    } else {
        outputClean = output.innerText
    }

    if (['+', 'x', '÷', '-'].includes(output.innerText.slice(-1))) {
        console.log('Dernier character est une operation')
        output.innerText = output.innerText.replace(/.$/,operation);
        OperationCalcul = operation;
    } else if (outputClean.includes('x') || outputClean.includes('+') || outputClean.includes('÷') || outputClean.includes('-')) {
        console.log('une operation est deja en cours')
        calcul()
        OperationCalcul = operation;
        output.innerText = `${output.innerText.toString()} ${operation}`;
    } else {
        OperationCalcul = operation;
        output.innerText = `${output.innerText.toString()} ${operation}`;
    }
}

function calcul() {
    if(output.innerText === '') return
    let split = output.innerHTML.split(' ')
   
    let nombre1 = parseFloat(split[0])
    let nombre2 = parseFloat(split[2])
    
    if (isNaN(nombre1) || isNaN(nombre2)) return
    
    console.log(nombre1)
    console.log(nombre2)
    console.log(OperationCalcul)

    let moncalcul;
    
    switch (OperationCalcul) {
        case '+':
            moncalcul =  nombre1 + nombre2 
            break
        case '-':
            moncalcul =  nombre1 - nombre2 
            break
        case 'x':
            moncalcul =  nombre1 * nombre2
            break
        case '÷':
            moncalcul =  nombre1 / nombre2
            break
        default:
            return
    }
    output.innerText.innerText = moncalcul
    OperationCalcul = undefined
    console.info(moncalcul)
    output.innerText = moncalcul
}
//----------------------------------------------------------------------------------------//

clearButton.addEventListener('click', ()=> {
    console.info('effacer')
    clear()
})

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.info(button.innerText)
        appendNumber(button)
    })
})

pointButton.addEventListener('click', ()=> {
    appendPoint()
})

plusMinusButton.addEventListener('click', ()=> {
    plusMinus()
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        chooseOperation(button.innerText)
    })
})

equalsButton.addEventListener('click', button => {
    calcul()
})
