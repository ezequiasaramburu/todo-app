const TodoSchema = require('../models/todo_model.js');
const { TASK_STATUS } = require('../const/const.js');

module.exports.get = async function(req, res) {
  console.log('===> GET');
  try {
    const todos = await TodoSchema.find({});
    res.status(200).json({success: true, todos});
	} catch(error) {
    console.log(error);
		res.status(400).json({success: false, msg: 'Somenthing went wrong fetching todos'});
	}
};  

module.exports.create = async function(req, res) {
  console.log('===> Add', req.body);
  try {
    const { description } = req.body;
    const todo = await TodoSchema.create({ description });
    res.status(200).json({success: true, msg: 'Todo added successfully', todo});
  } catch(error) {
    console.log(error);
    res.status(400).json({success: false, msg: 'Somenthing went wrong adding new Todo'});
  }
};

module.exports.update = async function(req, res) {
  console.log('===> Update', req.params);
  try {
    const { _id } = req.params;
    const todoResolved = await Todo.findOneAndUpdate({_id: _id}, {status: TASK_STATUS.RESOLVED});
    res.status(200).json({ success: true , todoResolved});
  } catch(error) {
    console.log(error);
    res.status(400).json({ success: false, msg: 'Somenthing went wrong marking Todo as Resolved'});
  }
};

module.exports.delete = async function(req, res) {
  console.log('===> Delete');
  try {
    const { _id } = req.params;
    await TodoSchema.findOneAndDelete({_id: _id});
    res.status(200).json({ success: true, msg: 'Todo deleted successfully '});
  } catch(error) {
    console.log(error);
    res.status(400).json({ success: false, msg: 'Somenthing went wrong deleting Todo'});
  }
};