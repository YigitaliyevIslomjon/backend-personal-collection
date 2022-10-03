require("express-async-errors");
const Tag = require("../model/tagModal.js");

export const getTagList = async (req, res) => {
  const tag = await Tag.find({}).select("tag_name");
  return res.status(200).json({ data: tag });
};
// export const creatTag = async (req, res) => {
//   const tag = await Tag.find({});
//   return res.status(200).json(tag);
// };
