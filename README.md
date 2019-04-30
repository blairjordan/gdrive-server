# gdrive-server

This is a demo server for gdrive-json which provides basic pagination and search functionality.

The videos object is loaded into memory for this demo.

## Quickstart ##

Generate **videos.json** using https://github.com/blairjordan/gdrive-json

Install dependencies:
`npm install`

Start the service:
`npm start`

Visit http://localhost:3000/api/videos?page=1&pageSize=10&qry=
