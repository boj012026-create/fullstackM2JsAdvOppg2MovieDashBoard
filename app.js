const movieForm = document.getElementById("movie-form"); 
const factContainer = document.getElementById("fact-container"); 
const movieTable = document.getElementById("movie-table"); 
const addMovieBtn = document.getElementById("add-btn");
const deleteAllbtn = document.getElementById("delete-all-btn");
const searchBtn = document.getElementById("search-btn");
const sortKey = document.getElementById("sort-key");
const sortReverse = document.getElementById("sort-reverse");

let movies = [];
const movieFilter = {
  id: 1,
  title: "",
  genre: "All", 
  length: 0,
  rating: 0,
  timesWatched: 0
}

const sort = {
  key: "title",
  reverse: false
}

//console.log(`
	//movieForm ${movieForm}
	//factContainer ${factContainer}
	//movieTable ${movieTable}
	//addMovieBtn ${addMovieBtn}
	//deleteAllbtn ${deleteAllbtn}
//`);

sortReverse.addEventListener('change', (e) => {
  sort.reverse = e.target.checked;
  renderPage();
});

sortKey.addEventListener('change', (e) => {
  sort.key = e.target.value;
  renderPage();
});

searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const formData = new FormData(movieForm);
  movieFilter.title = formData.get("movie-title");
  movieFilter.genre = formData.get("movie-genre"); 
  movieFilter.length = formData.get("movie-length");
  movieFilter.rating = formData.get("movie-rating");
  movieFilter.timesWatched = formData.get("movie-watched");
  renderPage();
});

deleteAllbtn.addEventListener('click', () => {
  movies = [movieFilter];
  saveLocal();
  renderPage();
});

addMovieBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const formData = new FormData(movieForm);
  const newMovie = {
    id: movies.length + 1,
    title: formData.get("movie-title"),
    genre: formData.get("movie-genre"), 
    length: formData.get("movie-length"),
    rating: formData.get("movie-rating"),
    timesWatched: formData.get("movie-watched")
  }
  //console.log(newMovie);
  movies.unshift(newMovie);
  renderPage();
});

function buildMovieTable(movieArr) {
  const tableTitles = buildTableHeaders("Tittel", "Sjanger", "Minutt", "Vurdering", "Sett")
  movieTable.append(tableTitles);
  movieArr.forEach(m => {
    movieTable.append(createRow(m));
  });
  return movieTable;
}

function createRow(movieObj) {
  const row = document.createElement('tr');
  const { title, genre, length, rating, timesWatched} = movieObj;
  //console.log(title, genre, length, rating, timesWatched);

  row.id = movieObj.id;
  row.classList.add('movie-row');

  row.append(createCell(title)); 
  row.append(createCell(genre)); 
  row.append(createCell(length)); 
  row.append(createCell(rating)); 
  row.append(createCell(timesWatched)); 
  
  row.readOnly = true;
  row.append(createEditBtn(row));
  row.append(createDeleteBtn(row));
  return row; 
}

function createDeleteBtn(parentRow) {
  const delBtn = document.createElement('button');
  delBtn.classList.add('item-btn');
  delBtn.textContent = "Slett";

  delBtn.addEventListener('click', () => {
    const movieObj = movies.filter(m => m.id == parentRow.id)[0];
    const movieIndex = movies.indexOf(movieObj);
    movies.splice(movieIndex, 1);
    //console.log(`movieIndex: ${movieIndex}`);
    saveLocal();
    renderPage();    
  });
  return delBtn;
}

function createEditBtn(parentRow) {
  const editBtn = document.createElement('button');
  editBtn.textContent = "Endre";
  editBtn.classList.add('item-btn');
  
  editBtn.addEventListener('click', () => {
    const cellRow = parentRow.querySelectorAll('input');
    parentRow.readOnly = !parentRow.readOnly;
    
    cellRow.forEach(cell => {
      cell.readOnly = parentRow.readOnly;
    });

    if (parentRow.readOnly) {
      saveRow(parentRow);
      saveLocal();
      parentRow.classList.remove('edit');
    } else {
      parentRow.classList.add('edit'); 
    }

    editBtn.textContent = parentRow.readOnly ? "Endre": "Lagre";
  });

  return editBtn;
}

function saveRow(row) {
  const movieObj = movies.filter(m => m.id == row.id)[0];
  const movieKeys = Object.keys(movieObj);
  //const movieIndex = movies.indexOf(movieObj);
  const cells = row.querySelectorAll('input');
  
  for (let i = 0; i < cells.length; i++) {
    movieObj[movieKeys[i + 1]] = cells[i].value;
  }
  saveLocal();
}

function saveLocal() {
  localStorage.setItem("movies", JSON.stringify(movies));
}

function createCell(text) {
  const cell = document.createElement('td');
  const txtInput = document.createElement('input');

  txtInput.type = "text";
  txtInput.value = text;
  txtInput.readOnly = true;
  txtInput.classList.add('cell-input');
  
  cell.append(txtInput);
  return cell;
}

