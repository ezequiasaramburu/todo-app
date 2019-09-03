const TodoSchema = require('../models/todo_model.js');
const ObjectId = require('mongoose').Types.ObjectId;
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
    const { id }  = req.params;
    const todoResolved = await TodoSchema.findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: {
            status: TASK_STATUS.RESOLVED
          }
        });
    console.log(todoResolved);
    res.status(200).json({ success: true , todoResolved});
  } catch(error) {
    console.log(error);
    res.status(400).json({ success: false, msg: 'Somenthing went wrong marking Todo as Resolved'});
  }
};

module.exports.delete = function(req, res) {
  console.log('===> Delete');
  const { id } = req.params;
  TodoSchema.findOneAndRemove({_id: id}, function(err, todo) {
    if(err) {
      console.log(error);
      res.status(400).json({ success: false, msg: 'Somenthing went wrong deleting Todo'});
    }
    console.log(todo);
    res.send({ success: true });
  });
}

