const path = require('path');
const app = express();

// GET Route for homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, './public/index.html'))
);

// GET Route for feedback page
app.get('/feedback', (req, res) =>
    res.sendFile(path.join(__dirname, './public/pages/feedback.html'))
);

module.exports = app;