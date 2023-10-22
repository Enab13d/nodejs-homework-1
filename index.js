const { listContacts, getContactById, removeContact, addContact } = require('./contacts')
const argv = require('yargs').argv;
console.log('Hello World');
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contacts = await listContacts();
      return console.table(contacts);
    case 'get':
      const contact = await getContactById(id);
      return console.table(contact);

    case 'add':
      const newContact = await addContact(name, email, phone);
      return console.table(newContact);

    case 'remove':
      const deletedContact = await removeContact(id);
      return console.table(deletedContact);

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
