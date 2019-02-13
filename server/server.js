const express = require('express');
const bodyParser = require('body-parser');
// end modulas require
const app = express();
const PORT = 5000;

const restaurantRouter = require('./routes/restaurant.router');

//const added ie port is server port, pool is db connection.
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('server/public'));

//this will change /restaurant in this router to just / becuse
// it puts whats used in this statment as the default.
app.use('/restaurant', restaurantRouter);

app.listen(PORT, () => {
    console.log('listening on port', PORT);
});