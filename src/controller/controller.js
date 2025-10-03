const { where } = require('sequelize');
const db = require('../config/db');
const Tutorial = db.tutorial;
const Tag = db.tag;

const createTutorial = (tutorial) => {
  return Tutorial.create({
    title: tutorial.title,
    description: tutorial.description,
  })
    .then((tutorial) => {
      console.log(">> Created tutorial: " + JSON.stringify(tutorial, null, 4));
      return tutorial;
    })
    .catch((err) => {
      console.log(">> Error while creating tutorial: ", err);
    });
};

const createTag = (tag) => {
  return Tag.create({
    name: tag.name,
  })
    .then((tag) => {
      console.log(">> Created Tag: " + JSON.stringify(tag, null, 2));
      return tag;
    })
    .catch((err) => {
      console.log(">> Error while creating Tag: ", err);
    });
};

const addTutorial = (tagId, tutorialId) => {
  return Tag.findByPk(tagId)
    .then((tag) => {
      if (!tag) {
        console.log("Tag not found!");
        return null;
      }
      return Tutorial.findByPk(tutorialId).then((tutorial) => {
        if (!tutorial) {
          console.log("Tutorial not found!");
          return null;
        }

        tag.addTutorial(tutorial);
        console.log(`>> added Tutorial id=${tutorial.id} to Tag id=${tag.id}`);
        return tag;
      });
    })
    .catch((err) => {
      console.log(">> Error while adding Tutorial to Tag: ", err);
    });
};
module.exports = { createTutorial,createTag,addTutorial};
