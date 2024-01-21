const contacts = require("../services/contactsServices");
const { HttpError } = require("../helpers/HttpError");




const getAllContacts = async(req, res) => {
    const result = await contacts.listContacts();
    res.status(200).json(result);

};

const getOneContact = async(req, res) => {

    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) throw HttpError(404, "Not found");
    res.json(result);
};

const deleteContact = async(req, res) => {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    result
      ? res.json({ message: "contact deleted" })
      : HttpError(404, "Not found");


};
const createContact = async(req, res) => {
    const result = await contacts.addContact(req.body);
    return res.status(201).json(result);

};

const updateContact = async(req, res) => {

    const isReqBody = Object.keys(req.body).length !== 0;
    if (!isReqBody) {
      throw RequestError(400, "Missing fields");
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    result ? res.status(200).json(result) : HttpError(404, "Not found");
};


module.exports ={
    updateContact,
    createContact,
    deleteContact,
    getOneContact,
    getAllContacts
}