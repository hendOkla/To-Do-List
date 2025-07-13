const express = require('express');
const Task = require('../models/taskModel')

const router = express.Router();


// to create new Task
router.post('/task', async(req, res)=>{
    const newTask = new Task(req.body);
    try{
        const saveTask = await newTask.save();
        res.status(200).json(saveTask);

    }catch(err){
        res.status(500).json({error:err.message})

    }
})


// to get some task
router.get('/task/:id',async(req, res)=>{
    try{
        const _id = req.params.id
        const task = await Task.findOne({ _id });


        if(!task){
            return res.status(500).send('sorry, this task unavailable')
        }
        res.send(task)
        
    
    }catch(err){
        res.status(500).json({error:err.message})
    }
})

// to update some task
router.patch('/task/:id', async(req, res)=>{
    try{
        const _id = req.params.id
        const task = await Task.findByIdAndUpdate(
            _id,
             req.body,
            {new: true, runValidators:true}
            );

        if(!task){
            return res.status(404).send('no task is finding')
        }
        res.status(200).send(task)

    }catch(err){
        if(err.code ===11000){
            return res.status(409).send('Title must be unique. That one already exists.')
        }
        res.status(500).send(err.message)
    }
})

// to delete some task 
router.delete('/task/:id',async(req, res)=>{
    try{
        const _id = req.params.id
        const task = await Task.findByIdAndDelete(_id)

        if(!task){
            res.status(404).send('No task is founded')
        }
        res.status(200).send(task);
    }catch(err){
        res.status(500).send(err.message)
    }
})

module.exports =router;