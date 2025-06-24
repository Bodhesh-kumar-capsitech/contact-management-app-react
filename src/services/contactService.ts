import axios from "axios";
import type { Contact } from "../types/Contact";

const BASE_URL = "http://localhost:5007/api/contacts";

// ✅ Map _id → id
export const getContacts = async (): Promise<Contact[]> => {
  const res = await axios.get(BASE_URL);
  return res.data.map((c: any) => ({
    id: c._id || c.id,
    name: c.name,
    email: c.email,
    phone: c.phone,
  }));
};

export const getContactById = async (id: string): Promise<Contact | null> => {
  try {
    const res = await axios.get(`${BASE_URL}/${id}`);
    const c = res.data;
    return {
      id: c._id || c.id,
      name: c.name,
      email: c.email,
      phone: c.phone,
    };
  } catch (error) {
    console.error("Error fetching contact by ID:", error);
    return null;
  }
};

export const createContact = async (
  contact: Omit<Contact, "id">
): Promise<Contact> => {
  const res = await axios.post(BASE_URL, contact);
  const c = res.data;
  return {
    id: c._id || c.id,
    name: c.name,
    email: c.email,
    phone: c.phone,
  };
};

export const updateContact = async (id: string, contact: Contact): Promise<void> => {
  await axios.put(`${BASE_URL}/${id}`, {
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
  });
};

export const deleteContact = async (id: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`);
};
