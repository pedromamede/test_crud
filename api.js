// api.js
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios'); // Install axios using npm install axios


const router = express.Router();
router.use(bodyParser.json());

router.use(bodyParser.urlencoded({ extended: true }))

const APP_ID = process.env['APP_ID']; // Replace with your Back4App app ID
const API_KEY = process.env['API_KEY']; // Replace with your Back4App REST API key
const BASE_URL = `https://parseapi.back4app.com/classes`;

// Define your CRUD routes here
router.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/B4aVehicle`, {
      headers: {
        'X-Parse-Application-Id': APP_ID,
        'X-Parse-REST-API-Key': API_KEY
      }
    });
    res.render('index', { carros: response.data.results });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.get('/new', async (req, res) => {
  try {
    res.render('new');
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.get('/edit/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const response = await axios.get(`${BASE_URL}/B4aVehicle/${id}`, {
      headers: {
        'X-Parse-Application-Id': APP_ID,
        'X-Parse-REST-API-Key': API_KEY
      }
    });
    const carro = response.data;
    res.render('edit', { carro });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.post('/create', async (req, res) => {
  try {
    const body = req.body;
    body.price = parseFloat(body.price);
    const response = await axios.post(`${BASE_URL}/B4aVehicle`, body, {
      headers: {
        'X-Parse-Application-Id': APP_ID,
        'X-Parse-REST-API-Key': API_KEY,
        'Content-Type': 'application/json'
      }
    });

    res.redirect('/api/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao criar carro');
  }
});

router.post('/update/:id', async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  body.price = parseFloat(body.price);
  try {
    const response = await axios.put(`${BASE_URL}/B4aVehicle/${id}`, body, {
      headers: {
        'X-Parse-Application-Id': APP_ID,
        'X-Parse-REST-API-Key': API_KEY,
        'Content-Type': 'application/json'
      }
    });
    res.redirect(`/api/${id}/`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao atualizar');
  }
});

router.post('/delete', async (req, res) => {
  try {
    const response = await axios.delete(`${BASE_URL}/B4aVehicle/${req.body.id}`, {
      headers: {
        'X-Parse-Application-Id': APP_ID,
        'X-Parse-REST-API-Key': API_KEY
      }
    });
    res.redirect('/api/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao excluir');
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.get(`${BASE_URL}/B4aVehicle/${id}`, {
      headers: {
        'X-Parse-Application-Id': APP_ID,
        'X-Parse-REST-API-Key': API_KEY
      }
    });
    const carro = response.data;
    res.render('show', { carro });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router;