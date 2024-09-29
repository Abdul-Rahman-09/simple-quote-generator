// Globals
let retrievedQuotes = [];
let singleQuote;

// DOM elements
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Test quotes
const quote = () => {
  showLoadingSpinner();
  const random = Math.floor(Math.random() * retrievedQuotes.length);
  singleQuote = retrievedQuotes[random];

  // Set the author text
  if (!singleQuote.author) {
    authorText.innerText = "Unknown";
  } else {
    if (singleQuote.author.length > 20) {
      authorText.classList.add("long-author-name");
    } else {
      authorText.classList.remove("long-author-name");
    }
    authorText.innerText = singleQuote.author;
  }

  // Set the quote text
  if (singleQuote.text.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.innerText = singleQuote.text;

  // Hide loading animation
  hideLoadingSpinner();
};

// Fetch quotes from API
async function getQuotes() {
  showLoadingSpinner();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    retrievedQuotes = data;
  } catch (error) {
    console.log(error);
    retrievedQuotes = islamicQuotes; // Fallback to local quotes if fetching fails
  }
}

// Show loading animation
function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide loading animation
function hideLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Wait for quotes to be fetched before calling the quote function
async function init() {
  await getQuotes();
  quote();
}

//Tweet
const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${singleQuote.text}\n --${singleQuote.author}`;
  window.open(twitterUrl, "_blank");
};
// Event listener for quote buttons
twitterBtn.addEventListener("click", tweetQuote);
newQuoteBtn.addEventListener("click", quote);

init();
