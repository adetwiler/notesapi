# Notes API

### Installation
- Install [Node.js]
- Install NPM Packages
  - ```npm install```
- Install MongoDB
  - **Mac** - [Install MongoDB on Mac]
  - **Windows** - [Install MongoDB on Windows]
- Start Node Server
  - **Mac** - ```sudo node server.js```
  - **Windows** - ```node server.js```
  
### API Documentation
- Create Note
  - ```POST /api/notes```
  - Example:
    - ```curl -i -H "Content-Type: application/json" -X POST -d '{"body" : "Pick up milk!"}' http://localhost/api/notes```
- Get an Existing Note
  - ```GET /api/notes/{id}```
  - Example:
    - ```curl -i -H "Content-Type: application/json" -X GET http://localhost/api/notes/55534d7345092c3ca7593c01```
- Get all of My Notes
  - ```GET /api/notes```
  - Example:
    - ```curl -i -H "Content-Type: application/json" -X GET http://localhost/api/notes```
- Delete a Note
  - ```DELETE /api/notes/{id}```
  - Example:
    - ```curl -i -H "Content-Type: application/json" -X DELETE http://localhost/api/notes/55534d7345092c3ca7593c01```
- Search Notes
  - ```GET /api/notes?query=search```
  - Example:
    - ```curl -i -H "Content-Type: application/json" -X GET http://localhost/api/notes?query=milk```
    
### Configuration
To change default settings:
- Edit config.js
  - Configure port to desired port (default 80)
  - Configure mongo uri to desired uri (default mongodb://localhost:27017)
  - Configure mongo db to desired db name (default notes)

### Questions
- How well does your note-searching-api scale or not scale? How would you make your search more efficient?
  - The note searching API uses a full-text index search, which is scalable, but does not perform as well
  as a tool made specifically for searching. MongoDB will eventually slow down when the indexes get larger,
  but elasticsearch stays pretty consistent. A query that may take MongoDB 3 seconds could take elasticsearch
  a fraction of a second, based on results benchmarks that can be found [here]

- How would you add security to your API?
  - Security could be added by adding an authentication layer. One of the most popular authentications for API
  is JWT (JSON Web Token). JWT uses the bearer authentication header and has a unique token per user. By allowing
  a user to sign up with an account, the token could be used to track who the user is, and then we could save 
  who the note belongs to, and only retrieve/update/delete that user's notes. Another layer of security
  would be to add an SSL certificate. If an SSL certificate is not used with the API, an attacker could 
  steal the user's JWT, because the requests would be unencrypted.

- What features should we add to this API next?
  - The feature that should be added next to this API next is security and authentication. This would allow users
  to be able to know which notes they have created, and have their notes protected against anyone from seeing them.
  Node has modules for authentication, and passport could be used to easily allow the user to signup/login to be able
  to access their notes. The next important feature after that, would be building a front-end, because the end-user
  is not likely to know how to use tools like CURL or Postman.

- How would you test the API?
  - The API should be tested by using a testing framework like Moca. This allows tests to be ran to ensure
  the same functionality will exist, when changing code. Each function can be tested, such as creating a note,
  deleting a note, updating a note, getting a single note, and getting a list of notes. The test suite would make sure
  that the proper response is returned as well as what might be returned. Each test run should start with an empty
  db in this case. It should first try to get a list of notes, which should return a status code of 200 with an
  empty array. Afterwards, the test suite should create a note, make sure that the status code is 201 with the body
  being a JSON object of the note that was just created. Then it should test to make sure that note can be updated
  and have a 200 response with the JSON object of the note that was updated. Getting a single note should return
  a 200 with the JSON object of that single note. It should then create another note and get the same results (201).
  Getting a list of notes should return a 200 with the two notes that were created, represented in JSON. Deleting
  a note should return a 204 with no content. Finally getting a list of notes, should only return one note with
  a status code of 200.

[Node.js]: https://nodejs.org/download/
[Install MongoDB on Mac]: http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/
[Install MongoDB on Windows]: http://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/
[here]: http://blog.quarkslab.com/mongodb-vs-elasticsearch-the-quest-of-the-holy-performances.html
