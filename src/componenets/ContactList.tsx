import { type Contact } from '../types/Contact';

interface Props {
  contacts: Contact[];
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
}

export default function ContactList({ contacts, onEdit, onDelete }: Props) {
  return (
    <div className="mt-6 w-full max-w-md px-4 sm:px-0 mx-auto">
  {contacts.length === 0 ? (
    <p className="text-gray-500 text-center">No contacts added.</p>
  ) : (
    <ul className="space-y-3">
      {contacts.map((contact) => (
        <li
          key={contact.id}
          className="bg-white p-4 shadow rounded flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
        >
        
          <div className="w-full">
            <h3 className="font-bold text-lg break-words">{contact.name}</h3>
            <p className="text-sm text-gray-700 break-words">{contact.email}</p>
            <p className="text-sm text-gray-700 break-words">{contact.phone}</p>
          </div>

          <div className="flex gap-2 sm:justify-end">
            <button
              onClick={() => onEdit(contact)}
              className="text-sm bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(contact.id)}
              className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  )}
</div>

  );
}
