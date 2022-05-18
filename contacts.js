const fs = require("fs").promises;
const path = require("path");
const { getMaxListeners } = require("process");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "/db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id == contactId);
  if (!result) {
    return null;
  }
  return result;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id == contactId);
  if (idx === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removedContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const contactToAdd = { id: uuidv4(), name, email, phone };
  contacts.push(contactToAdd);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contactToAdd;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
