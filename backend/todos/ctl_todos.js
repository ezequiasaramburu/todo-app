const TodoSchema = require('../models/todo_model.js');
const ObjectId = require('mongoose').Types.ObjectId;
const { TASK_STATUS } = require('../const/const.js');

module.exports.get = async function(req, res) {
  try {
    const todos = await TodoSchema.find({});
    res.status(200).json({ success: true, todos });
	} catch(error) {
    console.log(error);
		res.status(400).json({ success: false, msg: 'Somenthing went wrong fetching todos' });
	}
};  

module.exports.create = async function(req, res) {
  try {
    const { description } = req.body;
    const todo = await TodoSchema.create({ description });
    res.status(200).json({ success: true, msg: 'Todo added successfully', todo });
  } catch(error) {
    console.log(error);
    res.status(400).json({ success: false, msg: 'Somenthing went wrong adding new Todo' });
  }
};

module.exports.update = function(req, res) {
  const { id }  = req.params;
  TodoSchema.findByIdAndUpdate(
    { _id: id },
    { $set: {
        status: TASK_STATUS.RESOLVED
      }
    },
    { new: true },
    function(err, todoResolved) { 
      if(err) {
          console.log(error);
          return res
                  .status(400)
                  .json({ success: false, msg: 'Somenthing went wrong marking Todo as Resolved' });
      }
      return res.status(200).json({ success: true, todoResolved });
    });
};
// TODO: delete real file not only path ref on databse
module.exports.delete = function(req, res) {
  const { id } = req.params;
  TodoSchema.findByIdAndRemove({ _id: id }, function(err, todo) {
    if(err) {
      console.log(error);
      res.status(400).json({ success: false, msg: 'Somenthing went wrong deleting Todo' });
    } else {
      res.status(200).json({ success: true });
    }
  });
}

