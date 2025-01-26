const express = require('express');
const router = express.Router();
const dataService = require('../services/dataService'); // Путь к сервису
const data = [];
let nextId = 1;

// Метод для получения объединенных данных из API
router.get('/combined', async (req, res) => {
  try {
    const combinedData = await dataService.fetchCombinedData();
    res.json(combinedData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch combined data' });
  }
});



// GET - Получить все данные
router.get('/', (req, res) => {
  res.json(data);
});

// POST - Создать новые данные
router.post('/', (req, res) => {
  const { joke, ip } = req.body;
    if (!joke || !ip) {
    return res.status(400).json({ message: 'Joke and ip required' });
  }
  const newData = {
    id: nextId++,
    joke,
    ip
  }
  data.push(newData)
  res.status(201).json(newData);
});

// GET - Получить данные по ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = data.find((u) => u.id === id);
    if (!item) {
    return res.status(404).json({ message: 'Data not found' });
  }
  res.json(item);
});

// PUT - Обновить данные по ID
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { joke, ip } = req.body;
    if (!joke || !ip) {
      return res.status(400).json({ message: 'Joke and ip required' });
    }
    const index = data.findIndex((u) => u.id === id);
    if (index === -1) {
      return res.status(404).json({ message: 'Data not found' });
    }
  data[index] = {...data[index], joke, ip}
  res.json(data[index]);
});

// DELETE - Удалить данные по ID
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = data.findIndex((u) => u.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Data not found' });
  }
  data.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
