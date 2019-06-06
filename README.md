# CX Frontend

This is the frontend for a card-cutting program for debate

## Usage
This system currently uses three different servers.
1. This one. Run it using `yarn start` in the root directory of this repository.
2. The [Mercury Parser](https://github.com/schwartzadev/mercury-parser-express) (currently running on port 5555).
3. The card cutting backend (on port 8888)

## TODOs

### App.js
- [x] todo add a faint "enter some urls in the box above" if there are no cards

### Card.js
- [ ] configure custom attributions
- [ ] use only the last name from Mercury for the author field (also decide on how to handle the first name)
- [ ] handle articles with no date
- [ ] handle 404s
- [ ] prevent new lines in the ContentEditable fields

## Notes 4-16-19
The three servers is likely here to stay since otherwise, accessing the Mercury API would happen through the frontend, which would be blocked because of Cross Origin Requests.

## Notes 4-2-19

This program now works as a prototype but still has a number of major (and minor) quirks
The biggest issue is that the program currently needs three servers to run: one from this repository, one for the Mercury parser (repo [here](https://github.com/schwartzadev/mercury-parser-express)), and one for the backend to Word files (repo [here](https://github.com/schwartzadev/cardify-2.0), see the api-only branch).


