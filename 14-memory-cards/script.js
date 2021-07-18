const cardsContainer = document.querySelector('#cards-container');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const currentEl = document.querySelector('#current');
const showBtn = document.querySelector('#show');
const hideBtn = document.querySelector('#hide');
const questionEl = document.querySelector('#question');
const answerEl = document.querySelector('#answer');
const addCardBtn = document.querySelector('#add-card');
const clearBtn = document.querySelector('#clear');
const addContainer = document.querySelector('#add-container');

// Keep track of current card
let currentActiveCard = 0;

// Store DOM cards
const cardsEl = [];

// Store card data
const cardsData = getCardsData();

// const cardsData = [
//   {
//     question: 'what is your favorite color?',
//     answer: 'blue',
//   },
//   {
//     question: 'what is your favorite planet?',
//     answer: 'earth',
//   },
//   {
//     question: 'what is your favorite power ranger?',
//     answer: 'green ranger',
//   },
// ];

// Create all cards
function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

// Create a single card in the DOM
function createCard(data, index) {
  const card = document.createElement('div');
  card.classList.add('card');

  if (index === 0) {
    card.classList.add('active');
  }

  card.innerHTML = `
        <div class="inner-card">
          <div class="inner-card-front">
            <p>
              ${data.question}
            </p>
          </div>
          <div class="inner-card-back">
            <p>
              ${data.answer}
            </p>
          </div>
        </div>
  `;

  card.addEventListener('click', () => card.classList.toggle('show-answer'));

  // Add to DOM cards
  cardsEl.push(card);

  cardsContainer.appendChild(card);

  updateCurrentText();
}

// Show number of cards
function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

// Get cards from local storage
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem('cards'));
  return cards === null ? [] : cards;
}

// Add card to local storage
function setCardsData(cards) {
  localStorage.setItem('cards', JSON.stringify(cards));
  window.location.reload();
}

createCards();

// Event Listeners

//Next button
nextBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card left';

  currentActiveCard = currentActiveCard + 1;

  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = 'card active';

  updateCurrentText();
});

//Previous button
prevBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card right';

  currentActiveCard = currentActiveCard - 1;

  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = 'card active';

  updateCurrentText();
});

// Show add container
showBtn.addEventListener('click', () => addContainer.classList.add('show'));

// Hide add container
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));

// Add new card
addCardBtn.addEventListener('click', () => {
  const question = questionEl.value;
  const answer = answerEl.value;

  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };

    createCard(newCard);

    questionEl.value = '';
    answerEl.value = '';

    addContainer.classList.remove('show');

    cardsData.push(newCard);

    setCardsData(cardsData);
  }
});

// Clear cards
clearBtn.addEventListener('click', () => {
  localStorage.clear();
  cardsContainer.innerHTML = '';
  window.location.reload();
});
