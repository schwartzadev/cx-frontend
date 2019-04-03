# CX Frontend

This is the frontend for a card-cutting program for debate

Run it using `npm start`. See the notes below for a non-exhaustive list of known issues / future improvements.

## TODOs

### App.js
- [ ] todo add a faint "enter some urls in the box above" if there are no cards

### Card.js
- [ ] configure custom attributions
- [ ] use only the last name from Mercury for the author field (also decide on how to handle the first name)
- [ ] handle articles with no date
- [ ] handle 404s
- [ ] prevent new lines in the ContentEditable fields

## Notes 4-2-19

This program now works as a prototype but still has a number of major (and minor) quirks
The biggest issue is that the program currently needs three servers to run: one from this repository, one for the Mercury parser (repo [here](https://github.com/schwartzadev/mercury-parser-express)), and one for the backend to Word files (repo [here](https://github.com/schwartzadev/cardify-2.0), see the api-only branch).


