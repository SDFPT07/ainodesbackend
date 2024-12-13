require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const aiRoutes = require("./routes/AiRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello from devChatGPT!");
});

app.use("/api/ai", aiRoutes);

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
