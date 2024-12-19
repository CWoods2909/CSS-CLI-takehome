import fs from "fs";
import csv from "csv-parser";

export function parseCsvFile(filePath) {
    return new Promise((resolve, reject) => {
        const movies = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (row) => {
                try {
                    row.released_year = parseInt(row.released_year);
                    row.runtime = parseInt(row.runtime.replace(" min", "").trim());
                    row.imdb_rating = parseFloat(row.imdb_rating);
                    row.meta_score = parseInt(row.meta_score);
                    row.gross = parseInt(row.gross.replace(/,/g, "").trim());
                    // row.no_of_votes = parseInt(row.no_of_votes.replace(/,/g, ''), 10);

                    movies.push(row);
                } catch (error) {
                    reject(`Error parsing row: ${error.message}`);
                }
            })
            .on("end", () => resolve(movies))
            .on("error", (err) =>
                reject(`Error reading the CSV file: ${err.message}`)
            );
    });
}
