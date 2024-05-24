const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDB = require("./ConnectDb");
const TaskModel = require("./Models/Task");
const cors = require("cors")



const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

dotenv.config();
const PORT = process.env.PORT || 3000
connectDB();


app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await TaskModel.find();
        res.json(tasks);
    } catch (error) {
        console.log(error)
    }

});

app.post('/api/tasks', async (req, res) => {
    try {
        const newTask = new TaskModel(req.body);
        const task = await newTask.save();
        res.status(200).json({
            success: true,
            task,
        });
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            error,
        })
    }

});

app.put('/api/tasks/:id', async (req, res) => {
    try {
        const task = await TaskModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            success:true,
            message:"Updated successfully",
            task,
        });
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message:"Error in updation",
            error,
        })
    }
   
});

app.delete('/api/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await TaskModel.findByIdAndDelete(id);
        res.status(200).json({ 
            success: true,
            message:"Deleted successfully"
         });
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message:"Error in deletion",
            error,
        })
    }
 
});

app.listen(PORT, () => {
    console.log(`app is running in ${PORT}`)
})