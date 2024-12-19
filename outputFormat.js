import  Table  from "cli-table3";
import { parse } from "json2csv";
import { formatter } from "./helpersFuncs.js";
import fs from "fs";

export function tableFormat(filteredMovies){
    const table = new Table({
                    head: ["Title", "Year", "Rating", "Genre", "Runtime", "Gross", "Director", "Number of Votes", "Stars"],
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
                        movie.no_of_votes,
                        movie.star_1 + ", " + movie.star_2 + ", " + movie.star_3 + ", " + movie.star_4,
                    ]);
                });
                console.log(table.toString());
}

export function csvFormat(filteredMovies, argv){
    const csvOutput = parse(filteredMovies);
                if (argv.outputFile) {
                    fs.writeFileSync(argv.outputFile, csvOutput);
                    console.log(`Results saved to ${argv.outputFile}`);
                } else {
                    console.log(csvOutput);
                }
}   

export function jsonFormat(filteredMovies, argv){
    const jsonOutput = JSON.stringify(filteredMovies, null, 2);
                if (argv.outputFile) {
                    fs.writeFileSync(argv.outputFile, jsonOutput);
                    console.log(`Results saved to ${argv.outputFile}`);
                } else {
                    console.log(jsonOutput);
                }
}