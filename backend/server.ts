import app from "./app";
import connectDB from "./src/config/db";

const port = 5000;

connectDB();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
