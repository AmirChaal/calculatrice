var OperationCalcul = undefined

const mesBoutons = document.querySelectorAll('[data-number]')
const clearButton = document.querySelector('[data-all-clear]')
const output = document.querySelector('[data-output]')
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')

//----------------------------------------------------------------------------------------//
function appendNumber(number) {
    output.innerText = output.innerText.toString() + number.innerText
}

function clear() {
    output.innerText=''
    OperationCalcul = undefined
}

function chooseOperation(operation) {
    if( output.innerText.includes('x') || output.innerText.includes('+') || output.innerText.includes('%') || output.innerText.includes('÷') || output.innerText.includes('-')  ) calcul()
    OperationCalcul = operation
    output.innerText = output.innerText.toString() + ' ' + operation + ' '
}

function calcul() {
    if(output.innerText === '') return
    let split = output.innerHTML.split(OperationCalcul)
   
    let nombre1 = parseFloat(split[0])
    let nombre2 = parseFloat(split[1])
    
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

console.log(numberButtons)
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.info(button.innerText)
        appendNumber(button)
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        chooseOperation(button.innerText)
    })
})

equalsButton.addEventListener('click', button => {
    calcul()
})


