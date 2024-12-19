## To download this project
- Git clone
- Don't forget to npm install before running anything

## Downloaded tools and libraries
- Csv-parser: *To parse the CSV file* [Docs](https://www.npmjs.com/package/csv-parser)
- yargs: *Parses command line arguments* [Docs](https://yargs.js.org/)
- json2csv: *Exports filtered data as a CSV* [Docs](https://github.com/juanjoDiaz/json2csv)
- cli-table3: *Displays results in a nice table format* [Docs](https://github.com/cli-table/cli-table3)
- fs: *Handles file input/output* 

## Main functionality
There are three files that make up the CLI program. The CSV parser itself which parses the file and puts all the data into an
array of objects. Our helper file is where we will find the filtering functions, and movieQueries is the bulk of our application.
This is where it processes our requests made in the command line. Argv was really handy to use here, made accessing the information provided by the user really easy to grab and work with. Once we have our input and its stored on our argv object we loop through our filters. This was originally a long list of conditionals but found a cleaner more DRY way of doing it after a refactor. This made my code much easier to modify and add more functions if I needed to. Filters holds the conditions, corresponding function and arguments. Filters is an array of objects. We loop over the array and check if that condition is present, if it is then we pass the filtered movies, and spread the rest of the necessary arguments. Once we make it through we sort the data by IMDB rating from greatest to least. Finally, we check what the output format and file is. If none are provided we use the defaults.

## Handy Commands
To get a full list of commands `node movieQueries.js .help`

## Helpful tips
To make a successful query you will need a few things, always start with `node` followed by the name of our main file `movieQueries.js`.
Everything after these two lines needs to start with two dashes *--* followed by what were querying for.
An example might be `node movieQueries.js --input movies_data.csv --rating-above 8 --output-format json --output-file high_rating.json`
Since we specified a format type and output file it will not print in the terminal, instead, the data will be saved to a JSON file. 

