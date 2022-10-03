const { ItemExtraField } = require("../model/itemExtraFieldModal");

require("express-async-errors");

const getItemExtraFieldList = async (req, res) => {
  const itemExtraField = await ItemExtraField.find({}).populate("collection");
  return res.status(200).json(itemExtraField);
};

const createItemExtraField = async (req, res) => {
  const {
    int_field,
    str_field,
    textare_filed,
    checkbox_field,
    date_filed,
    collection_id,
  } = req.body;
  let checking = await ItemExtraField.findOne({ collection_id });
  if (checking) {
    let result = await ItemExtraField.findOneAndUpdate(
      { collection_id },
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
    return res.status(200).json(result);
  }
  const itemExtraField = new ItemExtraField({
    int_field,
    str_field,
    textare_filed,
    checkbox_field,
    date_filed,
    collection_id,
  });
  const result = await itemExtraField.save();
  return res.status(200).json({ data: result });
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
  getItemExtraFieldList,
  createItemExtraField,
  updateItemExtraField,
  deleteItemExtraField,
};
