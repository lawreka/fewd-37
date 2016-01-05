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
    // var movieList = $("#movies");
    var currentMovies = document.querySelectorAll("li");
    // var currentMovies = $("li");
    for (var i = 0; i < currentMovies.length; i++){
      movieList.removeChild(currentMovies[i]);
      // movieList.remove(currentMovies[i]);
    }
  }
  // $("#movies").empty();
  var url = "http://omdbapi.com/?s=" + $("#query").val();
  for (p = 1; p < 100; p++){
      $.get(url + "&page=" + p, resultsReceived);
  }

}

function resultsReceived(results) {
  var array = results["Search"];
  for (var i = 0; i < array.length; i++){
    var title = results["Search"][i]["Title"];
    var link = results["Search"][i]["imdbID"];
    var year = results["Search"][i]["Year"];
    var poster = results["Search"][i]["Poster"];
    listResult(poster, title, link, year);
  }
  document.querySelector("#query").value = "";

}

  function listResult(poster, title, link, year){
    // var movieList = document.querySelector("#movies");
    // var newMovie = document.createElement("li");
    // newMovie.setAttribute("class", "movie");
    // movieList.appendChild(newMovie);
    // var newPoster = document.createElement("img");
    // newPoster.setAttribute("src", poster);
    // newMovie.appendChild(newPoster);
    // var movieTitle = document.createElement("div");
    // movieTitle.setAttribute("class", "movie-title");
    // newMovie.appendChild(movieTitle);
    // var movieLink = document.createElement("a");
    // movieLink.setAttribute("href", "https://www.imdb.com/title/" + link);
    // movieLink.textContent = title;
    // movieTitle.appendChild(movieLink);
    // var movieYear = document.createElement("div");
    // movieYear.setAttribute("class", "movie-release-date");
    // movieYear.textContent = year;
    // newMovie.appendChild(movieYear);

    var movieList = $("#movies");
    var newMovie = $("<li>").addClass("movie");
    movieList.append(newMovie);
    var newPoster = $("<img>").attr("src", poster);
    newMovie.append(newPoster);
    var movieTitle = $("<div>").addClass("movie-title");
    newMovie.append(movieTitle);
    var movieLink = $("<a>").attr("href", "https://imdb.com/title/" + link).text(title);
    movieTitle.append(movieLink);
    var movieYear = $("<div>").addClass("movie-release-date").text(year);
    newMovie.append(movieYear);
  }
