import React, { useState, useEffect } from 'react';
import { type Contact } from '../types/Contact';
import toast from 'react-hot-toast';

interface Props {
  onSave: (contact: Contact) => Promise<void>;
  editContact?: Contact | null;
  onCancel: () => void;
}


export default function ContactForm({ onSave, editContact, onCancel }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    if (editContact) {
      setName(editContact.name);
      setEmail(editContact.email);
      setPhone(editContact.phone.toString());
    } else {
      setName('');
      setEmail('');
      setPhone('');
    }

    setErrors({ name: '', email: '', phone: '' });
  }, [editContact]);

  const validate = () => {
    const newErrors = { name: '', email: '', phone: '' };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!name.trim()) newErrors.name = 'Name is required.';
    if (!email.trim()) newErrors.email = 'Email is required.';
    else if (!emailRegex.test(email)) newErrors.email = 'Invalid email format.';
    if (!phone.trim()) newErrors.phone = 'Phone is required.';
    else if (!phoneRegex.test(phone)) newErrors.phone = 'Phone number must be 10 digits.';

    setErrors(newErrors);

    return Object.values(newErrors).every((err) => err === '');
  };

  const canClear =
    name.trim() !== '' ||
    email.trim() !== '' ||
    phone.trim() !== '' ||
    errors.name !== '' ||
    errors.email !== '' ||
    errors.phone !== '';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validate()) return;

  const newContact: Omit<Contact, 'id'> = {
    name: name.trim(),
    email: email.trim(),
    phone: Number(phone),
  };

  if (editContact) {
    await onSave({ ...editContact, ...newContact });
    toast.success('Contact updated successfully!');
  } else {
    await onSave(newContact as Contact); // backend will assign `id`
    toast.success('Contact added successfully!');
  }

  setName('');
  setEmail('');
  setPhone('');
  setErrors({ name: '', email: '', phone: '' });
};




  return (
    <div className="p-4 sm:p-6 md:p-8 flex justify-center items-center container mx-auto">
  <form
    onSubmit={handleSubmit}
    className="bg-white w-lg max-w-full p-4 sm:p-6 md:p-8 rounded-xl shadow-lg"
  >
    <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
      {editContact ? 'Edit Contact' : 'Add Contact'}
    </h2>
    <input
      className="w-full mb-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      type="text"
      placeholder="Name"
      value={name}
      onChange={(e) => {
        setName(e.target.value);
        if (errors.name) validate();
      }}
    />
    <p className="text-red-500 text-sm mb-2 min-h-[1.25rem]">
  {errors.name || '\u00A0'}
</p>

    <input
      className="w-full mb-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => {
        setEmail(e.target.value);
        if (errors.email) validate();
      }}
    />
    <p className="text-red-500 text-sm mb-2 min-h-[1.25rem]">
  {errors.email || '\u00A0'}
</p>

    <input
      className="w-full mb-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      type="tel"
      placeholder="Phone"
      value={phone}
      onChange={(e) => {
        setPhone(e.target.value);
        if (errors.phone) validate();
      }}
    />
    <p className="text-red-500 text-sm mb-2 min-h-[1.25rem]">
  {errors.phone || '\u00A0'}
</p>

    <div className="flex flex-col sm:flex-row sm:justify-center gap-3 mt-4">
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
        type="submit"
      >
        {editContact ? 'Update' : 'Add'}
      </button>
      <button
        className='bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg transition'
        type="button"
        onClick={() => {
          setName('');
          setEmail('');
          setPhone('');
          setErrors({ name: '', email: '', phone: '' });
            if (editContact) onCancel();
            toast.dismiss();
            toast.success('Form cleared successfully!');
        }}
         disabled={!canClear}
      >
        Clear
      </button>
      {editContact && (
        <button
          onClick={() => {
            onCancel();
            setErrors({ name: '', email: '', phone: '' });
          }}
          type="button"
          className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg transition"
        >
          Cancel
        </button>
      )}
    </div>
  </form>
</div>

  );
}
