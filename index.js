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

const fetchAllMoviesAsync = async () => {
  let response = await fetch(BASE_URL)
  let movies = await response.json()
  movies.forEach((movie) => {
     console.log(movie)
    renderMovieListItem(movie)
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
  
  const renderMovieListItem = (movie) => {
    const { title, director, id } = movie
    const movLi = document.createElement("li")
    const movA = document.createElement("a")
    const movBtn = document.createElement("button")
    movLi.id = id
  
    movA.innerText = `${title} : ${director}`
    movBtn.innerText = "Likes: 0"
    movA.addEventListener("click", getMovie)
    movBtn.addEventListener("click", handleLikes)
  
    movLi.append(movA, movBtn)
    movList.append(movLi)
  }

const resetPage = () => {
  movList.innerHTML = ""
}


navAll.addEventListener("click", fetchAllMoviesAsync)
navSearch.addEventListener("click", showSearchForm)
searchForm.addEventListener("submit", handleSearch)