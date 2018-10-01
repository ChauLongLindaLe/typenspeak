//Init SpeechSynth API
const synth = window.speechSynthesis;

//Grabbing all DOM elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');


//init voices array. Fetch the voices using the API
let voices =[]

const getVoices = () => {
  voices = synth.getVoices();
  //this is called asynchronously so we need to wait for onvoiceschanged event is fired when it is loaded. To get around this we set the voice from the callback for that event listener. This is addressed by the if statement below.
  console.log(voices);
  // reaches into the API and it has a method getvoices



  //Loop through voices and create option for each one


};

getVoices();
if(synth.onvoiceschanged !== undefined){
  synth.onvoiceschanged = getVoices;
}
