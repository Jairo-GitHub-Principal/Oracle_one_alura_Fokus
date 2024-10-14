const html = document.querySelector('html');
const focobt = document.querySelector('.app__card-button--foco');
const d_curtobt = document.querySelector('.app__card-button--curto');
const d_longobt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const paragrafo = document.getElementById('minhaSecao');
const butons = document.querySelectorAll('.app__card-button');
const tempoNaTela = document.querySelector('#timer')

const startPauseBt = document.getElementById('start-pause');
const start = document.querySelector('.start');// selecina a tag span como o nome atuala  da ação do botão 
const imgPause = startPauseBt.childNodes;// seleciona os filhos do elemento armazenado em startPauseBt ou que tem o id start-puuse
// const timer = document.getElementById('timer'); // seleciondo  a tag timer 
// let p_time = document.createElement('p'); // criamos a tag p e armazenamos na let p_time
let timeDecorridoEmSegundos = 1500; // criamos a let do time que sera exibida na tag p
let intervalo = null;
audioStartTime = new Audio('./sons/play.wav');
audioPauseTime = new Audio('./sons/pause.mp3');
audioEndTime = new Audio('./sons/beep.mp3');

// selecionar o elemento do musica, instancia um objeto de audio, implementar o loop do audio e 
// criar o evento para dar play e pause na musica
const musicaInput = document.querySelector('#alternar-musica');
musica = new Audio('./sons/luna-rise-part-one.mp3');
musica.loop = true;


musicaInput.addEventListener('change', function () {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});








focobt.addEventListener('click', () => {
  timeDecorridoEmSegundos = 1500; // atribuimo o tempo para a let time
  //  p_time.textContent = timeDecorridoEmSegundos; // pegamos a let time e atribuimos o valor dela como valor da tag p armazenada em p_time
  //  tempoNaTela.appendChild(p_time);// pegamos a tag p armazenada em p_time e atribuimos como elemento filho de uma tag <div> com id='timer' que foi selecionada e armazenadaa na let timer
  alterarContexto('foco');
  focobt.classList.add('active');
  mostrarTempoNaTela(); // essa função implementa um algoritimo que formata o tempo e o insere no elemento html mostrando-o na tela
  /** obs.: cada ouvinte de evento como esse usado para alterar o contexto, tambem altera o valor do tempo, 
   * então quando o botão de um determinado contexto e clicado, altera o contexto e tambem o valor do tempo que esta realacioando a ele
   */

});

d_curtobt.addEventListener('click', () => {
  timeDecorridoEmSegundos = 300; // atribuimo o tempo para a let time
  // p_time.textContent = timeDecorridoEmSegundos; // pegamos a let time e atribuimos o valor dela como valor da tag p armazenada em p_time
  // tempoNaTela.appendChild(p_time);// pegamos a tag p armazenada em p_time e atribuimos como elemento filho de uma tag <div> com id='timer' que foi selecionada e armazenadaa na let timer
  alterarContexto('descanso-curto');
  // paragrafo.innerHTML = ''; // remove o todo conteudo de dentro do elemento html armazenado em paragrafo
  d_curtobt.classList.add('active');
  mostrarTempoNaTela();

});

d_longobt.addEventListener('click', () => {
  timeDecorridoEmSegundos = 900; // atribuimo o tempo para a let time
  // p_time.textContent = timeDecorridoEmSegundos; // pegamos a let time e atribuimos o valor dela como valor da tag p armazenada em p_time
  // tempoNaTela.appendChild(p_time);// pegamos a tag p armazenada em p_time e atribuimos como elemento filho de uma tag <div> com id='timer' que foi selecionada e armazenadaa na let timer

  alterarContexto('descanso-longo');
  // paragrafo.innerHTML = '';
  // focobt.classList.remove('active');
  // d_curtobt.classList.remove('active');
  d_longobt.classList.add('active');
  mostrarTempoNaTela()

});

