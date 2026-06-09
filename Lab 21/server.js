const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname)));

app.post('/calculate-square', (req, res) => {
    const { number } = req.body;

    if (number === undefined || isNaN(parseFloat(number))) {
        return res.status(400).json({ error: 'Некоректне число' });
    }
    
    const num = parseFloat(number);
    const square = num * num;
    
    res.json({ square: square });
});

app.listen(PORT, () => {
    console.log(`Сервер запущено на http://localhost:${PORT}`);
});