//Endpoints for businesses
const express = require("express");
const {
  fetchBusinesses,
  fetchBusinessByType,
  createBusiness,
} = require("../db/business");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const results = await fetchBusinesses();
    res.send(results);
  } catch (err) {
    next(err);
  }
});

// router.get("/type", async (req, res, next) => {
//   try {
//     const results = await fetchBusinessByType(req.business.type);
//     res.send(results);
//   } catch (err) {
//     next(err);
//   }
// });

router.post("/me", async (req, res, next) => {
  const { businessname, type } = req.body;
  if (!businessname || !type) {
    next({
      name: "MissingBusinessInformation",
      message: "Please supply both a business name and a business type",
    });
    return;
  }
  const result = await createBusiness(req.body);
  try {
    if (result) {
      res.send({
        message: "Business successfully created",
        business: {
          businessname: result.businessname,
          type: result.type,
        },
      });
      return;
    } else {
      next({
        name: "IncorrectInformationError",
        message: "Trouble creating business. Try again later",
      });
    }
  } catch (err) {
    next(err);
  }
});

//fetch all businesses
//fetch business type
module.exports = router;
