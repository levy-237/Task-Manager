const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  createTask,
  getTask,
  editTask,
  deleteTask,
} = require("../controllers/tasks");
router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").patch(editTask).get(getTask).delete(deleteTask);
module.exports = router;
