const sequelize = require('./index.js');

sequelize.authenticate()
  .then(() => console.log('DB connected'))
  .catch(err => console.error('DB connection error:', err));
