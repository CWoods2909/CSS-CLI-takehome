import fs from "fs";
import yargs from "yargs";
import { parseCsvFile } from "./csvParser.js";
import {
    filterByYear,
    filterByGenre,
    filterByRating,
    filterByDirector,
    filterByActor,
    filterByRuntime,
    filterByGross,
    topTenMoviesByRating,
    findHiddenGems,
    formatter
} from "./helpersFuncs.js";


import  Table  from "cli-table3";
import { parse } from "json2csv";

const argv = yargs(process.argv.slice(2))
    .option("input", {
        describe: "Input CSV file",
        demandOption: true,
    })
    .option("output-format", {
        describe: "Output format (json, csv, table)",
        default: "table",
    })
    .option("output-file", {
        describe: "Output file name",
        default: "filtered_movies"
    })
    .option("year-after", { describe: "Movies released after a specific year." })
    .option("year-before", {describe: "Movies released before a specific year."})
    .option("genre", { describe: "Movies of a specific genre." })
    .option("rating-above", {describe: "Movies with rating above a specific value."})
    .option("rating-below", {describe: "Movies with rating below a specific value."})
    .option("director", { describe: "Movies by a specific director." })
    .option("actor", { describe: "Movies starring a specific actor." })
    .option("runtime-more-than", {describe: "Movies longer than a specified runtime (in minutes)."})
    .option("runtime-less-than", {describe: "Movies shorter than a specified runtime (in minutes)."})
    .option("gross-min", {describe: "Movies with gross revenue above a specified amount."})
    .option("gross-max", {describe: "Movies with gross revenue below a specified amount."})
    .option("top-ten-rating", {describe: "Returns the top ten highest rated movies."})
    .option("find-hidden-gem", {describe: "Find movies above a specified rating and below a specified vote count."})
    .help()
    .argv;
    
async function processMovies() {
    try {
        const movies = await parseCsvFile(argv.input);
        let filteredMovies = movies;

        const filters = [
            { condition: argv.yearAfter, func: filterByYear, args: [argv.yearAfter, "after"]},
            { condition: argv.yearBefore, func: filterByYear, args: [argv.yearBefore, "before"]},
            { condition: argv.genre, func: filterByGenre, args: [argv.genre]},
            { condition: argv.ratingAbove, func: filterByRating, args: [argv.ratingAbove, "above"]},
            { condition: argv.ratingBelow, func: filterByRating, args: [argv.ratingAbove, "below"]},
            { condition: argv.director, func: filterByDirector, args: [argv.director]},
            { condition: argv.actor, func: filterByActor, args: [argv.actor] },
            { condition: argv.runtimeMoreThan, func: filterByRuntime, args: [argv.runtimeMoreThan, "more-than"] },
            { condition: argv.runtimeLessThan, func: filterByRuntime, args: [argv.runtimeLessThan, "less-than"] },
            { condition: argv.grossMin, func: filterByGross, args: [argv.grossMin, "min"] },
            { condition: argv.grossMax, func: filterByGross, args: [argv.grossMax, "max"] },
            { condition: argv.topTenRating, func: topTenMoviesByRating, args:[argv.topTen]},
            { condition: argv.findHiddenGem, func: findHiddenGems, args: [argv.ratingAbove, argv.votesBelow]}
        ];
        
        filters.forEach(filter => {
            if(filter.condition){
                filteredMovies = filter.func(filteredMovies, ...filter.args)
            }
        });

        // Sort the results by IMDB rating in descending order
        filteredMovies.sort((a, b) => b.imdb_rating - a.imdb_rating);

        // Output the results in the requested format, if none given we display as a table in terminal.
        if (argv.outputFormat === "table") {
            const table = new Table({
                head: ["Title", "Year", "Rating", "Genre", "Runtime", "Gross", "Director", "Number of Votes"],
                colWidths: [30, 10, 10, 15, 10, 20],
            });

            filteredMovies.forEach((movie) => {
                table.push([
                    movie.series_title,
                    movie.released_year,
                    movie.imdb_rating,
                    movie.genre,
                    movie.runtime,
                    movie.gross ? formatter.format(movie.gross) : "$",
                    movie.director,
                    movie.no_of_votes
                ]);
            });

            console.log(table.toString());
        } else if (argv.outputFormat === "json") {
            const jsonOutput = JSON.stringify(filteredMovies, null, 2);
            if (argv.outputFile) {
                fs.writeFileSync(argv.outputFile, jsonOutput);
                console.log(`Results saved to ${argv.outputFile}`);
            } else {
                console.log(jsonOutput);
            }
        } else if (argv.outputFormat === "csv") {
            const csvOutput = parse(filteredMovies);
            if (argv.outputFile) {
                fs.writeFileSync(argv.outputFile, csvOutput);
                console.log(`Results saved to ${argv.outputFile}`);
            } else {
                console.log(csvOutput);
            }
        }
    } catch (error) {
        console.error("Error processing movies:", error);
    }
}

processMovies();
