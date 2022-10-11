const express = require('express');
const apiRoutes = require('./routers/app.routers');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRoutes);

app.all('*', function(req, res){
    res.status(400).json({data: null, error: {error: -2, description: `path '${req.originalUrl}' method '${req.method}' not implemented`}});
});

const server =  app.listen(PORT, () => {
    console.log(`Server listening on port ${server.address().port}`);
});

server.on('error', error => console.log(`Server error: ${error}`));