function buildTableHeaders(...headers) {
  const hdrRow = document.createElement('tr');
  hdrElm = headers.forEach(h => {
    const hdr = document.createElement('th');
    hdr.textContent = h;
    hdrRow.append(hdr);
  });
  return hdrRow;
}

function buildFacts(movieArr) {
  const viewTime = document.createElement('h3');
  const time = movieArr.reduce((t, m) => t + (m.length * m.timesWatched),0,);
  //console.log(time);
  viewTime.textContent = `Minutter brukt: ${time}`;
  factContainer.append(viewTime);
}

function renderPage() {
  clearPage()
  buildFacts(movieSort(searcFilter(movies)));
  buildMovieTable(movieSort(searcFilter(movies)));
}

loadData();
renderPage();

function movieSort(movieArr) {
  return movieArr.sort((a,b) => {
    if (sort.reverse) {
      return compare(b[sort.key], a[sort.key]);
  } else {
      return compare(a[sort.key], b[sort.key]);
  }
});
}

function compare(a, b) {
  if( typeof a === 'string' && typeof b === 'string') {
    return a.localeCompare(b);
  } else {
    return b - a;
  }
}
function searcFilter(movieArr) {
  //console.log(movieFilter);
  //return movieArr;
  return movieArr.filter(m => { 
    //console.log(m);
    const title = m.title.toLowerCase().includes(movieFilter.title.toLowerCase());
    const genre = movieFilter.genre === "All" || m.genre === movieFilter.genre;
    const length = movieFilter.length <= m.length;
    const rating = movieFilter.rating <= m.rating;
    const watched = movieFilter.timesWatched <= m.timesWatched;
    return title && genre && length && rating && watched;
  })
}

function loadData() {
  const storedMovies = JSON.parse(localStorage.getItem("movies"));
  if (storedMovies) {
    movies = storedMovies;
  }
  if (movies.length <= 0) {
    movies = getDefaultMovies();
  }
}
function clearPage() {
  movieTable.replaceChildren();
  factContainer.replaceChildren();
}

function getDefaultMovies() {
  /*generated with google AI*/
  /* prompt:
  create me a list of 23 popular movies as an js object array,
  that includes the attributes:
  id, title, genre, length in minutes, owned, rating, timesWatched
   * */

  const popularMovies = [
  { id: 1, title: "Inception", genre: "Sci-Fi", length: 148, rating: 8.8, timesWatched: 5 },
  { id: 2, title: "The Dark Knight", genre: "Action", length: 152, rating: 9.0, timesWatched: 8 },
  { id: 3, title: "Interstellar", genre: "Sci-Fi", length: 169, rating: 8.6, timesWatched: 6 },
  { id: 4, title: "Parasite", genre: "Thriller", length: 132, rating: 8.5, timesWatched: 3 },
  { id: 5, title: "Spirited Away", genre: "Animation", length: 125, rating: 8.6, timesWatched: 4 },
  { id: 6, title: "Avengers: Endgame", genre: "Action", length: 181, rating: 8.4, timesWatched: 7 },
  { id: 7, title: "The Matrix", genre: "Sci-Fi", length: 136, rating: 8.7, timesWatched: 10 },
  { id: 8, title: "Titanic", genre: "Romance", length: 194, rating: 7.9, timesWatched: 5 },
  { id: 9, title: "The Godfather", genre: "Crime", length: 175, rating: 9.2, timesWatched: 4 },
  { id: 10, title: "Pulp Fiction", genre: "Crime", length: 154, rating: 8.9, timesWatched: 6 },
  { id: 11, title: "The Shawshank Redemption", genre: "Drama", length: 142, rating: 9.3, timesWatched: 9 },
  { id: 12, title: "Avatar", genre: "Sci-Fi", length: 162, rating: 7.8, timesWatched: 3 },
  { id: 13, title: "The Lord of the Rings: The Fellowship of the Ring", genre: "Fantasy", length: 178, rating: 8.8, timesWatched: 7 },
  { id: 14, title: "Star Wars: A New Hope", genre: "Sci-Fi", length: 121, rating: 8.6, timesWatched: 12 },
  { id: 15, title: "Joker", genre: "Drama", length: 122, rating: 8.4, timesWatched: 3 },
  { id: 16, title: "Forrest Gump", genre: "Drama", length: 142, rating: 8.8, timesWatched: 8 },
  { id: 17, title: "The Lion King", genre: "Animation", length: 88, rating: 8.5, timesWatched: 15 },
  { id: 18, title: "Gladiator", genre: "Action", length: 155, rating: 8.5, timesWatched: 5 },
  { id: 19, title: "Dune", genre: "Sci-Fi", length: 155, rating: 8.0, timesWatched: 2 },
  ];

  return popularMovies;
}
