//Dependencies
const express = require("express");
const ratesService = require("./rateApp");

//Constants
const app = express();
const port = process.env.PORT || 3000;

app.get("/api/rates", async (req, res) => {
  const { base, currency } = req.query;

  const currencyRate = await ratesService.getCurrencyRate(base, currency);
  console.log("crrency rate service returned", currencyRate);

  if (currencyRate == null) {
    return res.status(500).json("Error Occured Getting Rate");
  }
  return res.status(200).json(currencyRate);
});

app.listen(port, () =>
  console.log(`Currency Rates API Started On Port ${port}...`)
);
