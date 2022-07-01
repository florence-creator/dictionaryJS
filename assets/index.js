const wrapper = document.querySelector(".wrapper"),
  searchInput = wrapper.querySelector("input"),
  synonyms = wrapper.querySelector(".synonym .list"),
  volume = wrapper.querySelector(".word i"),
  removeIcon = wrapper.querySelector(".search span"),
  infoText = wrapper.querySelector(".info-text");

  const meaning = document.querySelector('#meaning')
const example = document.querySelector('#example')
const alerting = document.querySelector('#alert')
const close = document.querySelector('.material-icons')
const source = document.querySelector('#source')
let audio;

close.addEventListener('click', () => {
  searchInput.value = '';
  alerting.textContent=''
})

searchInput.addEventListener('keyup', (e) => {
  if (e.key == 'Enter') {
    fetchApi(searchInput.value)
    
  }
})

function evaluate(data) {
  wrapper.classList.add("active");
  cleaned_data = data[0].meanings[0]
  meaning.textContent = cleaned_data.definitions[0].definition
  if (cleaned_data.definitions[0].example) {
    example.textContent = cleaned_data.definitions[0].example;
  }
  if (cleaned_data.synonyms) {
      synonyms.textContent = cleaned_data.synonyms 
  }
  data[0].phonetics.forEach((phone) => {
    if (phone.audio) {
      source.src = phone.audio
      return
    }
  })

}
function errorhandler() {
  alerting.textContent = 'Please enter a valid english word!!!!'
}

// fetch api function
function fetchApi(word) {
  infoText.style.color = "#000";
  wrapper.classList.remove("active");
  infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  fetch(url)
    .then((res) => res.json())
    .then((result) => data(result, word));
}
