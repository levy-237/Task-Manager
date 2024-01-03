const express = require("express");
const Task = require("../models/Task");
const asyncWrapper = require("../middlewares/async");
const { createCustomError } = require("../errors/custom-error");
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(201).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  // const taskID = req.params.id;
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return next(createCustomError("NO TASK WITH ID", 404));
  }
  res.status(201).json({ task });
});
const editTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const updatedTask = req.body;
  const task = await Task.findOneAndUpdate({ _id: taskID }, updatedTask, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError("NO TASK WITH ID", 404));
  }
  res.status(201).json({ task });
});
const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.deleteOne({ _id: taskID });
  if (!task) {
    return next(createCustomError("NO TASK WITH ID", 404));
  }
  res.status(200).json({ msg: "SUCCESSFULLY DELETED" });
});

module.exports = { getAllTasks, createTask, getTask, editTask, deleteTask };
