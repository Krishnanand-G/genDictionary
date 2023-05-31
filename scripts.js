let body = document.querySelector('body');

document.querySelector('.search-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    let inputValue = document.querySelector('.search').value;
    console.log(inputValue);
  
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }

    document.querySelector('.search').value = "";
  });
  