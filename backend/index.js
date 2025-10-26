const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const Trail = require('./models/Trail')

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/trails', require('./routes/trails.js'));

(async () => {
  await sequelize.sync({ alter: true })
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Database sync error:', err));
})();

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
