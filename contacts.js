const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.resolve("db", "contacts.json");
const readAndParseContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
};

async function listContacts() {
  try {
    const contacts = await readAndParseContacts();
    console.table(contacts);
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
}
async function getContactById(contactId) {
  try {
    const data = await readAndParseContacts();
    const contact = data.find((contact) => contact.id === contactId) || null;
    if (!contact) {
      return;
    }
    console.table(contact);
    return contact || null;
  } catch (error) {
    console.log(error.message);
  }
}
async function removeContact(contactId) {
  try {
    const data = await readAndParseContacts();
    const deletedContact = data.find((contact) => contact.id === contactId) || null;
    if (!deletedContact) {
      console.log(deletedContact);
      return null;
    }
    const filteredContacts = data.filter((contact) => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
    console.table(deletedContact);
    return deletedContact;
  } catch (error) {
    console.log(error);
  }
}
async function addContact(name, email, phone) {
  const data = await readAndParseContacts();
  const isExist = data.find(
    (contact) =>
      contact.name === name &&
      contact.email === email &&
      contact.phone === phone
  );
  if (isExist) {
    console.warn("Contact with such credentials already exists");
    return;
  }
  try {
    const newContact = {
      id: Date.now().toString(),
      name,
      email,
      phone,
    };
    data.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(data));
    console.table(newContact);
    return;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
