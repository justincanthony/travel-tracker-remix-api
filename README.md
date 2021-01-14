# travel-tracker-api

This repo was created to be used with the travel-tracker project.

## Set Up

Clone this down, and `cd` into it.  Then run:

`npm install`

`npm start`

## Endpoints

| Description | URL | Method | Required Properties for Request | Sample Successful Response |
|----------|-----|--------|---------------------|-----------------|
| Get all travelers|`http://localhost:3001/api/v1/travelers`| GET  | none | object with `travelers` property containing an array of all travelers |
|Get single traveler|`http://localhost:3001/api/v1/travelers/<id>`     *where`<id>` will be a number of a traveler's id* | GET  | none | object of single traveler's info |
|Get all trips| `http://localhost:3001/api/v1/trips` | GET | none | object with `trips` property containing an array of all trips |
|Get all destinations| `http://localhost:3001/api/v1/destinations` | GET | none | object with `destinations` property containing an array of all destinations |
| Add new trip |`http://localhost:3001/api/v1/trips`| POST | `{id: <number>, userID: <number>, destinationID: <number>, travelers: <number>, date: <string 'YYYY/MM/DD'>, duration: <number>, status: <string 'approved' or 'pending'>, suggestedActivities: <array of strings>}` | `{message: 'Trip with id <id> successfully posted', newTrip: <Object with trip info just posted>}`|
| Add new destination|`http://localhost:3001/api/v1/destinations`| POST | `{id: <number>, destination: <string>, estimatedLodgingCostPerDay: <number>, estimatedFlightCostPerPerson: <number>, image: <string>, alt: <string>}` | `{message: 'Destination with id <id> successfully posted', newDestination: <Object with destination info just posted>}`|
| Modify single trip | `http://localhost:3001/api/v1/updateTrip` | POST | `{id: <number>, status:<String of 'approved' or 'pending', suggestedActivities: <Array of strings>}` *Only a status* **or** *a suggestedActivities property is required for a successful request*| `{message: 'Trip #<id> has been modified', updatedTrip: <Object with newly updated data>}`|
| Delete single trip| `http://localhost:3001/api/v1/trips/<id>`     *where`<id>` will be a number of a trip's id*  | DELETE | none | Trip #<id> has been deleted |