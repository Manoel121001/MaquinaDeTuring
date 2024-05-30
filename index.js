const input = document.querySelector("input");
const resultsDiv = document.querySelector("#results");

const operadores = [
    '-',
    '+',
    '*',
    '/',
    '%',
];

input.addEventListener('input', (e) => {
    input.setAttribute('placeholder', 'Insira via teclado o calculo desejado.');
    input.value = e.target.value.replace(/[^\d-*/+%]+/g, ''); // Expressão regular, para permitir apenas caracteres desejados
});

input.addEventListener('keyup', (e) => {   
    if (e.code == 'Enter') {
        try {
            const calculo = calc(input.value);
            apresentar(calculo);
        } catch (err) {
            // Retorna Operação invalida quando tem dois caracteres de operação seguidos Ex: 10--, com o remover ele ignora o 1 e no 2 ele barra a entrada
            console.log("Erro: ", err);
            input.value = '';
            input.setAttribute('placeholder', 'Operação inválida');
        }
    }
});

function calc(entrada) {
    entrada = remover(entrada);
    return {
        operacao: entrada,
        result: eval(entrada) // utilizando do eval ele executa a string como um código e retorna um objeto
    }
}

function apresentar(calc) {
    // nessa função do código iremos deixar a apresentação do cálculo melhor, espaçando os caracteres.
    const span = document.createElement('span');
    span.classList.add('result'); 

    let calcForm = calc.operacao;
    for (let i = 0; i < operadores.length; i++) {
        let arrayDeCaracteres = calcForm.split(operadores[i]); // quebra a string transformando em array dos caracteres
        calcForm = arrayDeCaracteres.join(` ${operadores[i]} `);  // join pega o array e o transforma em string
    }

    span.innerHTML = `
    ${calcForm} = <span>
    ${(calc.result)}
    </span>
    `;
    resultsDiv.insertBefore(span, resultsDiv.firstChild); 
    input.value = calc.result;
}

function remover(entrada) {
    // nessa função, soluciona um erro, caso tenha uma entrada com ultimo caracter como operador matemático, ele a ignora. 
    const caracteres = entrada.split("");
    if (operadores.filter(x => x.includes(caracteres.at(-1))).length > 0) {
        return entrada.substring(0, entrada.length - 1);
    }
    return entrada;
}
