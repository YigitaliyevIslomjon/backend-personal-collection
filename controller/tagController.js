const { Tag } = require("../model/tagModal");
require("express-async-errors");

const getTagList = async (req, res) => {
  const tag = await Tag.find({}).select("tag_name");
  return res.status(200).json({ data: tag });
};

module.exports = {
  getTagList,
};
