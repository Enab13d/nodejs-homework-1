const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "db", "contacts.json");
const readAndParseContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

async function listContacts() {
    const contacts = await readAndParseContacts();
    return contacts;

}
async function getContactById(contactId) {
    const data = await readAndParseContacts();
    const contact = data.find((contact) => contact.id === contactId);
    if (!contact) {
      return;
    }
    return contact || null;
}
async function removeContact(contactId) {
    const data = await readAndParseContacts();
    const index = data.findIndex((contact) => contact.id === contactId);
        if (index === -1) {
      return null;
    }
    const deletedContact = data.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
    return deletedContact;
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
    const newContact = {
      id: Date.now().toString(),
      name,
      email,
      phone,
    };
    data.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
    return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
