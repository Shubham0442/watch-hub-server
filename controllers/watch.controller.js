const { Router } = require("express");
const { Watch } = require("../models/watch.model");

const watchController = Router();

watchController.post("/new", async (req, res) => {
  try {
    await Watch.insertMany(req.body);
    res.status(201).send({ msg: "Data added successfully!" });
  } catch (error) {
    res.status(500).send({ msg: "Something went wrong!" });
  }
});

watchController.get("/", async (req, res) => {
  const { brand, category, gender, sort, skip } = req.query;
  let aggregationPipeline = [];

  try {
    if (brand && !category && !gender) {
      aggregationPipeline.push({
        $match: {
          $and: [{ brand: { $in: brand || [] } }]
        }
      });
    } else if (brand && category && !gender) {
      aggregationPipeline.push({
        $match: {
          $and: [
            { brand: { $in: brand || [] } },
            { category: { $in: category || [] } }
          ]
        }
      });
    } else if (brand && category && gender) {
      aggregationPipeline.push({
        $match: {
          $and: [
            { brand: { $in: brand || [] } },
            { category: { $in: category || [] } },
            { suitable_for: { $in: gender || [] } }
          ]
        }
      });
    } else if (!brand && category && gender) {
      aggregationPipeline.push({
        $match: {
          $and: [
            { category: { $in: category || [] } },
            { suitable_for: { $in: gender || [] } }
          ]
        }
      });
    } else if (!brand && !category && gender) {
      aggregationPipeline.push({
        $match: {
          $and: [{ suitable_for: { $in: gender || [] } }]
        }
      });
    } else if (brand && !category && gender) {
      aggregationPipeline.push({
        $match: {
          $and: [
            { brand: { $in: brand || [] } },
            { suitable_for: { $in: gender || [] } }
          ]
        }
      });
    } else if (!brand && category && !gender) {
      aggregationPipeline.push({
        $match: {
          $and: [{ category: { $in: category || [] } }]
        }
      });
    } else {
      if (sort !== "") {
        const watches = await Watch.find()
          .sort({ price: Number(sort) })
          .skip(Number(skip))
          .limit(12);
        res.status(200).send({ watches });
      } else {
        const watches = await Watch.find().skip(Number(skip)).limit(12);
        res.status(200).send({ watches });
      }
    }

    if (aggregationPipeline.length !== 0) {
      if (sort !== "") {
        aggregationPipeline.push({ $sort: { price: Number(sort) } });
        const watches = await Watch.aggregate(aggregationPipeline)
          .skip(Number(skip))
          .limit(12);
        res.status(200).send({ watches });
      } else {
        const watches = await Watch.aggregate(aggregationPipeline)
          .skip(Number(skip))
          .limit(12);
        res.status(200).send({ watches });
      }
    }
  } catch (error) {
    res.status(500).send({ msg: "Something went wrong!" });
  }
});

module.exports = { watchController };
