const { Topic, validateTopic } = require("../model/topicModal");

const getTopicList = async (req, res) => {
  let topic = await Topic.find({});
  console.log(topic);
  return res.status(200).json(topic);
};

const createTopic = async (req, res) => {
  let { topic_name } = req.body;
  let { error } = validateTopic(req.body);
  if (error) {
    return res.status("400").json({ message: error.details[0].message });
  }
  let topic = await new Topic({ topic_name });
  topic = await topic.save();
  return res.status(200).json({ topic });
};

const updateTopic = async (req, res) => {
  let { topic_name } = req.body;
  let topic = await Topic.findByIdAndUpdate(
    req.params.id,
    {
      topic_name,
    },
    { new: true }
  );
  return res.status(200).json({ message: "sucess", topic });
};

const deleteTopic = async (req, res) => {
  let result = await Topic.findByIdAndDelete(req.params.id);
  return res.status(200).json({ message: "success" });
};

module.exports = {
  getTopicList,
  createTopic,
  updateTopic,
  deleteTopic,
};
