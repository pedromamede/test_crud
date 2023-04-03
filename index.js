// api.js
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios'); // Install axios using npm install axios

const router = express.Router();
router.use(bodyParser.json());

const APP_ID = 'pjTrN0BQjsh2rVzT1ZW3823mldbmaCcgj2AlpFw6'; // Replace with your Back4App app ID
const API_KEY = '6xz9h8RCmNIkk2jJMAnf7A4CEihfJglsQ6hAIFuq'; // Replace with your Back4App REST API key
const BASE_URL = `https://parseapi.back4app.com/classes`;

// Define your CRUD routes here
router.get('/xxx', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/B4aVehicle`, {
      headers: {
        'X-Parse-Application-Id': APP_ID,
        'X-Parse-REST-API-Key': API_KEY
      }
    });
    res.json(response.data.results);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.post('/xxx', async (req, res) => {
  try {
    const response = await axios.post(`${BASE_URL}/Item`, req.body, {
      headers: {
        'X-Parse-Application-Id': APP_ID,
        'X-Parse-REST-API-Key': API_KEY,
        'Content-Type': 'application/json'
      }
    });
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.put('/xxx/:id', async (req, res) => {
  try {
    const response = await axios.put(`${BASE_URL}/Item/${req.params.id}`, req.body, {
      headers: {
        'X-Parse-Application-Id': APP_ID,
        'X-Parse-REST-API-Key': API_KEY,
        'Content-Type': 'application/json'
      }
    });
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.delete('/xxx/:id', async (req, res) => {
  try {
    const response = await axios.delete(`${BASE_URL}/Item/${req.params.id}`, {
      headers: {
        'X-Parse-Application-Id': APP_ID,
        'X-Parse-REST-API-Key': API_KEY
      }
    });
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router;