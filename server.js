// server.js
const express = require('express');
const app = express();
const port = 3000;

let count = 0;

app.use(express.static('public'));
app.use(express.json());

// 클라이언트에서 카운트를 가져오는 요청
app.get('/count', (req, res) => {
    res.json({ count });
});

// 카운트를 업데이트하는 요청
app.post('/count', (req, res) => {
    const { action } = req.body;
    if (action === 'plus') {
        count++;
    } else if (action === 'minus') {
        count--;
    }
    res.json({ count });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
