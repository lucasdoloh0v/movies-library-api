require("express-async-errors");
const express = require("express");
const { errorHandling } = require("./utils/errorHandling");

const routes = require("./routes");

const app = express();
app.use(express.json());
app.use(routes);

app.use(errorHandling);

const PORT = 3333;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
