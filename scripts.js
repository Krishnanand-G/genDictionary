let errorMessage = null;

document.querySelector('.search-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    let inputValue = document.querySelector('.search').value;
    console.log(inputValue);
  
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`);
      const data = await response.json();
      console.log(data);

      if(data.title === 'No Definitions Found') {
        displayErrorMessage();
      } else {
        removeErrorMessage();
      }
    } catch (error) {
      console.log(error);
    }

    document.querySelector('.search').value = "";
  });

  function displayErrorMessage() {
    errorMessage = document.createElement('p');
    errorMessage.innerHTML = '<strong>No Such Word Is Found</strong>'
    document.querySelector('.search-form').insertAdjacentElement('afterend', errorMessage);
  }
  
  function removeErrorMessage() {
    if (errorMessage) {
      errorMessage.remove();
      errorMessage = null;
    }
  }