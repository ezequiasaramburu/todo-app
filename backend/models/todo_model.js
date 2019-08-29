const mongoose = require('mongoose');
const { TASK_STATUS } = require('../const/const.js');
const Schema = mongoose.Schema;

let Todo = new Schema({
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
});

module.exports = mongoose.model('Todo', Todo);