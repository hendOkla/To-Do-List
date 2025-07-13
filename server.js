const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

require('./dbConnection/mongoose.js'); // MongoDB connection
app.use(express.json());

const taskRouter = require('./routes/tasksRouter');
app.use('/api', taskRouter);

// 🛎️ Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});