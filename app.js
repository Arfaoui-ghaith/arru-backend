const express = require('express');
const app = express();


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json({ limit: '10kb' }));

app.all('/test/', (req, res, next) => {
    
    res.status(404).json({
      status: 'fail',
      message: `can't find ${req.originalUrl}`,
    });
    //next(new AppError(`can't find ${req.originalUrl}`, 404));
});


module.exports = app;