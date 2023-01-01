const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qpavz6c.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const recentMovies = client.db("onlineMovies").collection("AllMovies");

    app.get("/movies", async (req, res) => {
      const query = {};
      const movies = await recentMovies.find(query).toArray();
      res.json(movies);
    });
    app.get("/movies/:status", async (req, res) => {
      const status = req.params.status;
      const query = { status: status };
      const movies = await recentMovies.find(query).toArray();
      console.log(movies);
      res.json(movies);
    });
  } finally {
  }
}
run().catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("Online movie server is running");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
