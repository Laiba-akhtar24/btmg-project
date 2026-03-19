const express = require("express");
const router = express.Router();
const LaunchDate = require("../models/LaunchDate");

/* GET all launch dates */

router.get("/", async (req, res) => {

  try {

    const launches = await LaunchDate.find();

    res.json(launches);

  } catch (err) {

    res.status(500).json(err);

  }

});


/* CREATE launch date */

router.post("/", async (req, res) => {

  try {

    const launch = new LaunchDate(req.body);

    const saved = await launch.save();

    res.json(saved);

  } catch (err) {

    res.status(500).json(err);

  }

});


/* DELETE launch date */

router.delete("/:id", async (req, res) => {

  try {

    await LaunchDate.findByIdAndDelete(req.params.id);

    res.json({ message: "Launch date deleted" });

  } catch (err) {

    res.status(500).json(err);

  }


},
/* UPDATE launch date */

router.put("/:id", async (req, res) => {

  try {

    const updated = await LaunchDate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);

  } catch (err) {

    res.status(500).json(err);

  }

})
);


module.exports = router;