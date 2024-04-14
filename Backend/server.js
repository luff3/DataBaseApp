const app = require("./app");
const mongoose = require('mongoose');
const dotenv = require('dotenv');



const port = 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
