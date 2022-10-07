const { Tag, validateTag } = require("../model/tagModal");
require("express-async-errors");

const getTagList = async (req, res) => {
  const tag = await Tag.find({}).select("tag_name");
  return res.status(200).json({ data: tag });
};

const createTag = async (req, res) => {
  const { tag_name } = req.body;
  let { error } = validateTag(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  let tag = await new Tag({
    tag_name,
  });
  tag = await tag.save();
};

module.exports = {
  getTagList,
  createTag,
};
