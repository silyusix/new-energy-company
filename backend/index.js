const express = require('express');
const cors = require('cors');
const sequelize = require('./src/config/database');
const companyRoutes = require('./src/api/companies');

const app = express();
const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || origin.startsWith('http://localhost')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/companies', companyRoutes);

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connection authenticated.');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
  }
}

startServer();