const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const place = 0;

/* console.log(movieSelect.value); */
/* if (movieSelect.value === 8) {
    console.log('its 8');
}  */

/* const currentMovieValue = movieSelect.value; */

movieSelect.addEventListener('click', (e) => {
    if(movieSelect.value !== place) {
        console.log('hurray');
    }
});


/* movieSelect.addEventListener('valueChange', function(event) {
    total.innerHTML = 0;
    count.innerHTML = 0;
    console.log('test');
}); */

const myArray = ['bob', 'john', 'bob', 'john']
console.log(myarray[2]);

container.addEventListener('click', (e) => {
    const selectedMoviePrice = movieSelect.options[movieSelect.selectedIndex].value;
    if (e.target.className === 'seat' && e.target.parentElement.className === 'row') {
        e.target.className = 'seat selected';
        count.innerHTML++;
    } else if (e.target.className === 'seat selected' && e.target.parentElement.className === 'row') {
        e.target.className = 'seat';
        count.innerHTML--;
    }
    const place = movieSelect.value;
    total.innerHTML = count.innerHTML*selectedMoviePrice;
});











/* function seatSelectValidator(target) {
    if(target.className === 'seat' && target.parentElement.className === 'row' && ) {
        return true;
    }
} */