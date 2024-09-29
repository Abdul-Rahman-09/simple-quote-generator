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

// Fetch a new quote
const quote = () => {
  showLoadingSpinner();
  const random = Math.floor(Math.random() * retrievedQuotes.length);
  singleQuote = retrievedQuotes[random];

  // Set the author text
  if (!singleQuote.a) {
    authorText.innerText = "Unknown";
  } else {
    if (singleQuote.a.length > 20) {
      authorText.classList.add("long-author-name");
    } else {
      authorText.classList.remove("long-author-name");
    }
    authorText.innerText = singleQuote.a; // ZenQuotes uses 'a' for author
  }

  // Set the quote text
  if (singleQuote.q.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.innerText = singleQuote.q; // ZenQuotes uses 'q' for quote

  // Hide loading animation
  hideLoadingSpinner();
};

// Fetch quotes from ZenQuotes API
async function getQuotes() {
  const proxyUrl = "https://api.allorigins.win/raw?url="; // CORS Proxy
  const apiUrl = "https://zenquotes.io/api/quotes";
  try {
    const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));
    const data = await response.json();
    retrievedQuotes = data;
    // console.log("Retrieved quotes:", retrievedQuotes);
  } catch (error) {
    console.log("Whoops no quotes fetched", error);
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
  const twitterUrl = `https://twitter.com/intent/tweet?text=${singleQuote.q}\n --${singleQuote.a}`;
  window.open(twitterUrl, "_blank");
};

// Event listeners
twitterBtn.addEventListener("click", tweetQuote);
newQuoteBtn.addEventListener("click", quote);

// Initialize
init();
