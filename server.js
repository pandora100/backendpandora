
//server.js
const express = require("express");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");
const PORT = process.env.PORT || 5000;

app.set('json spaces', 40);
//middleware

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
//routes
app.use("/authentication", require("./routes/jwtAuth"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/", require("./routes/dashboardoriginal"));

app.listen(PORT, () => console.log(`Server para demo running on port ${PORT}`));