// path 라이브러리를 사용할때 path 파일이 필요합니다 라고 요청(require) 하는 코드
const path = require('path')

//express 를 불러온다
const express = require('express');
// app 이란 이름으로 express 객체를 할당
const app = express();
const port = 8000;
// mongoose 라이브러리를 사용하기위해 가져오는 코드
const mongoose = require('mongoose');

// 클라이언트에서 들어오는 데이터에 대해서 파싱을 하기위해서 사용되는 코드
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


// express 에서 사용할 static 으로 활용할 폴더를 선언해 주어야 한다.
app.use(express.static(path.join(__dirname, "../client/build")))
// express 객체를 할당한 app으로 서버를 열거나 | 서버 오픈
// 서버를 실행 시킬때 listen의 인자로 몇번 port로 서버를 실행 시킬지 정할 수 있다.
app.listen(port, () => {
    // 서버를 열때 몽고DB 와 연결해주기 위한 코드 / 몽고DB 와 연결하고 이후 then으로 연결이 정상적으로 됬으면 서버가 켜지고 연결이 정상적으로 되지 않았으면 catch로 err를 잡는 형식의 코드
    mongoose.connect('mongodb+srv://hyeonseok:VlRKYBMyrvNOtmvt@cluster0.exwdqlc.mongodb.net/?retryWrites=true&w=majority')
        .then(() => {
            console.log(`Example app listening at http://localhost:${port}`)
            console.log("connecting MongoDB...")
        })
        .catch((err) => {
            console.log(`${err}`)
        });

});

//test

// app으로 사용자에게 URL요청이 왔을때 응답하는 기능 | 서버의 기능
// app.get 에는 2가의 인를 받는데 '/' 는 URL 로 사용자가 접속했을때 실행되게 될 코드를 코딩할 수있다
// req는 클라이언트에서 서버측으로 보내는 요청 이다.
// res는 서버측에서 클라이언트로 보내는 응답 이다.
// res.send() 는 text 를 보내지만 res.sendFile() 같은 경우에는 경로상의 파일을 보낼 수 있다.
// 파일을 보낼때 현재 파일 경로와 상대 경로를 합쳐주는 라이브러리 path를 사용하여 파일을 내보낼 수 있다.
// server폴더의 현재경로를 나타내는 변수는 __dirname 이다.
// express 에서 사용할 static 으로 활용할 폴더를 선언해 주어야 한다.
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'))
// });

// 자바스크립트 상의 정규식에서 * 는 모든 파일을 뜻한다.
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'))
// });
// node mon 이라는 라이브러리를 사용하여 코드상의 변화가 있을때 새롭게 서버를 껏다가 켯다가 해주는 라이브러리


// 클라언트에서 요청한 post 응답을 위한 처리 코드
app.post('/api/test', (request, response) => {
    console.log(request.body)
    response.status(200).json({ success: true, test: '안녕하세요' })
})

// 서버에서 DB랑 통신하는 역할을 수행해야한다.
// 역할을 수행하기 위해서 DB와 연결을 먼저 해주어야 된다.
// 여기서 사용할 DB 는 몽고 DB 이다.

// 나중에 사용할 몽고DB의 URL
//mongodb+srv://hyeonseok:VlRKYBMyrvNOtmvt@cluster0.exwdqlc.mongodb.net/?retryWrites=true&w=majority
// 해당 몽고DB를 서버가 listen 됐을때 연결 시켜야 되는데 이 몽고DB를 좀더 효율적으로 이용하기위해 몽구스를 설치한다
// npm install mongoose --save