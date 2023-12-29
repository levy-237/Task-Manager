const express = require("express");
const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(201).json({ tasks });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getTask = async (req, res) => {
  try {
    // const taskID = req.params.id;
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
      return res.status(404).json({ msg: "NO TASK WITH ID" });
    }
    res.status(201).json({ task });
  } catch (error) {
    res.status(501).json({ msg: error });
  }
};
const editTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const updatedTask = req.body;
    const task = await Task.findOneAndUpdate({ _id: taskID }, updatedTask, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({ msg: "NO TASK WITH ID" });
    }
    res.status(201).json({ task });
  } catch (error) {
    res.status(401).json({ msg: error });
  }
};
const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.deleteOne({ _id: taskID });
    if (!task) {
      return res.status(404).json({ msg: "WRONG PRODUCT ID" });
    }
    res.status(200).json({ msg: "SUCCESSFULLY DELETED" });
  } catch (error) {
    res.status(401).json({ msg: error });
  }
};

module.exports = { getAllTasks, createTask, getTask, editTask, deleteTask };
