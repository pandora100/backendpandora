const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3050;

app.set('json spaces', 20);

// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Routes
app.use(require('./routes/index'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
