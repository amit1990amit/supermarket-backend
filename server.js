const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express()
const session = require('express-session');
const cookieParser = require('cookie-parser');

const authRouter = require('./api/auth/auth.routes')
const itemsRouter = require('./api/items/items.routes');
const listsRouter = require('./api/lists/lists.routes');
const usersRouter = require('./api/users/users.routes');

app.use(cookieParser())
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}))

const http = require('http').createServer(app);

if (process.env.NODE_ENV !== 'production') {
    const corsOptions = {
        origin: ['http://localhost:8080',
            'http://127.0.0.1:8080'
        ],
        credentials: true
    };
    app.use(cors(corsOptions));
}

app.use("/api/items",itemsRouter);
app.use("/api/lists",listsRouter);
app.use("/api/users", usersRouter);
app.use('/api/auth', authRouter);
app.use(express.static('public'));


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
}

// const port = process.env.PORT || 3000;
// http.listen(port, () => {
//     console.log('Server is running on port: ' + port)
// });


const logger = require('./services/logger.service')
const port = process.env.PORT || 3000;
http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
});