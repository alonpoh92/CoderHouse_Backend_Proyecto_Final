const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { engine } = require('express-handlebars');
const path = require('path');
const cluster = require('cluster');
const os = require('os');

const dataSource = require('./models/containers/mongo.container');
const envConfig = require('./config');
const dbConfig = require('./db/config');
const passport = require('./middlewares/passport');
const args = require('./utils/minimist.utils');
const apisRoutes = require('./routers/app.routes');
const logger = require('./utils/logger.utils');

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

if(cluster.isPrimary && MODE === "CLUSTER"){
  for(let i=0; i<os.cpus().length; i++){
    cluster.fork();
  }
}else{
  const server =  app.listen(PORT, () => {
      dataSource.connect().then(() => {
          logger.trace(`Connected to MongoDb`);
          logger.trace(`Server listening on port ${server.address().port}`);
      });
  });
  server.on('error', error => logger.debug(`Server error: ${error}`));
}
