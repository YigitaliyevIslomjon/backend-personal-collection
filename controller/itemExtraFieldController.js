import "express-async-errors";
const ItemExtraField = require("../model/itemExtraFieldModal");

export const getItemExtraFieldList = async (req, res) => {
  const itemExtraField = await ItemExtraField.find({}).populate("collection");
  return res.status(200).json(itemExtraField);
};

export const createItemExtraField = async (req, res) => {
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
  return res.status(200).json(result);
};

export const updateItemExtraField = async (req, res) => {
  const result = await ItemExtraField.findById(req.params.id);
  if (!result) {
    return res.status(400).json("bunday ItemExtraField mavjud emas");
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

export const deleteItemExtraField = async (req, res) => {
  let id = req.params.id;
  const result = await ItemExtraField.findByIdAndDelete(id);
  if (!result) {
    return res.status(200).json("error");
  }
  return res.status(200).json("success");
};
