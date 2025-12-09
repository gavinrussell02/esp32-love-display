import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

let currentMessage = "Hello world 👋";

// ROOT WEBSITE
app.get("/", (req, res) => {
  res.send(`
    <h1>Love Display Controller</h1>
    <p>Current message:</p>
    <h2>${currentMessage}</h2>

    <form action="/update">
      <input name="text" placeholder="New message" style="width:300px;font-size:18px">
      <button type="submit" style="font-size:18px">Update</button>
    </form>
  `);
});

// ESP32 GETS THIS
app.get("/message", (req, res) => {
  res.json({ text: currentMessage });
});

// PHONE/WEB UPDATES MESSAGE
app.get("/update", (req, res) => {
  if (req.query.text) currentMessage = req.query.text;
  res.send(`Updated message to: ${currentMessage}`);
});

app.listen(3000, () => console.log("Server running on port 3000"));
