import express from 'express';
import router from './src/routes/crmRoutes.js';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import jsonwebtoken from 'jsonwebtoken';

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

// JWT Setup
app.use((req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'JWT'
  ) {
    jsonwebtoken.verify(
      req.headers.authorization.split(' ')[1],
      'RESTFULLAPIs',
      (err, decode) => {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      }
    );
  } else {
    req.user = undefined;
    next();
  }
});

// Contact CRM routes
app.use('/api/contact', router);

// AUTH CRM routes
app.use('/api/auth', router);

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
