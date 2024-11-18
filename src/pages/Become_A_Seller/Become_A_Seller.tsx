import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Become_A_Seller = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: '',
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit form data to the backend or API
    // For now, we'll just log the data to the console
    console.log(formData);
    // Navigate to a confirmation page or show a success message
    navigate('/seller-dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-5">Become a Seller</h1>
      <p className="mb-5 text-gray-600">
        Fill out the form below to apply to become a seller. We will review your application and get back to you soon.
      </p>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows={5}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default Become_A_Seller;