function alterarContexto(contexto) {

  butons.forEach(function (contexto) {
    contexto.classList.remove('active')
  })



  html.setAttribute('data-contexto', contexto);
  banner.setAttribute('src', `./imagens/${contexto}.png`);
  /**
   * através do codigo abaixo estamos comparando qual botão foi clicado 
   * e de acordo com o botão clicado, definimos o texto do titulo da pagina, 
   * obs.: a variavel titulo armazena o elemento html h1 que foi selecionado pele querySelector()
   */
  switch (contexto) {
    case 'foco':

      titulo.innerHTML = `Otimize sua produtividade,<br>
        <strong class="app__title-strong">mergulhe no que importa.</strong>`;
      paragrafo.innerHTML = `<h1>Foco</h1>`; // add o h1 com valor 'Foco' dentro do elemento html armazenado na variavel paragrafo
      paragrafo.style = "font-Size:40px; color:white;border:solid 1px white; padding:10px"
      break;

    case 'descanso-curto':
      titulo.innerHTML = `Que tal dar uma respirada? <br>
          <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
      break;

    case 'descanso-longo':
      titulo.innerHTML = `Hora de voltar à superfície. <br>
           <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
      break;

    default:
      break;
  }

}


// função para contagem do tempo:
const contagemRegrassiva = () => { // função que vai decrementar o tempo

  if (timeDecorridoEmSegundos < 7) {
    audioEndTime.play();
  }

  if (timeDecorridoEmSegundos <= 0) {

    alert('Tempo finalizado')
    zerar();
    return;
  }
  timeDecorridoEmSegundos -= 1;
  mostrarTempoNaTela();
  console.log('tempo decorrido: ' + timeDecorridoEmSegundos);

}


startPauseBt.addEventListener('click', iniciarOuPausar) // evento de click no button start pause, pra chamar a função que implementa um setInterval() para chamar a função que decrementa o tempo a cada 1000 ms ou 1 segundo

function iniciarOuPausar() {

  if (start.textContent === 'Começar') {
    audioStartTime.play();
  }

  if (intervalo) { // se o intervalo estiver iniciado, ele sera pausado quando clicar no botão começar  e despausado quando o mesmo botão for clicado de novo
    audioPauseTime.play();
    zerar()
    return
  }
  start.textContent = 'Pausar';

  imgPause[1].setAttribute('src', './imagens/pause.png');// add o simbolo do pause na botão queando estiver com o nome pausar

  intervalo = setInterval(contagemRegrassiva, 1000); // função que implementa um setInterval() para chamar a função que decrementa o tempo a cada 1000 ms ou 1 segundo
}


function zerar() {
  start.textContent = 'Começar';
  imgPause[1].setAttribute('src', './imagens/play_arrow.png'); // add a seta do play no botão com o nome Começar
  clearInterval(intervalo); // limpa a nossa variavel de intervalo
  intervalo = null; // reseta o valor da variavel intervalo para null
}



function mostrarTempoNaTela() {
  const tempo = new Date(timeDecorridoEmSegundos * 1000);// formatar o valor bruto , que atribuimos para o tempo para que o mesmo possa ser exibido no fomrato minutos e segundos
  const tempoFormatado = tempo.toLocaleTimeString('pt-br', { minute: '2-digit', second: '2-digit' }); // formata o temmpo par minuto e segundos
  tempoNaTela.innerHTML = `${tempoFormatado}`; // insere o valor do tempo dentro do elemento html selecionado e armazendado na variavel tempoNaTela

}
mostrarTempoNaTela();


// __________________________Text de alerta de função auto invocada_______________________________
var texto = "ola mundo";

(function msgNaTela() {/** aqui temos uma IIFE ou (immediately invoked function) trata se de uma função  */
  alert(texto);// imediatamente invocada, o que faz essa função ser uma IIFE é o encapsulamento  
  less();
})()                 // com os () envolvendo a função e os () depois do encapsulamento: (function nome(){})(), 
  // isso é o mesmo que fazer: decalrar a função function nome(){...} e chamar a função nome() 

  function less(){

    alert("less is more!");

  };                                