const {
  ItemExtraField,
  validateItemExtraField,
} = require("../model/itemExtraFieldModal");

require("express-async-errors");

const getItemExtraFieldById = async (req, res) => {
  const itemExtraField = await ItemExtraField.findOne({
    collection_id: req.params.collection_id,
  }).select("-collection_id -__v -_id -created_at -updated_at");
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
    textare_field,
    date_field,
    checkbox_field,
    collection_id,
  } = req.body;
  console.log(req.body);
  const itemExtraField = await ItemExtraField.findOneAndUpdate(
    { collection_id: req.params.collection_id },
    {
      int_field,
      str_field,
      textare_field,
      date_field,
      checkbox_field,
      collection_id,
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  return res.status(200).json(itemExtraField);
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

  deleteItemExtraField,
};
