const { sequelize } = require('./models');

console.log('Starting database synchronization...');

// The `sync` method will create tables for all defined models.
// Using `{ alter: true }` is a safe way to update the schema in development,
// as it attempts to make non-destructive changes to match the models.
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synchronized successfully. Tables are created/updated.');
    // Close the database connection
    return sequelize.close();
  })
  .then(() => {
    console.log('Connection closed.');
    process.exit(0);
  })
  .catch(err => {
    console.error('Error synchronizing the database:', err);
    process.exit(1);
  });
