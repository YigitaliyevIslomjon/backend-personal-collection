const Joi = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemExtraFieldSchema = new Schema({
  int_field: [
    {
      name: String,
    },
  ],
  str_field: [
    {
      name: String,
    },
  ],
  textare_field: [
    {
      name: String,
    },
  ],
  checkbox_field: [
    {
      name: String,
    },
  ],
  date_field: [
    {
      name: String,
    },
  ],
  collection_id: {
    type: Schema.Types.ObjectId,
    ref: "Collection",
    required: true,
  },
  created_at: {
    type: Date,
    required: false,
    default: new Date(),
  },

  updated_at: { type: Date, required: false, default: new Date() },
});

const ItemExtraField = mongoose.model("ItemExtraField", itemExtraFieldSchema);

const validateItemExtraField = (data) => {
  const itemExtraFieldSchema = Joi.object({
    int_field: Joi.array().items(
      Joi.object({
        name: Joi.string(),
      })
    ),
    str_field: Joi.array().items(
      Joi.object({
        name: Joi.string(),
      })
    ),
    textare_field: Joi.array().items(
      Joi.object({
        name: Joi.string(),
      })
    ),
    checkbox_field: Joi.array().items(
      Joi.object({
        name: Joi.string(),
      })
    ),
    date_field: Joi.array().items(
      Joi.object({
        name: Joi.string(),
      })
    ),
    collection_id: Joi.string(),
  });
  return itemExtraFieldSchema.validate(data);
};

module.exports = {
  ItemExtraField,
  validateItemExtraField,
};
