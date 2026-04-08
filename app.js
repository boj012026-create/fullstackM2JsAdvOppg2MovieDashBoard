const moveForm = document.getElementById("movie-form"); 
const factContainer = document.getElementById("fact-container"); 
const movieContainer = document.getElementById("movie-container"); 

console.log(`
	factContainer ${factContainer}
	movieContainer ${movieContainer}
`);

/*generated with google AI*/
/* prompt:
create me a list of 23 popular movies as an js object array,
that includes the attributes:
id, title, length, owned, rating, timesWatched
 * */
const movie = [
  { id: 1, title: "The Shawshank Redemption", length: 142, owned: true, rating: 9.3, timesWatched: 5 },
  { id: 2, title: "The Godfather", length: 175, owned: true, rating: 9.2, timesWatched: 3 },
  { id: 3, title: "The Dark Knight", length: 152, owned: false, rating: 9.0, timesWatched: 2 },
  { id: 4, title: "Pulp Fiction", length: 154, owned: true, rating: 8.9, timesWatched: 4 },
  { id: 5, title: "Inception", length: 148, owned: true, rating: 8.8, timesWatched: 6 },
  { id: 6, title: "The Matrix", length: 136, owned: true, rating: 8.7, timesWatched: 10 },
  { id: 7, title: "Goodfellas", length: 146, owned: false, rating: 8.7, timesWatched: 1 },
  { id: 8, title: "Star Wars: Episode V - The Empire Strikes Back", length: 124, owned: true, rating: 8.7, timesWatched: 8 },
  { id: 9, title: "Interstellar", length: 169, owned: true, rating: 8.6, timesWatched: 3 },
  { id: 10, title: "Parasite", length: 132, owned: false, rating: 8.5, timesWatched: 2 },
  { id: 11, title: "Avengers: Endgame", length: 181, owned: true, rating: 8.4, timesWatched: 4 },
  { id: 12, title: "The Lion King", length: 88, owned: true, rating: 8.5, timesWatched: 12 },
  { id: 13, title: "Gladiator", length: 155, owned: false, rating: 8.5, timesWatched: 3 },
  { id: 14, title: "Spirited Away", length: 125, owned: false, rating: 8.6, timesWatched: 2 },
  { id: 15, title: "The Silence of the Lambs", length: 118, owned: true, rating: 8.6, timesWatched: 1 },
  { id: 16, title: "Saving Private Ryan", length: 169, owned: true, rating: 8.6, timesWatched: 2 },
  { id: 17, title: "The Lord of the Rings: The Fellowship of the Ring", length: 178, owned: true, rating: 8.8, timesWatched: 5 },
  { id: 18, title: "The Departed", length: 151, owned: false, rating: 8.5, timesWatched: 1 },
  { id: 19, title: "Whiplash", length: 107, owned: true, rating: 8.5, timesWatched: 3 },
  { id: 20, title: "The Prestige", length: 130, owned: false, rating: 8.5, timesWatched: 2 },
  { id: 21, title: "Coco", length: 105, owned: true, rating: 8.4, timesWatched: 4 },
  { id: 22, title: "Toy Story", length: 81, owned: true, rating: 8.3, timesWatched: 7 },
  { id: 23, title: "Back to the Future", length: 116, owned: true, rating: 8.5, timesWatched: 6 }
];

console.log(movie);
