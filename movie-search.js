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
  var url = "http://omdbapi.com/?s=" + $("#query").val();
  $.get(url, resultsReceived);
}

function resultsReceived(results) {
  var array = results["Search"];
  for (var i = 0; i < array.length; i++){
    var title = results["Search"][i]["Title"];
    var year = results["Search"][i]["Year"];
    listResult(title, year);
  }
  document.querySelector("#query").value = "";
}

  function listResult(title, year){
    var movieList = document.querySelector("#movies");
    var newMovie = document.createElement("li");
    newMovie.setAttribute("class", "movie");
    movieList.appendChild(newMovie);
    var movieTitle = document.createElement("div");
    movieTitle.setAttribute("class", "movie-title");
    movieTitle.textContent = title;
    newMovie.appendChild(movieTitle);
    var movieYear = document.createElement("div");
    movieYear.setAttribute("class", "movie-release-date");
    movieYear.textContent = year;
    newMovie.appendChild(movieYear);
  }

  function clearList(results){
    var array = results["Search"];
    for (var i = 0; i < array.length; i++){
      var title = results["Search"][i]["Title"];
      var year = results["Search"][i]["Year"];
      clearResult(title, year);
    }
  }

  function clearResult(title, year){
    var movieList = document.querySelector("#movies");
    var newMovie = document.createElement("li");
    newMovie.setAttribute("class", "movie");
    movieList.removeChild(newMovie);
    var movieTitle = document.createElement("div");
    movieTitle.setAttribute("class", "movie-title");
    movieTitle.textContent = title;
    newMovie.appendChild(movieTitle);
    var movieYear = document.createElement("div");
    movieYear.setAttribute("class", "movie-release-date");
    movieYear.textContent = year;
    newMovie.removeChild(movieYear);
  }
