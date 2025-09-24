const express = require('express');
const sequelize = require('./models/index.js');
const Trail = require('./models/Trail.js')

const app = express();
app.use(express.json());
app.use('/api/trails', require('./routes/trails.js'));

(async () => {
  await sequelize.sync();
})();

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
