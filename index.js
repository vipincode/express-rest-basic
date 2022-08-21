import express from 'express';
import router from './src/routes/crmRoutes.js';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app = express();

const PORT = 3000;

// Mongoose connection
const options = {
  autoIndex: false,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4,
};
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/CRMdb', options);

// Body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Contact CRM routes
app.use('/api/contact', router);

// Serving static files[img, pdf ect..]

app.use(express.static('public'));
app.use(express.static('public/images'));

// Initial route to check server is running
app.get('/', (req, res) => {
  res.send(`Great! Node and server is running! on ${PORT}`);
});

// Server is listenon port `3000`
app.listen(PORT, (req, res) => {
  console.log(`App is running on port ${PORT}`);
});
