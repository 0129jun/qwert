const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = 3000;

// 각 식당별 카운트를 저장하는 객체
let restaurantCounts = {
    yoon: 0,
    backgate: 0,
    cupbop: 0,
    babunhwa: 0
};

// 좌석 상태를 저장하는 배열 (윤식당 좌석 10개)
let seats = Array(10).fill(false); // false는 빈 자리, true는 사람이 앉아있는 자리

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

// 클라이언트가 접속했을 때 현재 좌석 상태 전송
io.on('connection', (socket) => {
    console.log('클라이언트 접속');
    
    // 접속한 클라이언트에게 현재 좌석 상태 전송
    socket.emit('seatsState', seats);
    
    // 클라이언트가 좌석 상태 변경 시
    socket.on('toggleSeat', (index) => {
        seats[index] = !seats[index];
        
        // 변경된 좌석 상태를 모든 클라이언트에 전송
        io.emit('seatsState', seats);
    });

    socket.on('disconnect', () => {
        console.log('클라이언트 연결 해제');
    });
});

// 서버 시작
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
