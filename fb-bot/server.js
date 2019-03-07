const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT || 8080, () => console.log('Webhook server is listening, port 5000'));

const verificationController = require('./controllers/verification');
const messageWebhookController = require('./controllers/messageWebhook');
const weatherSearchController = require('./controllers/weatherSearch');

app.get('/', verificationController);
app.post('/', messageWebhookController);
app.post('/ai', weatherSearchController);

