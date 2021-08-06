const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const place = 0;

movieSelect.addEventListener('click', (e) => {
  if (movieSelect.value !== place) {
    console.log('hurray');
  }
});

const myArray = ['bob', 'john', 'bob', 'john'];
console.log(myArray[2]);

container.addEventListener('click', (e) => {
  const selectedMoviePrice =
    movieSelect.options[movieSelect.selectedIndex].value;
  if (
    e.target.className === 'seat' &&
    e.target.parentElement.className === 'row'
  ) {
    e.target.className = 'seat selected';
    count.innerHTML++;
  } else if (
    e.target.className === 'seat selected' &&
    e.target.parentElement.className === 'row'
  ) {
    e.target.className = 'seat';
    count.innerHTML--;
  }
  const place = movieSelect.value;
  total.innerHTML = count.innerHTML * selectedMoviePrice;
});
