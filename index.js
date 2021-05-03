const BASE_URL = "https://ghibliapi.herokuapp.com/films"
const SEARCH_FILM_URL = BASE_URL + "/?by_film="
const SEARCH_DIRECTOR_URL = BASE_URL + "/?by_director="
const SEARCH_GEN_URL = BASE_URL + "/search?query="
const navAll = document.getElementById("movies-all")
const navSearch = document.getElementById("search-name")
const movList = document.getElementById("movie-list")
const searchForm = document.getElementById("search-form-name")


const fetchAllMovies = async () => {
  fetch(BASE_URL)
    .then((response) => response.json())
    .then((movies) => {
      movies.forEach((movie) => {
         console.log(movie)
        renderMovieListItem(movie)
      })
    })
}

const getmovie = (e) => {
  console.log(e.target.parentElement.id)
  fetch(BASE_URL + "/" + e.target.parentElement.id)
    .then((response) => response.json())
    .then((movie) => {
       console.log(movie)
      renderMoviePage(movie)
    })
}

const handleLikes = (e) => {
  let numLikes = Number(e.target.innerText.slice(7))
  numLikes++
  e.target.innerText = "Likes: " + numLikes
}

const showSearchForm = (e) => {
  searchForm.hidden = !searchForm.hidden
}

const handleSearch = (e) => {
  e.preventDefault()
  resetPage()
  const term = e.target.querySelector('input[name="search-name"]').value

  fetch(SEARCH_NAME_URL + term)
    .then((response) => response.json())
    .then((results) => {
      results.forEach((movie) => {
        renderMovieListItem(movie)
      })
      e.target[0].value = ""
      searchForm.hidden = true
    })
}

const renderMoviePage = (movie) => {
  resetPage()
  const { id, title, director, description } = movie

  const movDiv = document.createElement("div")
  movDiv.innerHTML = `
    <h1>${title}</h1>
    <h2>${director}</h2>
    <h3>${description}</h3>
  `
}

const assignLikeButtons = () => {
    const likeButtons = document.querySelectorAll("li button")
    likeButtons.forEach((button) => {
      button.addEventListener("click", handleLikes)
    })
  }
  
  const assignLink = () => {
    const movLinks = document.querySelectorAll("li a")
    movLinks.forEach((links) => {
      links.addEventListener("click", getMovie)
    })
  }

const resetPage = () => {
  movList.innerHTML = ""
}


movList.addEventListener("click", fetchAllMovies)
navSearch.addEventListener("click", showSearchForm)
searchForm.addEventListener("submit", handleSearch)