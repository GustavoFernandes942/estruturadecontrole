const idadeinput = document.getElementById('idadeInput');
const verifyButton = document.getElementById('verifyButton');
const result = document.getElementById('resultado');

function verificaridade(){
    result.classList.remove('visivel');
    const idade = parseInt(idadeinput.value);
    let mensagem ='';

    if(isNaN(idade)) || idade <0){
        mensagem = 'por favor, insira uma idade valida.';
    }else if(idade < 18){
        mensagem = 'voce e menor de idade.';
    }else if(idade < 60){
        mensagem = 'voce e adulto.';
    }else{
        mensagem = 'voce e idoso';
    }

    setTimeout(() => {
        result.innerText = mensagem;
        result.classList.add('visivel')
    }, 100)
}