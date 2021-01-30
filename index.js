const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

app.get('/', (req, res) => {
    res.json({ message: 'My Rule-Validation API' ,
     status: 'success', 
     data: {
        'name': 'Aluko Ayodele',
        'github': '@Alukoayodele',
        'email': 'ayodelealuko009.aa@gmail.com',
        'mobile': '09023735636',
        'twitter': '@AlukoAyokunnumi'
     }});
  });

  app.use('/', require('./route/validateRule'))
  app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.send({
        message: err.message,
        error: err.status,
      });
    });
  }
  const PORT = process.env.PORT || 5000;
  
  app.listen(PORT, () => {
    console.log(`Server Started on ${PORT}`);
  });