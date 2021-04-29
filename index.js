const BASE_URL = "https://ghibliapi.herokuapp.com/films"
const SEARCH_NAME_URL = BASE_URL + "/?by_name="
const SEARCH_GEN_URL = BASE_URL + "/search?query="
const navAll = document.getElementById("all-movies")
const movieList = document.getElementById("search-name")

const fetchAllMovies = () => {
    // send a GET request to our BASE_URL and then we need to render each brewery to the page
    fetch(BASE_URL)
    .then(response => response.json())
    .then(movies => {
      movies.forEach(movie => {
        console.log(movie)
        renderMovieList(movie)
      })
    })
  }

  const getMovies = (e) => {
    console.log(e.target.id)
    fetch(BASE_URL + "/" + e.target.id)
    .then(response => response.json())
    .then(movie => {
      console.log(movie)
      renderMoviePage(movie)
    })
  }
  