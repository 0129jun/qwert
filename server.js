const express = require('express');
const app = express();
const port = 3000;

// 각 식당별 좌석 상태를 저장하는 객체
let restaurantSeats = {
    yoon: Array(10).fill(false), // 10개의 좌석을 false로 초기화 (false: 빈자리, true: 차 있는 자리)
    backgate: Array(10).fill(false),
    cupbop: Array(10).fill(false),
    babunhwa: Array(10).fill(false),
};

app.use(express.static('public'));
app.use(express.json());

// 특정 식당의 좌석 상태를 가져오는 요청
app.get('/seats/:restaurant', (req, res) => {
    const restaurant = req.params.restaurant;
    const seats = restaurantSeats[restaurant];
    res.json({ seats });
});

// 특정 식당의 좌석 상태를 업데이트하는 요청
app.post('/seats/:restaurant', (req, res) => {
    const restaurant = req.params.restaurant;
    const { index, status } = req.body;

    restaurantSeats[restaurant][index] = status; // 좌석 상태 업데이트
    res.json({ seats: restaurantSeats[restaurant] });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
