const movieForm = document.getElementById("movie-form"); 
const factContainer = document.getElementById("fact-container"); 
const movieTable = document.getElementById("movie-table"); 

const movies = getDefaultMovies();

console.log(`
	movieForm ${movieForm}
	factContainer ${factContainer}
	movieTable ${movieTable}
`);

function buildMovieTable(movieArr) {
  const tableTitles = buildTableHeaders("Tittel", "Sjanger", "Minutt", "Vurdering", "Sett")
  movieTable.append(tableTitles);
  movieArr.forEach(m => {
    const row = document.createElement('tr');
    const { title, genre, length, rating, timesWatched} = m;
    console.log(title, genre, length, rating, timesWatched);
    row.append(createCell(title)); 
    row.append(createCell(genre)); 
    row.append(createCell(length)); 
    row.append(createCell(rating)); 
    row.append(createCell(timesWatched)); 
    
    row.readOnly = true;
    row.append(createEditBtn(row));
    movieTable.append(row);
  });
  return movieTable;
}

function createEditBtn(parentRow) {
  const editBtn = document.createElement('button');
  editBtn.textContent = "Endre";
  
  editBtn.addEventListener('click', () => {
    const cellRow = parentRow.querySelectorAll('input');

    parentRow.readOnly = !parentRow.readOnly;
    
    cellRow.forEach(cell => {
      cell.readOnly = parentRow.readOnly;
    });

    editBtn.textContent = parentRow.readOnly ? "Endre" : "Lagre";

    //lagre

    console.log("edit btn pressed");
  });

  return editBtn;
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

function buildFacts() {

}

function renderPage() {
  clearPage()
  buildFacts();
  buildMovieTable(movies);
}

renderPage();

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

  const movies = [
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
  { id: 20, title: "Inception", genre: "Sci-Fi", length: 148, rating: 8.8, timesWatched: 5 },
  { id: 21, title: "The Dark Knight", genre: "Action", length: 152, rating: 9.0, timesWatched: 8 },
  { id: 22, title: "Parasite", genre: "Thriller", length: 132, rating: 8.5, timesWatched: 3 },
  { id: 23, title: "The Shawshank Redemption", genre: "Drama", length: 142, rating: 9.3, timesWatched: 9 }
  ];

  return movies;
}
