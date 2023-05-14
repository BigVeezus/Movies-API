const connectDB = require("./config/db");
const app = require("./app");

connectDB();

app.listen(5000, () => {
  console.log(`Server running on 5000`);
});
