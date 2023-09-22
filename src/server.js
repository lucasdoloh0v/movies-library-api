require('express-async-errors');
const express = require('express');
const cors = require('cors');

const { errorHandling } = require('./utils/errorHandling');
const { UPLOAD_FOLDER } = require('./configs/upload');

const routes = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/files', express.static(UPLOAD_FOLDER));

app.use(errorHandling);

const PORT = 3333;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
