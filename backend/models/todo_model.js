const mongoose = require('mongoose');
const { TASK_STATUS } = require('../const/const.js');
autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;

let Todo = new Schema({
  _id: Number,
  description: {
    text: {
      type: String,
      default: ''
    },
    file: {
      type: String,
      default: ''
    }
  },
  status: {
    type: TASK_STATUS,
    default: TASK_STATUS.PENDING
  }
}, { _id: false });

autoIncrement.initialize(mongoose);
Todo.plugin(autoIncrement.plugin, { model: 'Todo', startAt: 1 });
module.exports = mongoose.model('Todo', Todo);