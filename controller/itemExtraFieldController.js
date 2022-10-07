const { object } = require("joi");
const {
  ItemExtraField,
  validateItemExtraField,
} = require("../model/itemExtraFieldModal");

require("express-async-errors");

const getItemExtraFieldById = async (req, res) => {
  const itemExtraField = await ItemExtraField.findOne({
    collection_id: req.params.collection_id,
  }).select("-collection_id -__v -_id");
  if (!itemExtraField) {
    return res.status(404).send({ error: "id  not found" });
  }
  return res.status(200).json(itemExtraField);
};

const createItemExtraField = async (req, res) => {
  let { error } = validateItemExtraField(req.body);
  if (!error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const {
    int_field,
    str_field,
    textare_filed,
    checkbox_field,
    date_filed,
    collection_id,
  } = req.body;

  var query = {},
    update = { expire: new Date() },
    options = { upsert: true, new: true, setDefaultsOnInsert: true };

  const itemExtraField = await ItemExtraField.findOneAndUpdate(
    { collection_id: req.params.collection_id },
    {
      int_field,
      str_field,
      textare_filed,
      checkbox_field,
      date_filed,
      collection_id,
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  return res.status(200).json(itemExtraField);
};

const updateItemExtraField = async (req, res) => {
  const result = await ItemExtraField.findById(req.params.id);
  if (!result) {
    return res.status(400).json({ error: "bunday ItemExtraField mavjud emas" });
  }
  const {
    int_field,
    str_field,
    textare_filed,
    checkbox_field,
    date_filed,
    collection_id,
  } = req.body;

  const updateItemExtraField = await ItemExtraField.findByIdAndUpdate(
    req.params.id,
    {
      int_field,
      str_field,
      textare_filed,
      checkbox_field,
      date_filed,
      collection_id,
    },
    {
      new: true,
    }
  );
  return res.status(200).json(updateItemExtraField);
};

const deleteItemExtraField = async (req, res) => {
  let id = req.params.id;
  const result = await ItemExtraField.findByIdAndDelete(id);
  if (!result) {
    return res.status(200).json("error");
  }
  return res.status(200).json("success");
};

module.exports = {
  getItemExtraFieldById,
  createItemExtraField,
  updateItemExtraField,
  deleteItemExtraField,
};
