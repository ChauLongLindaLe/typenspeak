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
let voices =[];

const getVoices = () => {
  voices = synth.getVoices();
  //this is called asynchronously so we need to wait for onvoiceschanged event is fired when it is loaded. To get around this we set the voice from the callback for that event listener. This is addressed by the if statement below.
  console.log(voices);
  // reaches into the API and it has a method getvoices



  //Loop through voices and create option for each one
  voices.forEach(voice => {
    //create option elements
    const option = document.createElement('option');
    //Fill option with voice and language
    option.textContent = voice.name + '('+ voice.lang +')';

    //Set needed option attributes
    option.setAttribute('data-lang, voice.lang');
    option.setAttribute('data-name, voice.name');
    voiceSelect.appendChild(option);
  });
};

getVoices();
if(synth.onvoiceschanged !== undefined){
  synth.onvoiceschanged = getVoices;
}

//Speak

const speak = () => {
  //check if speaking
  if(synth.speaking){
    console.error('Already speaking..');
    return;
  }
  if(textInput.value !== ''){

    //Get speak text
    const speakText = new SpeechSynthesisUtterance(textInput.value);
    //Speak end

    speakText.onend = e => {
      console.log('Done speaking...');
    };

    //Speak error
    speakText.onerror = e => {
      console.error('Something went wrong');

    };

    //Selected voice

    const selectedVoice = voiceSelect.selectedOptions[0]
      .getAttribute('data-name');

    //Loop through voices
    voices.forEach(voice => {
      if(voice.name === selectedVoice){
        speakText.voice =voice;
      }
    });

    //Set pitch and rate
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;

    //Speak
    synth.speak(speakText);
  }
};

//EVENT LISTENERS
