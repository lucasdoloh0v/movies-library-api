const express = require('express')
const app = express()

app.use(express.json())

const PORT = 3333
app.lis](PORT, () => console.log(`server is running on port ${PORT}`))