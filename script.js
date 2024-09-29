// Globals
let retrievedQuotes = [];
let singleQuote;

// DOM elements
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");

// Test quotes
const quote = () => {
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
};

// Fetch quotes from API
async function getQuotes() {
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

// Wait for quotes to be fetched before calling the quote function
async function init() {
  await getQuotes();
  quote();
}

// Event listener for new quote button
newQuoteBtn.addEventListener("click", quote);

init();
