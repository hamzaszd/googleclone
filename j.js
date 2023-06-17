const queryInput = document.getElementById('queryInput');
const queries = ['Search Google', 'where\'s the nearest starbucks?','am I depressed?','what are the weird freckles on my foot?','I think my mother despises me'];

let currentQueryIndex = 0;
let currentCharacterIndex = 0;

function typeNextCharacter() {
  const currentQuery = queries[currentQueryIndex];
  const currentCharacter = currentQuery[currentCharacterIndex];

  queryInput.setAttribute('placeholder', currentQuery.substr(0, currentCharacterIndex + 1));

  currentCharacterIndex++;

  if (currentCharacterIndex < currentQuery.length) {
    setTimeout(typeNextCharacter, 100); // Delay between typing each character (adjust as needed)
  } else {
    currentCharacterIndex = 0;
    currentQueryIndex = (currentQueryIndex + 1) % queries.length;
    setTimeout(eraseCurrentQuery, 1000); // Delay before erasing the query (adjust as needed)
  }
}

function eraseCurrentQuery() {
  const currentQuery = queries[currentQueryIndex];
  const currentPlaceholder = queryInput.getAttribute('placeholder');

  if (currentPlaceholder.length > 0) {
    queryInput.setAttribute('placeholder', currentPlaceholder.slice(0, -1));
    setTimeout(eraseCurrentQuery, 50); // Delay between erasing each character (adjust as needed)
  } else {
    setTimeout(typeNextCharacter, 500); // Delay before typing the next query (adjust as needed)
  }
}

setTimeout(typeNextCharacter, 2000); // Delay before starting the auto typing effect (adjust as needed)






const searchInput = document.getElementById('queryInput');
const OPENAI_API_KEY = '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'; // Replace with your OpenAI API key

searchInput.addEventListener('input', async () => {
  const inputText = searchInput.value;

  // Make API request to OpenAI for autocomplete suggestions
  const suggestions = await getAutocompleteSuggestions(inputText);

  // Update the autocomplete list with the retrieved suggestions
  updateAutocompleteList(suggestions);
});

async function getAutocompleteSuggestions(inputText) {
  const prompt = `Given the user input: "${inputText}", suggest completions.`;
  const maxTokens = 10; // Maximum number of tokens in the generated response

  // Make API request to OpenAI to generate autocomplete suggestions
  const response = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      prompt,
      max_tokens: maxTokens,
      n: 5, // Number of suggestions to generate
    }),
  });

  const data = await response.json();
  const suggestions = data.choices.map(choice => choice.text.trim());

  return suggestions;
}

function updateAutocompleteList(suggestions) {
  const datalist = document.getElementById('autocompleteList');
  if (datalist) {
    datalist.remove();
  }

  if (suggestions.length > 0) {
    const newDatalist = document.createElement('datalist');
    newDatalist.id = 'autocompleteList';

    suggestions.forEach(suggestion => {
      const option = document.createElement('option');
      option.value = suggestion;
      newDatalist.appendChild(option);
    });

    searchInput.parentNode.insertBefore(newDatalist, searchInput.nextSibling);
  }
}
