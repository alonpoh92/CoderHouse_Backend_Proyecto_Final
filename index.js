const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const { engine } = require('express-handlebars');
const path = require('path');
const cluster = require('cluster');
const os = require('os');

dataSource = require('./models/containers/mongo.container');
const envConfig = require('./config');
const dbConfig = require('./db/config');
const passport = require('./middlewares/passport');
const args = require('./utils/minimist.utils');
const apisRoutes = require('./routers/app.routes');

const app = express();
const PORT = args.port;
const MODE = args.mode;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.use(session({
    name: envConfig.SESSION_NAME,
    secret: envConfig.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,  
    store: MongoStore.create({
      mongoUrl: dbConfig.mongodb.connectTo('sessions')
    }),
    cookie: {
      maxAge: 600000,
    }
  }));
app.use(passport.initialize());
app.use(passport.session());

// Template engines
app.engine('hbs', engine({
    extname: 'hbs',
    layoutDefault: 'main',
    layoutsDir: path.resolve(__dirname, './public/views/layouts'),
    partialsDir: path.resolve(__dirname, './public/views/partials')
}));
app.set('views', './public/views');
app.set('view engine', 'hbs');

app.use('/', apisRoutes);

app.all('*', function(req, res){
    res.status(400).json({data: null, error: {error: -2, description: `path '${req.originalUrl}' method '${req.method}' not implemented`}});
});

const server =  app.listen(PORT, () => {
    dataSource.connect().then(() => {
        console.log(`Connected to MongoDb`);
        console.log(`Server listening on port ${server.address().port}`);
    });
});

server.on('error', error => console.log(`Server error: ${error}`));