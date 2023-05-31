let resultContainer = null;
let errorMessage = null;

document.querySelector('.search-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  let inputValue = document.querySelector('.search').value;
  console.log(inputValue);

  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`);
    const data = await response.json();
    console.log(data);

    if (data.title === 'No Definitions Found') {
      displayErrorMessage();
    } else {
      displayResults(data);
    }
  } catch (error) {
    console.log(error);
  }

  document.querySelector('.search').value = "";
});

function displayErrorMessage() {
  clearResults();

  errorMessage = document.createElement('p');
  errorMessage.classList.add('error')
  errorMessage.innerHTML = '<strong>No Such Word Is Found</strong>';
  document.querySelector('.search-form').insertAdjacentElement('afterend', errorMessage);
}

function displayResults(data) {
  clearResults();

  resultContainer = document.createElement('div');
  resultContainer.classList.add('results');

  data.forEach((entry) => {
    const entryElement = document.createElement('div');
    entryElement.classList.add('entry');

    const wordElement = document.createElement('h2');
    wordElement.textContent = entry.word;

    const definitionElement = document.createElement('p');
    const firstNoun = entry.meanings.find((meaning) => meaning.partOfSpeech === 'noun');
    if (firstNoun && firstNoun.definitions.length > 0) {
      definitionElement.textContent = firstNoun.definitions[0].definition;
    } else {
      clearResults();
      displayErrorMessage();
      return; // Exit the function early
    }

    entryElement.appendChild(wordElement);
    entryElement.appendChild(definitionElement);

    resultContainer.appendChild(entryElement);
  });

  document.querySelector('.search-form').insertAdjacentElement('afterend', resultContainer);
}

function clearResults() {
  if (resultContainer) {
    resultContainer.remove();
    resultContainer = null;
  }
  
  if (errorMessage) {
    errorMessage.remove();
    errorMessage = null;
  }
}
