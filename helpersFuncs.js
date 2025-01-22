
// Filter movies by year
export function filterByYear(movies, year, operator) {
    return movies.filter((movie) => {
        if (operator === "after") {
            return movie.released_year > year;
        } else if (operator === "before") {
            return movie.released_year < year;
        }
        return false;
    });
};
//Filter by genre
export function filterByGenre(movies, genre) {
    return movies.filter((movie) =>
        movie.genre.toLowerCase().includes(genre.toLowerCase())
    );
};

// Filter movies by IMDb rating
export function filterByRating(movies, rating, operator) {
    return movies.filter((movie) => {
        if (operator === "above") {
            return movie.imdb_rating > rating;
        } else if (operator === "below") {
            return movie.imdb_rating < rating;
        }
        return false;
    });
};

// Filter by director
export function filterByDirector(movies, director) {
    return movies.filter((movie) =>
        movie.director.toLowerCase().includes(director.toLowerCase())
    );
};

// Filter by actor
export function filterByActor(movies, actor) {
    return movies.filter((movie) => {
        return (
            movie.star_1.toLowerCase().includes(actor.toLowerCase()) ||
            movie.star_2.toLowerCase().includes(actor.toLowerCase()) ||
            movie.star_3.toLowerCase().includes(actor.toLowerCase()) ||
            movie.star_4.toLowerCase().includes(actor.toLowerCase())
        );
    });
};

// Filter by runtime
export function filterByRuntime(movies, runtime, operator) {
    return movies.filter((movie) => {
        if (operator === "more-than") {
            return movie.runtime > runtime;
        } else if (operator === "less-than") {
            return movie.runtime < runtime;
        }
        return false;
    });
};

// Filter by gross revenue
export function filterByGross(movies, gross, operator) {
    return movies.filter((movie) => {
        if (operator === "min") {
            return movie.gross > gross;
        } else if (operator === "max") {
            return movie.gross < gross;
        }
        return false;
    });
};

//top ten by rating
export function topTenMoviesByRating(movies){
    const sorted = movies.sort((a, b) => b.imdb_rating - a.imdb_rating):
    const highestRated = [];

    for(let i = 0; i < 10; i++){
        highestRated.push(sorted[i]);
    }
    return highestRated;
};

//hidden gems finder
export function findHiddenGems(movies, ratingMin, votesMax){
    if(typeof ratingMin !== "number" || typeof votesMax !== "number") return console.error("Please provide a rating and number of votes to find hidden gems.");
    
    const hiddenGemMovies = movies.filter(movie => {
        return movie.imdb_rating >= ratingMin && movie.no_of_votes <= votesMax
    })
    
    return hiddenGemMovies;
};

//Formatter to make gross profit look more human readable
export const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });