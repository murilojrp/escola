const express = require('express');
const app = express();
app.use(express.json());
require('./routes')(app);
app.listen(3024, () => console.log('Server is running on port 3024'));