const express = require('express');
const envConfig = require('./config');
const apiRoutes = require('./routers/app.routers');

const app = express();
const PORT = process.env.PORT || 8080;

const DATASOURCE_BY_ENV = {
    memory: require('./models/containers/memory.container'),
    file: require('./models/containers/file.container'),
    mongo: require('./models/containers/mongo.container'),
    firebase: require('./models/containers/firebase.container')
}

const dataSource = DATASOURCE_BY_ENV[envConfig.DATASOURCE];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRoutes);

app.all('*', function(req, res){
    res.status(400).json({data: null, error: {error: -2, description: `path '${req.originalUrl}' method '${req.method}' not implemented`}});
});

const server =  app.listen(PORT, () => {
    dataSource.connect(envConfig.DATASOURCE).then(() => {
        console.log(`Connected to ${envConfig.DATASOURCE}`);
        console.log(`Server listening on port ${server.address().port}`);
    });
});

server.on('error', error => console.log(`Server error: ${error}`));