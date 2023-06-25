require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const Port = 3032;
const router = express.Router();

app.use("/", router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors({ origin: "*" }));

app.listen(Port, () => {
  console.log(`Server listening on port ${Port}`);
});

// ==><=== //
app.get("/get-price", async (req, res) => {
  const apiKey = "bc093fe3-1948-4939-8638-2c01e69a1afa";
  const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?convert_id=2796&id=24638`;

  const headers = {
    Accepts: "application/json",
    "X-CMC_PRO_API_KEY": apiKey,
  };

  try {
    const response = await fetch(url, { headers });
    const data = await response.json();

    if (data.data) {
      const nrkInrData = Math.round(data.data[24638].quote[2796].price * 100);
      res.json({ data: nrkInrData });
    } else {
      res.json({ data: 778 });
    }
  } catch (error) {
    res.json({ data: 778 });
  }
});
