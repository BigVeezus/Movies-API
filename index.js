const connectDB = require("./config/db");
const app = require("./app");

// Calling MongoDB function
connectDB();

// Starts server
app.listen(5000, () => {
  console.log(`Server running on 5000`);
});
