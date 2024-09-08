const express = require('express');
const app = express();
const port = 3000;

// 각 식당별 카운트를 저장하는 객체
let restaurantCounts = {
    yoon: 0,
    backgate: 0,
    cupbop: 0,
    babunhwa: 0
};

app.use(express.static('public'));
app.use(express.json());

// 특정 식당의 카운트를 가져오는 요청
app.get('/count/:restaurant', (req, res) => {
    const restaurant = req.params.restaurant;
    const count = restaurantCounts[restaurant];
    res.json({ count });
});

// 특정 식당의 카운트를 업데이트하는 요청
app.post('/count/:restaurant', (req, res) => {
    const restaurant = req.params.restaurant;
    const { action } = req.body;

    if (action === 'plus') {
        restaurantCounts[restaurant]++;
    } else if (action === 'minus') {
        restaurantCounts[restaurant]--;
    }

    res.json({ count: restaurantCounts[restaurant] });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});