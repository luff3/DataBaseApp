const app = require("./app");
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const dbPassword = '';
const db = process.env.DATABASE.replace('<PASSWORD>', dbPassword);
mongoose.set('debug', true);
mongoose.connect(db).then(() => {
     console.log('Db connection is successful');
});
const port = 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
