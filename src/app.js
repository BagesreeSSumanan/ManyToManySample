const express = require('express');
const config = require('./config/config');
const app = express();
require('dotenv').config();
const {createTutorial,createTag,addTutorial}= require('./controller/controller');
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