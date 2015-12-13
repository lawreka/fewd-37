// This is what the data returning from IMDB will look like:
var sampleResult = {
  "Search": [
    {
      "Title": "Cool Runnings",
      "Type": "movie",
      "Year": "1993",
      "imdbID": "tt0106611"
    }
  ]
}

// Attach an event listener to the form submit (using jQuery)
$("#movie-search-form").submit(formSubmitted);

// Handle the form submission: go to OMDB and get results
function formSubmitted(event) {
  event.preventDefault();
  if ($("#movies").has("li")){
    var movieList = document.querySelector("#movies");
    var currentMovies = document.querySelectorAll("li");
    for (var i = 0; i < currentMovies.length; i++){
      movieList.removeChild(currentMovies[i]);
    }
  }
  var url = "http://omdbapi.com/?s=" + $("#query").val();
  $.get(url, resultsReceived);
}

function resultsReceived(results) {
  var array = results["Search"];
  for (var i = 0; i < array.length; i++){
    var title = results["Search"][i]["Title"];
    var link = results["Search"][i]["imdbID"];
    var year = results["Search"][i]["Year"];
    listResult(title, link, year);
  }
  document.querySelector("#query").value = "";
}

  function listResult(title, link, year){
    var movieList = document.querySelector("#movies");
    var newMovie = document.createElement("li");
    newMovie.setAttribute("class", "movie");
    movieList.appendChild(newMovie);
    var movieTitle = document.createElement("div");
    movieTitle.setAttribute("class", "movie-title");
    newMovie.appendChild(movieTitle);
    var movieLink = document.createElement("a");
    movieLink.setAttribute("href", "https://www.imdb.com/title/" + link);
    movieLink.textContent = title;
    movieTitle.appendChild(movieLink);
    var movieYear = document.createElement("div");
    movieYear.setAttribute("class", "movie-release-date");
    movieYear.textContent = year;
    newMovie.appendChild(movieYear);
  }
