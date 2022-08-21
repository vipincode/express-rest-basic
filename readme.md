### Install packages To setup Project

- npm install express nodemon body-parser

- npm install mongodb mongoose

### App use ES6 syntax so ltes install babel

- npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/node

- Now after installation create `.babelrc` file add bellow code

```
{
  "presets": ["@babel/preset-env"]
}
```

- afet that add inside `package.json` type

```
  "type": "module",
```

- create index file and these lines of code

```
import express from 'express';

const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Great! app is running!');
});

app.listen(PORT, (req, res) => {
  console.log(`App is running in port ${PORT}`);
});
```

### Run application

- must add these scrinpt in json

```
 "scripts": {
   "start": "nodemon --experimental-json-modules --exec babel-node index.js"
 },
```

- `npm star` type in terminal
