const express = require("express");
const { startLinkedInAutomation } = require("../automation/linkedin");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("LinkedIn Automation Server Running");
});

app.post("/start", async (req, res) => {
  startLinkedInAutomation();
  res.send("Automation started");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
