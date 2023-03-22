const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { engine } = require('express-handlebars');
const path = require('path');
const cluster = require('cluster');
const os = require('os');

const passport = require('./src/business/middlewares/passport.middleware');
const args = require('./utils/minimist.utils');
const routeLogger = require('./src/business/middlewares/route_logger.middleware');
const env = require('./env.config');
const dbConfig = require('./src/persistence/db/db.config');
const apisRoutes = require('./src/router/routers/app.router');
const { Server: HttpServer } = require('http');
const ChatController = require('./src/controllers/sockets/chat.controller');
const DBContainer = require('./src/persistence/models/containers/app.container');
const logger = require('./utils/logger.utils');

const PORT = args.port;
const MODE = args.mode;

const app = express();
const httpServer = new HttpServer(app);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/router/public'));
app.use(session({
    name: env.COOKIE_NAME,
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,  
    store: MongoStore.create({
        mongoUrl: dbConfig.mongodb.connectTo(env.SESSION_DATABASE)
    }),
    cookie: {
        maxAge: Number(env.SESSION_TIME_EXP),
    }
}));
app.use(passport.initialize());
app.use(passport.session());

// Template engines
app.engine('hbs', engine({
    extname: 'hbs',
    layoutDefault: 'main',
    layoutsDir: path.resolve(__dirname, './src/router/public/views/layouts'),
    partialsDir: path.resolve(__dirname, './src/router/public/views/partials')
}));
  
app.set('views', './src/router/public/views');
app.set('view engine', 'hbs');

// Routes
app.use('/', routeLogger(true), apisRoutes);
app.use('*', routeLogger(false), (req, res) => {
  res.send(`Route ${req.baseUrl} not working`)
});

// Init server
if(cluster.isPrimary && MODE === "CLUSTER"){
    for(let i=0; i<os.cpus().length; i++){
        cluster.fork();
    }
}else{
    const server = httpServer.listen(PORT, async () => {
        DBContainer.connect()
        .then(() => {
                new ChatController(httpServer).start();
                logger.info(`Connected to ${env.PERSISTENCE} DB!`);
                logger.info(`Server is up and running on port: ${PORT} pid: ${process.pid}`);
            });
    });
}