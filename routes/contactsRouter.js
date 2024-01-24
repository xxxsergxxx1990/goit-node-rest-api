const express = require("express");
const contacts = require("../controllers/contactsControllers.js");
const contactSchema = require("../schemas/contactsSchemas");


function validateBody(schema) {
    return (req, res, next) => {
      const validationResult = schema.validate(req.body);
      if (validationResult.error) {
        return res.status(400).json({ error: validationResult.error.message });
      }
      next();
    };
  }


const contactsRouter = express.Router();

contactsRouter.get("/", contacts.getAllContacts);

contactsRouter.get("/:id", contacts.getOneContact);

contactsRouter.delete("/:id", contacts.deleteContact);

contactsRouter.post("/",validateBody(contactSchema), contacts.createContact);

contactsRouter.put("/:id",validateBody(contactSchema), contacts.updateContact);

module.exports = contactsRouter
