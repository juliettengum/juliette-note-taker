# juliette-note-taker
## Description
Note Taker is a simple web application built with Express.js that allows users to write and save notes. It provides a user-friendly interface for organizing thoughts and keeping track of tasks.

## User Story

As a small business owner, I want to be able to write and save notes so that I can organize my thoughts and keep track of tasks I need to complete.

## Acceptance Criteria

- When I open the Note Taker, I am presented with a landing page with a link to a notes page.
- When I click on the link to the notes page, I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column.
- When I enter a new note title and the note’s text, a "Save Note" button and a "Clear Form" button appear in the navigation at the top of the page.
- When I click on the Save button, the new note I have entered is saved and appears in the left-hand column with the other existing notes and the buttons in the navigation disappear.
- When I click on an existing note in the list in the left-hand column, that note appears in the right-hand column and a "New Note" button appears in the navigation.
- When I click on the "New Note" button in the navigation at the top of the page, I am presented with empty fields to enter a new note title and the note’s text in the right-hand column and the button disappears.

## Installation

Clone this repository.
Install dependencies by running npm install.
Run the application by executing npm start.
Navigate to http://localhost:3001 in your web browser to view the application.

## Functionality Overview

The application utilizes db.json file on the back end to store and retrieve notes using the fs module.
HTML routes:
GET /notes returns the notes.html file.
GET * returns the index.html file.
API routes:
GET /api/notes reads the db.json file and returns all saved notes as JSON.
POST /api/notes receives a new note to save on the request body, adds it to the db.json file, and returns the new note to the client.


## Technologies Used

Express.js
HTML
CSS
JavaScript


## Screenshot
<img width="966" alt="Screenshot 2024-05-15 221155" src="https://github.com/juliettengum/juliette-note-taker/assets/160192167/686ac0b8-a57d-4e1a-8281-6ffe233813cf">




## Video

https://github.com/juliettengum/juliette-note-taker/assets/160192167/dc1883fc-0b9c-4779-b5a5-41b8840527cf





## Contributors

my course instructor Mr Christopher and my humble self Juliette Ngum

## License

This project is licensed under the MIT License.

