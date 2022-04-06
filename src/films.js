// Exercise 1: Get the array of all directors.
function getAllDirectors(peliculas) {
  const directores = peliculas.map(pelicula => pelicula.director);
  return directores;
}

function mapTodasLasPelis(peliculas) {
  const pelis = peliculas.map(pelicula => pelicula);
  return pelis;
}

// Exercise 2: Get the films of a certain director
function getMoviesFromDirector(peliculas, director) {
  const peliculasDirigidas = peliculas.filter(pelicula => pelicula.director == director);
  return peliculasDirigidas;
}

// Exercise 3: Calculate the average of the films of a given director.
function moviesAverageOfDirector(peliculas, director) {
  var valorInicial = 0;
  var media = 0;
  var puntuacionMedia = getMoviesFromDirector(peliculas, director).reduce((valorAnterior, valorPosterior, indice) => {
    media = indice + 1;
    return valorAnterior + valorPosterior.score
  }, valorInicial)
  return puntuacionMedia / media
}

// Exercise 4:  Alphabetic order by title 
function orderAlphabetically(peliculas) {
  return mapTodasLasPelis(peliculas).sort((a, b) => {
    const tituloA = a.title.toUpperCase();
    const tituloB = b.title.toUpperCase();
    if (tituloA < tituloB) {
      return -1
    }
    if (tituloA > tituloB) {
      return 1
    }
    return 0;
  }).filter((pelicula, key) => { return key < 20 }).map(pelicula => pelicula.title)
}

// Exercise 5: Order by year, ascending
function orderByYear(peliculas) {
  return mapTodasLasPelis(peliculas).sort((a, b) => {
    var tituloA = a.year;
    var tituloB = b.year;
    if (a.title != undefined || b.title != undefined) {
      tituloA = a.year + a.title;
      tituloB = b.year + b.title;
    }
    if (tituloA < tituloB) {
      return -1
    }
    if (tituloA > tituloB) {
      return 1
    }
    return 0;
  })
}

// Exercise 6: Calculate the average of the movies in a category
function moviesAverageByCategory(peliculas, categoria) {
  var valorInicial = 0;
  var media = 0;
  var restar = 0;
  var puntuacionMedia = peliculas.filter(pelicula => pelicula.genre.find(genero => genero == categoria) == categoria).reduce((valorAnterior, valorPosterior, indice) => {
    if (typeof (valorPosterior.score) != 'number') { restar++ }
    media++;
    return valorAnterior + valorPosterior.score
  }, valorInicial)
  return Number.parseFloat(Number.parseFloat(puntuacionMedia / (media - restar)).toFixed(2))
}

// Exercise 7: Modify the duration of movies to minutes
function hoursToMinutes(peliculas) {
  return orderByYear(peliculas).filter(pelicula => {
    const nuevoArray = pelicula.duration.toString().split(' ');
    if (nuevoArray.length > 1)
      pelicula.duration = (Number.parseInt(nuevoArray[0]) * 60) + Number.parseInt(nuevoArray[1]);
    else
      pelicula.duration = (Number.parseInt(nuevoArray[0]) * 60);
    return pelicula
  })
}

// Exercise 8: Get the best film of a year
function bestFilmOfYear(movies, year) {
  const mejorPeli = mapTodasLasPelis(movies).filter(pelicula => pelicula.year == year).sort((a, b) => {
    const tituloA = a.score;
    const tituloB = b.score;
    if (tituloA > tituloB) {
      return -1
    }
    if (tituloA < tituloB) {
      return 1
    }
    return 0;
  }).filter((pelicula, key) => { return key == 0 })
  return mejorPeli;
}



// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    getMoviesFromDirector,
    moviesAverageOfDirector,
    orderAlphabetically,
    orderByYear,
    moviesAverageByCategory,
    hoursToMinutes,
    bestFilmOfYear,
  };
}
