const express = require('express');
const config = require('./config/config');
const app = express();
require('dotenv').config();
const {createTutorial,createTag,addTutorial,findAlltags,findTagById,findAllTutorials,findTutorialById,
    updateTutorial,updateTag,deleteTutorialById,deleteTagById
}= require('./controller/controller');
const { tutorial } = require('./config/db');
app.use(express.json());
const tutorialRouter = express.Router();

const PORT = config.port;
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
app.use('/api', tutorialRouter);
tutorialRouter.post('/createTutorial',  async (req, res, next)=>{
    try{
        
    if (!req.body) {
        return res.sendStatus(400);
    }
        const NewTutorial =  await createTutorial(req.body).then(() => res.json({ message: 'Tutorial created.' }));

    } catch(e){
        console.log(e);
        res.sendStatus(400);
    }
});
tutorialRouter.post('/createTag',  async (req, res, next)=>{
    try{
        
    if (!req.body) {
        return res.sendStatus(400);
    }
        const NewTag=  await createTag(req.body).then(() => res.json({ message: 'Tag created.' }));

    } catch(e){
        console.log(e);
        res.sendStatus(400);
    }
});
tutorialRouter.post('/addTutorial',  async (req, res, next)=>{
    try{
        
        if (!req.body) {
            return res.sendStatus(400);
        }
        const NewTag=  await addTutorial(req.body.tag,req.body.tutorial).then(() => res.json({ message: 'Tag created.' }));

    } catch(e){
        console.log(e);
        res.sendStatus(400);
    }
});
tutorialRouter.get('/GetAllTag',  async (req, res, next)=>{
    try{
        
        const Tags=  await findAlltags()
         res.status(200).json({Tags: Tags});

    } catch(e){
        console.log(e);
        res.sendStatus(400);
    }
});
tutorialRouter.get('/GetTag/:id',  async (req, res, next)=>{
    try{
         const id = req.params.id;
        const Tags=  await findTagById(id)
         res.status(200).json({Tags: Tags});

    } catch(e){
        console.log(e);
        res.sendStatus(400);
    }
});
tutorialRouter.get('/GetAllTutorials',  async (req, res, next)=>{
    try{
        
        const Tutorials=  await findAllTutorials()
         res.status(200).json({Tutorials: Tutorials});

    } catch(e){
        console.log(e);
        res.sendStatus(400);
    }
});
tutorialRouter.get('/GetTutorials/:id',  async (req, res, next)=>{
    try{
         const id = req.params.id;
        const Tutorial=  await findTutorialById(id)
         res.status(200).json({Tutorial: Tutorial});

    } catch(e){
        console.log(e);
        res.sendStatus(400);
    }
});
tutorialRouter.put('/updateTutorial/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updateCount = await updateTutorial(id,req.body);

        if (!updateCount) {
            return res.status(404).json({ message: "Tutorial not found" });
        }

        res.status(200).json({ message: "Tutorial updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
tutorialRouter.put('/updateTag/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updateCount = await updateTag(id,req.body);

        if (!updateCount) {
            return res.status(404).json({ message: "Tag not found" });
        }

        res.status(200).json({ message: "Tag updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
tutorialRouter.delete('/deleteTutorial/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedCount = await deleteTutorialById(id);

        if (!deletedCount) {
            return res.status(404).json({ message: "Tutorial not found" });
        }

        res.status(200).json({ message: "Tutorial deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
tutorialRouter.delete('/deleteTag/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedCount = await deleteTagById(id);

        if (!deletedCount) {
            return res.status(404).json({ message: "Tag not found" });
        }

        res.status(200).json({ message: "Tag deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});