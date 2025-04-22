// Corpus data for the experiment
const corpus = {
  english: [
    "Forming sentences is fun",
    "All that glitters is not gold",
    "Actions speak louder than words",
    "Rome was not built in a day",
    "The pen is mightier than the sword",
    "Time and tide wait for none",
    "A picture is worth a thousand words",
    "When in Rome, do as the Romans do",
    "Birds of a feather flock together",
    "A stitch in time saves nine",
    "Honesty is the best policy",
    "You can't judge a book by its cover",
    "The early bird catches the worm",
  ],
  hindi: [
    "वाक्य बनाना मजेदार है",
    "सीपियाँ बेचने वाली लड़की समुद्र तट पर है",
    "जो चमकता है वह सोना नहीं होता",
    "कर्म शब्दों से अधिक जोर से बोलते हैं",
    "रोम एक दिन में नहीं बना था",
    "कलम तलवार से अधिक शक्तिशाली है",
    "समय और ज्वार किसी की प्रतीक्षा नहीं करते",
    "एक तस्वीर हजार शब्दों के बराबर होती है",
    "जब रोम में हो, तो रोमनों की तरह व्यवहार करो",
    "एक जैसे पंखों वाले पक्षी साथ उड़ते हैं",
    "समय पर किया गया काम नौ समस्याओं को बचाता है",
    "ईमानदारी सबसे अच्छी नीति है",
    "आप किताब को उसके कवर से नहीं आंक सकते",
    "सुबह का पक्षी कीड़ा पकड़ता है",
  ],
};

let possibleSentences = [];
let selectedWords = [];
let words = [];
let turn = 0;

// Initialize the exercise
function initializeExercise(language) {
  if (language === "null") {
    alert("Select a language");
    return;
  }

  // Select a random sentence from the corpus
  const sentences = corpus[language];
  const randomIndex = Math.floor(Math.random() * sentences.length);
  const selectedSentence = sentences[randomIndex];

  // Split the sentence into words and shuffle them
  possibleSentences = [selectedSentence];
  words = selectedSentence.split(" ");
  shuffleArray(words);

  // Reset state
  selectedWords = [];
  turn = 0;

  // Render the exercise
  renderExercise();
}

// Shuffle an array (Fisher-Yates shuffle)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Render the exercise UI
function renderExercise() {
  const wordsContainer = document.getElementById("words_sentence");
  wordsContainer.innerHTML = "";

  // Render the shuffled words as buttons
  words.forEach((word, index) => {
    const button = document.createElement("button");
    button.textContent = word;
    button.onclick = () => selectWord(word, index);
    wordsContainer.appendChild(button);
    wordsContainer.appendChild(document.createTextNode(" "));
  });

  // Render the selected words
  if (selectedWords.length > 0) {
    const formedSentenceDiv = document.createElement("div");
    formedSentenceDiv.style.color = "#0000AA";
    formedSentenceDiv.innerHTML = `<b>Formed Sentence</b> (<i style="color:#0000FF">after selecting words</i>): `;
    const sentence = document.createElement("b");
    sentence.style.fontSize = "30px";
    sentence.textContent = selectedWords.join(" ");
    formedSentenceDiv.appendChild(sentence);
    wordsContainer.appendChild(document.createElement("br"));
    wordsContainer.appendChild(document.createElement("br"));
    wordsContainer.appendChild(formedSentenceDiv);
  }

  // Render the "Re-form" button
  if (selectedWords.length > 0) {
    const reformButton = document.createElement("button");
    reformButton.textContent = "Re-form the sentence";
    reformButton.onclick = clearSelection;
    wordsContainer.appendChild(document.createElement("br"));
    wordsContainer.appendChild(document.createElement("br"));
    wordsContainer.appendChild(reformButton);
  }

  // Render the "Check" button
  if (selectedWords.length === possibleSentences[0].split(" ").length) {
    const checkButton = document.createElement("button");
    checkButton.textContent = "Check the correctness of this sentence";
    checkButton.onclick = checkSentence;
    wordsContainer.appendChild(document.createElement("br"));
    wordsContainer.appendChild(document.createElement("br"));
    wordsContainer.appendChild(checkButton);
  }
}

// Handle word selection
function selectWord(word, index) {
  selectedWords.push(word);

  // Remove the selected word from the array
  words.splice(index, 1);

  // Re-render the exercise to reflect the changes
  renderExercise();
}

// Clear the selection
function clearSelection() {
  // Reset the selected words and restore the original shuffled words
  selectedWords = [];
  words = possibleSentences[0].split(" ");
  shuffleArray(words);

  // Re-render the exercise
  renderExercise();
}

// Check the correctness of the sentence
function checkSentence() {
  turn++;
  const formedSentence = selectedWords.join(" ");
  const isCorrect = possibleSentences.some(
    (sentence) => sentence.trim() === formedSentence.trim()
  );

  const resultDiv = document.createElement("div");
  resultDiv.style.textAlign = "center";
  resultDiv.style.fontSize = "30px";
  if (isCorrect) {
    resultDiv.style.color = "#008000";
    resultDiv.textContent = "Right answer!!!";
  } else {
    resultDiv.style.color = "#FF0000";
    resultDiv.textContent = "Wrong answer!!!";

    // Add "Get Correct Sentence" button
    const getAnswerButton = document.createElement("button");
    getAnswerButton.textContent = "Get Correct Sentence";
    getAnswerButton.onclick = showCorrectAnswer;
    resultDiv.appendChild(document.createElement("br"));
    resultDiv.appendChild(document.createElement("br"));
    resultDiv.appendChild(getAnswerButton);
  }

  document.getElementById("words_sentence").appendChild(resultDiv);
}

// Show the correct sentence(s)
function showCorrectAnswer() {
  const resultDiv = document.getElementById("words_sentence").lastChild;

  // Create a new div for the correct answer
  const answerDiv = document.createElement("div");
  answerDiv.id = "correct-answer";
  answerDiv.style.fontSize = "20px";
  answerDiv.style.color = "#0000FF";
  answerDiv.style.marginTop = "10px";

  // Display all possible correct sentences
  possibleSentences.forEach((sentence) => {
    const sentenceDiv = document.createElement("p");
    sentenceDiv.textContent = sentence.trim();
    sentenceDiv.style.margin = "0";
    answerDiv.appendChild(sentenceDiv);
  });

  resultDiv.appendChild(answerDiv);
}
