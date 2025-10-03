const idadeinput = document.getElementById('idadeInput');
const verifyButton = document.getElementById('verifyButton');
const result = document.getElementById('resultado');

function verificaridade(){
    result.classList.remove('visivel');
    const idade = parseInt(idadeinput.value);
    let mensagem ='';

    if(isNaN(idade) || idade <0){
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

verifyButton.addEventListener('click',verificaridade);
idadeinput.addEventListener('keyup',(Event) => {
    if(Event.key === 'enter') verificaridade();
})

const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = {
    x: null,
    y: null,
    radius: 150
};

let particulasArray = [];
const numeroDeParticulas = 100;

class particula{
    constructor(x, y, direcaoX, direcaoY, tamanho, cor){
        this.x = x;
        this.y = y;
        this.direcaoX = direcaoX;
        this.direcaoY = direcaoY;
        this.tamanho = tamanho;
        this.cor = cor;
    }

    desenhar(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.tamanho, 0, Math.PI * 2, false);
        ctx.fillStyle = '#007bff';
        ctx.fill();
    }

    atualizar(){
        if(this.x  > canvas.height || this.y < 0){
            this.direcaoX = -this.direcaoX;
        }
        if(this.y > canvas.height || this.y < 0){
            this.direcaoY = -this.direcaoY;
        }
        this.x += this.direcaoX;
        this.y += this.direcaoY
        this.desenhar();
    }
    
}

function init(){
    particulasArray= [];
    for(let i = 0; i < numeroDeParticulas; i++){
        let tamanho = Math.random() * 2 + 1;
        let x = Math.random() * (innerWidth - tamanho * 2) + tamanho;
        let y = Math.random() * (innerHeight - tamanho * 2) + tamanho;
        let direcaoX = (Math.random () * 0.4) - 0.2;
        let direcaoY = (Math.random () * 0.4) - 0.2;
        let cor = '#007bff';
        particulasArray.push(new particula(x, y, direcaoX, direcaoY, tamanho, cor));
    }
}
function conectar(){
    for(let a = 0; a < particulasArray.length; a++){
        for(let b = a; b < particulasArray.length; b++){
            let distancia = ( (particulasArray [a].x) - (particulasArray [b].x) * (particulasArray [a].x) - (particulasArray[b].x)) + 
            ( (particulasArray[a].y) - (particulasArray[b].b) * (particulasArray[a].y) - (particulasArray[b].y));
        }
        if(distancia < (canvas.width/7) * (canvas.height/7)){
            ctx.strokeStyle = `rgba(0, 123, 255, ${1 - (distancia / 20000)})`;
            ctx.lineWidth = 1;
            ctx.baeginPath();
            ctx.moveto(particulasArray[a].x, particulasArray[a].y);
            ctx.lineto(particulasArray[b].x, particulasArray[b].y);
            ctx.stroke();
        
        }
    }
}

function animar(){
    requestAnimationFrame(animar);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for(let i = 0; i < particulasArray.length; i++){
        particulasArray[i].atualizar();
    }
    conectar();
}

window.addEventListener('mouseout', () =>{
    mouse.x = undefined;
    mouse.y = undefined;
})

init();
animar();