listaNumerosSorteados = []
let numeroLimite = 10
let numeroSecreto = gerarNumeroAleatorio()
let tentativas = 1


function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2})
}

function alterarIntervalo(novoLimite) {
    numeroLimite = novoLimite;
    reiniciarJogo();
}

function atualizarImagemFase(fase) {
    var imagem = document.getElementById('imagem__jogo')
    if (fase === 'inicio') {
        imagem.src = './img/inicio.png'
    } else if (fase === 'errou') {
        imagem.src = './img/errou.png'
    } else if (fase === 'acertou') {
        imagem.src = './img/acertou.png'
    }
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto')
    exibirTextoNaTela('p', `Escolha um número entre:`)
}

exibirMensagemInicial()
atualizarImagemFase(inicio)

function mostrarModal() {
    let modal = document.getElementById('modal__acerto')
    modal.style.display = 'block'
}

function fecharModal() {
    let modal = document.getElementById('modal__acerto')
    modal.style.display = 'none'
}


function verificarChute() {
    let chuteInput = document.querySelector('.container__input[type="number"]');
    let chute = chuteInput.value;
    let rangeSelector = document.getElementById('range-selector');

    if (chute === '') {
        alert('Por favor, insira um número para chutar.');
        return;
    }

    rangeSelector.disabled = true;

    if (chute == numeroSecreto) {
        chuteInput.classList.add("input-certo");
        chuteInput.classList.remove("input-errado");

        exibirTextoNaTela('p', 'Parabéns, você acertou :)');
        atualizarImagemFase('acertou');
        mostrarModal();

        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativa = `Você acertou com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p', mensagemTentativa);
        document.getElementById('mensagem-tentativa').innerText = mensagemTentativa;
        document.getElementById('reiniciar').removeAttribute('disabled');

    } else {
        chuteInput.classList.add("input-errado");
        chuteInput.classList.remove("input-certo");

        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        atualizarImagemFase('errou');
    }

    tentativas++;
    limparCampo();
}

function gerarNumeroAleatorio() {
    let numeroEsolhido = parseInt(Math.random() * numeroLimite + 1)
    let quantidadeELementosLista = listaNumerosSorteados.length

    if(quantidadeELementosLista == numeroLimite){
        listaNumerosSorteados = []
    }


    if (listaNumerosSorteados.includes(numeroEsolhido)) {
        return gerarNumeroAleatorio()
    } else {
        listaNumerosSorteados.push(numeroEsolhido)
        return numeroEsolhido
    }
}

function limparCampo() {
    chute = document.querySelector('input')
    chute.value = ''
}

function select() {
    let rangeSelector = document.getElementById('range-selector');
    rangeSelector.disabled = false;
}

function corInput() {
    let chuteInput = document.querySelector('.container__input[type="number"]');
    chuteInput.classList.remove("input-certo", "input-errado");
}

function reiniciarJogo() {
    select()
    corInput()
    numeroSecreto = gerarNumeroAleatorio()
    tentativas = 1
    exibirMensagemInicial()
    limparCampo()
    document.getElementById('reiniciar').setAttribute('disabled', true)
    atualizarImagemFase('inicio')
    document.querySelector('.container__input[type="number"]').max = numeroLimite;
}