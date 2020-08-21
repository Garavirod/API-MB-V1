const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const sequelize = require('./config/db');


app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


// Acceso a la bdd remota
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Static
app.use(express.static(path.join(__dirname, 'public'))); //path/public
app.get('/*', function(req, res, next) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// API path
const users = require('./routes/userRoutes');
app.use("/users", users);


app.set('puerto', process.env.PORT || 5000);
app.listen(app.get('puerto'), () => {
    console.log('Example app listening on port ' + app.get('puerto'));
});