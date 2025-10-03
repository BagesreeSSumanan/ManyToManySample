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

const findAlltags = () => {
  return Tag.findAll({
    include: [
      {
        model: Tutorial,
        as: "tutorial",
        attributes: ["id", "title", "description"],
        through: {
          attributes: [],
        }
      },
    ],
  })
    .then((tags) => {
      return tags;
    })
    .catch((err) => {
      console.log(">> Error while retrieving Tags: ", err);
    });
};

const findTagById = (id) => {
  return Tag.findByPk(id, {
    include: [
      {
        model: Tutorial,
        as: "tutorial",
        attributes: ["id", "title", "description"],
        through: {
          attributes: [],
        }
      },
    ],
  })
    .then((tag) => {
      return tag;
    })
    .catch((err) => {
      console.log(">> Error while finding Tag: ", err);
    });
};
const findAllTutorials = () => {
  return Tutorial.findAll({
    include: [
      {
        model: Tag,
        as: "tags",
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((tutorials) => {
      return tutorials;
    })
    .catch((err) => {
      console.log(">> Error while retrieving Tutorials: ", err);
    });
};
const findTutorialById = (id) => {
  return Tutorial.findByPk(id, {
    include: [
      {
        model: Tag,
        as: "tags",
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
        // through: {
        //   attributes: ["tag_id", "tutorial_id"],
        // },
      },
    ],
  })
    .then((tutorial) => {
        console.log("tutorial",tutorial)
      return tutorial;
    })
    .catch((err) => {
      console.log(">> Error while finding Tutorial: ", err);
    });
};

const updateTutorial = async (id,tutorial,) => {
  try {
    const currenttutorial = await Tutorial.findByPk(id);
    if (!currenttutorial) {
      console.log("Tutorial not found");
      return null;
    }
    await currenttutorial.update({
       title: tutorial.title,
      description: tutorial.description,},
      {
      where: { id: id } 
    });
    return currenttutorial;
  } catch (err) {
    console.log(">> Error while updating tutorials: ", err);
  }
};
const updateTag = async (id,tag,) => {
  try {
    const currenttag = await Tag.findByPk(id);
    if (!currenttag) {
      console.log("Tag not found");
      return null;
    }
    await currenttag.update({
       name: tag.name,},
      {
      where: { id: id } 
    });
    return currenttag;
  } catch (err) {
    console.log(">> Error while updating tag: ", err);
  }
};
const deleteTutorialById = async (id) => {
  try {
    const tutorial = await Tutorial.findByPk(id);
    if (!tutorial) {
      console.log("Tutorial not found");
      return null;
    }
    await tutorial.destroy();
    console.log("Tutorial deleted successfully");
    return tutorial;
  } catch (err) {
    console.log(">> Error while deleting tutorial: ", err);
  }
};
const deleteTagById = async (id) => {
  try {
    const tag = await Tag.findByPk(id);
    if (!tag) {
      console.log("Tag not found");
      return null;
    }
    await tag.destroy();
    console.log("Tag deleted successfully");
    return tag;
  } catch (err) {
    console.log(">> Error while deleting tutorial: ", err);
  }
};
module.exports = { createTutorial,createTag,addTutorial,findAlltags,findTagById,findAllTutorials,findTutorialById,
    updateTutorial,updateTag,deleteTutorialById,deleteTagById
};
