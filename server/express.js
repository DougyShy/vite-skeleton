import express from "express";
import path from "path";

const CURRENT_WORKING_DIR = process.cwd();
const app = express();

app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

// Catch unauthorised errors
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});

export default app;
