const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3001;

app.use(bodyParser.json());

let flowers = [
        {
            id: "1",
            name: "Rose",
            color: "Red",
            sunlight: "Full Sun",
            watering: "Regular",
        },
        {
            id: "2",
            name: "Tulip",
            color: "Various",
            sunlight: "Partial Sun",
            watering: "Moderate",
        },
        {
            id: "3",
            name: "Orchid",
            color: "Various",
            sunlight: "Indirect Sunlight",
            watering: "Weekly",
        },
        {
            id: "4",
            name: "Sunflower",
            color: "Yellow",
            sunlight: "Full Sun",
            watering: "Regular",
        },
        {
            id: "5",
            name: "Lily",
            color: "Various",
            sunlight: "Partial Sun",
            watering: "Regular",
        },
        {
            id: "6",
            name: "Daisy",
            color: "White",
            sunlight: "Full Sun",
            watering: "Regular",
        },
        {
            id: "7",
            name: "Lavender",
            color: "Purple",
            sunlight: "Full Sun",
            watering: "Low",
        },
        {
            id: "8",
            name: "Cherry Blossom",
            color: "Pink",
            sunlight: "Partial Sun",
            watering: "Regular",
        },
        {
            id: "9",
            name: "Peony",
            color: "Pink",
            sunlight: "Partial Sun",
            watering: "Regular",
        },
        {
            id: "10",
            name: "Daffodil",
            color: "Yellow",
            sunlight: "Full Sun",
            watering: "Regular",
        }
    ]
    


// Get a specific flower by ID
app.get('/api/flowers/:id', (req, res) => {
    const flower = flowers.find(f => f.id === req.params.id);
    if (!flower) {
        return res.status(404).json({ error: 'Flower not found' });
    }
    res.json(flower);
});

// Get all flowers
app.get('/api/flowers', (req, res) => {
    res.json(flowers);
});

// Create a new flower
app.post('/api/flowers', (req, res) => {
    const { name, color, sunlight, watering, gardener_id } = req.body;
    if (!name || !color || !sunlight || !watering || !gardener_id) {
        return res.status(400).json({ error: 'Name, color, sunlight, watering, and gardener ID are required' });
    }

    const newFlower = { id: uuidv4(), name, color, sunlight, watering, gardener_id };
    flowers.push(newFlower);

    res.status(201).json(newFlower);
});

// Update an existing flower
app.put('/api/flowers/:id', (req, res) => {
    const { name, color, sunlight, watering, gardener_id } = req.body;
    const flowerIndex = flowers.findIndex(f => f.id === req.params.id);
    if (flowerIndex === -1) {
        return res.status(404).json({ error: 'Flower not found' });
    }
    flowers[flowerIndex] = { ...flowers[flowerIndex], name, color, sunlight, watering, gardener_id };
    res.json(flowers[flowerIndex]);
});

// Delete a flower
app.delete('/api/flowers/:id', (req, res) => {
    const flowerIndex = flowers.findIndex(f => f.id === req.params.id);
    if (flowerIndex === -1) {
        return res.status(404).json({ error: 'Flower not found' });
    }
    flowers.splice(flowerIndex, 1);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
