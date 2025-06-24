import { useEffect, useState } from 'react';
import { type Contact } from './types/Contact';
import ContactForm from './componenets/ContactForm';
import ContactList from './componenets/ContactList';
import Header from './componenets/Header';
import * as contactService from './services/contactService';

export default function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [editing, setEditing] = useState<Contact | null>(null);

  // Fetch all contacts from backend on load
  useEffect(() => {
    (async () => {
      try {
        const data = await contactService.getContacts();
         console.log("Fetched contacts:", data);
        setContacts(data);
      } catch (error) {
        console.error("Failed to fetch contacts:", error);
      }
    })();
  }, []);

  const handleSave = async (contact: Contact) => {
    try {
      if (editing) {
        await contactService.updateContact(contact.id, contact);
        setContacts((prev) =>
          prev.map((c) => (c.id === contact.id ? contact : c))
        );
        setEditing(null);
      } else {
        const newContact = await contactService.createContact({
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
        });

        setContacts((prev) => [...prev, newContact]);
      }
    } catch (error) {
      console.error("Failed to save contact:", error);
    }
  };

  const handleEdit = (contact: Contact) => {
    setEditing(contact);
  };

  const handleDelete = async (id: string) => {
    try {
      await contactService.deleteContact(id);
      setContacts((prev) => prev.filter((c) => c.id !== id));
      if (editing?.id === id) setEditing(null);
    } catch (error) {
      console.error("Failed to delete contact:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-blue-950 p-6 flex flex-col items-center pt-28">
        <h1 className="text-3xl font-bold mb-6 text-white">📇 Contact Manager</h1>
        <ContactForm
          onSave={handleSave}
          editContact={editing}
          onCancel={() => setEditing(null)}
        />
        <ContactList
          contacts={contacts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </>
  );
}
