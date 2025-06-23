import { useEffect, useState } from 'react';
import { type Contact } from './types/Contact';
import ContactForm from './componenets/ContactForm';
import ContactList from './componenets/ContactList';
import Header from './componenets/Header';


export default function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [editing, setEditing] = useState<Contact | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('contacts');
    if (stored) setContacts(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSave = (contact: Contact) => {
    if (editing) {
      setContacts((prev) =>
        prev.map((c) => (c.id === contact.id ? contact : c))
      );
      setEditing(null);
    } else {
      setContacts((prev) => [...prev, contact]);
    }
  };

  const handleEdit = (contact: Contact) => {
    setEditing(contact);
  };

  const handleDelete = (id: string) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
    if (editing?.id === id) setEditing(null);
  };

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-blue-950 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-white">📇 Contact Manager</h1>
      <ContactForm onSave={handleSave} editContact={editing} onCancel={() => setEditing(null)} />
      <ContactList contacts={contacts} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
    </>
  );
}
