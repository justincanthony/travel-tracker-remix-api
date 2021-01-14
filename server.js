const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3001;
const app = express();
const travelers = require('./data/travelers');
const trips = require('./data/trips');
const destinations = require('./data/destinations');

app.locals = {
  title: 'Travel Tracker API',
  travelers,
  trips,
  destinations
}

app.use(cors());
app.use(express.json());

const isValidDate = dateString => {
  var regEx = /^\d{4}[\/](0?[1-9]|1[012])[\/](0?[1-9]|[12][0-9]|3[01])$/;
  return regEx.test(dateString);
}

app.get('/api/v1/travelers', (req, res) => {
  const { travelers } = app.locals;
  res.status(200).json({ travelers });
});

app.get('/api/v1/travelers/:id', (req, res) => {
  const { id } = req.params;
  const { travelers } = app.locals;

  let requestedTraveler = travelers.find(traveler => traveler.id == id);

  if (!requestedTraveler) {
    return res.status(404).json({
      message: `No traveler found with an id of ${id}`
    });
  }

  res.status(200).json(requestedTraveler);
});

app.get('/api/v1/trips', (req, res) => {
  const { trips } = app.locals;
  res.status(200).json({ trips });
});

app.get('/api/v1/destinations', (req, res) => {
  const { destinations } = app.locals;
  res.status(200).json({ destinations });
});

app.post('/api/v1/trips', (req, res) => {
  const {
    id,
    userID,
    destinationID,
    travelers,
    date,
    duration,
    status,
    suggestedActivities } = req.body;

  const requiredProperties = ['id', 'userID', 'destinationID', 'travelers', 'date', 'duration', 'status', 'suggestedActivities']

  for (let requiredParameter of requiredProperties) {
    if (req.body[requiredParameter] === undefined) {
      return res.status(422).json({
        message: `You are missing a required parameter of ${requiredParameter}`
      });
    }
  }

  // Check for valid date
  if (!isValidDate(date)) {
    return res.status(422).json({
      message: `Invalid date format submitted`
    })
  }

  // Check if id already exists
  const existingTrip = app.locals.trips.find(trip => trip.id === id);

  if (existingTrip) {
    return res.status(422).json({ message: `Trip with an id of ${id} already exists.` });
  }

  const existingDestination = app.locals.destinations.find(destination => destination.id === destinationID);

  if (!existingDestination) {
    return res.status(404).json({ message: `Destination with id ${destinationID} doesn't exist.` })
  }

  app.locals.trips.push({ id, userID, destinationID, travelers, date, duration, status, suggestedActivities });
  res.status(201).json({
    message: `Trip with id ${id} successfully posted`,
    newTrip: {
      id,
      userID,
      destinationID,
      travelers,
      date,
      duration,
      status,
      suggestedActivities
    }
  });
});

app.post('/api/v1/destinations', (req, res) => {
  const {
    id,
    destination,
    estimatedLodgingCostPerDay,
    estimatedFlightCostPerPerson,
    image,
    alt
  } = req.body;

  const requiredProperties = ['id', 'destination', 'estimatedLodgingCostPerDay', 'estimatedFlightCostPerPerson', 'image', 'alt'];

  for (let requiredParameter of requiredProperties) {
    if (req.body[requiredParameter] === undefined) {
      return res.status(422).json({
        message: `You are missing a required parameter of ${requiredParameter}`
      });
    }
  }

  const existingDestination = app.locals.destinations.find(destination => destination.id === id);

  if (existingDestination) {
    return res.status(422).json({ message: `Destination with id ${id} already exists.` })
  }

  app.locals.destinations.push({ id, destination, estimatedLodgingCostPerDay, estimatedFlightCostPerPerson, image, alt });
  res.status(201).json({
    message: `Destination with id ${id} successfully posted`,
    newDestination: {
      id,
      destination,
      estimatedLodgingCostPerDay,
      estimatedFlightCostPerPerson,
      image,
      alt
    }
  });
});

app.post('/api/v1/updateTrip', (req, res) => {
  const { id, status, suggestedActivities } = req.body;

  if (!id) {
    res.status(422).json({ message: 'You are missing a required parameter of id.' });
  }

  let foundTrip = app.locals.trips.find(trip => trip.id === id);

  if (!foundTrip) {
    return res.status(404).json({ message: `No trip with id ${id} found.` })
  }

  if (status && ['pending', 'approved'].includes(status)) {
    foundTrip.status = status;
  } else if (status && !['pending', 'approved'].includes(status)) {
      return res.status(422).json({ message: 'status must either be pending or approved.' });
  }

  if (suggestedActivities && Array.isArray(suggestedActivities)) {
    foundTrip.suggestedActivities = [...foundTrip.suggestedActivities, ...suggestedActivities];
  } else if (suggestedActivities && !Array.isArray(suggestedActivities)) {
    return res.status(422).json({ message: "suggestedActivities must be an array." })
  }

  return res.status(200).json({
    message: `Trip #${id} has been modified`,
    updatedTrip: foundTrip
  });
});

app.delete('/api/v1/trips/:id', (req, res) => {
  let { id } = req.params;
  const { trips } = app.locals;

  const tripToDelete = trips.find(trip => trip.id === parseInt(id));

  if (!tripToDelete) {
    return res.status(404).json({
      message: `No found trip with id of #${id}.`
    })
  }

  app.locals.trips = trips.filter(trip => trip.id !== parseInt(id));

  res.status(200).json({
    message: `Trip #${id} has been deleted`
  })
})

app.listen(port, () => {
  console.log(`${app.locals.title} is now running on http://localhost:${port} !`)
});