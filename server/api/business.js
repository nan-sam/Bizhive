//Endpoints for businesses
const express = require("express");
const router = express.Router();
const {
  fetchBusinesses,
  fetchBusinessByType,
  fetchBusinessById,
  createBusiness,
} = require("../db/business");

router.get("/", async (req, res, next) => {
  try {
    const results = await fetchBusinesses();
    res.send(results);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const result = await fetchBusinessById(req.params.id);
    if (!result) {
      next({ name: "Not Found", message: "No matching business found" });
      return;
    }
    res.send(result);
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

router.post("/createbusiness", async (req, res, next) => {
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
