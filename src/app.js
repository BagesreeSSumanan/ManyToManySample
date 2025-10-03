const express = require('express');
const config = require('./config/config');
const app = express();
require('dotenv').config();
const {createTutorial,createTag,addTutorial,findAlltags,findTagById,findAllTutorials,findTutorialById}= require('./controller/controller');
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