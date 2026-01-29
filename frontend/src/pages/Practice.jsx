import { useState } from 'react';

// Dummy data for practice
const dummyItems = [
    { id: 1, name: 'Alice Johnson', role: 'Developer', status: 'Active' },
    { id: 2, name: 'Bob Smith', role: 'Designer', status: 'Active' },
    { id: 3, name: 'Charlie Brown', role: 'Manager', status: 'Inactive' },
    { id: 4, name: 'Diana Prince', role: 'Developer', status: 'Active' },
    { id: 5, name: 'Ethan Hunt', role: 'QA Engineer', status: 'Active' },
];

function Practice() {

    const [items, setItems] = useState(dummyItems)
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        status: 'active'
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setItems((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Practice Component</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* List Section - Render dummyItems here */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Item List</h2>

                        <ul className="space-y-3">
                            {items.map((item) => (
                                <li key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                                            <p className="text-sm text-gray-600">{item.role}</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${item.status === 'Active'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {item.status}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Form Section - Build your form here */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add New Item</h2>

                        {/* TODO: Build your form here */}
                        <p className="text-gray-500">
                            <form onSubmit={handleSubmit}>
                                <label htmlFor='name'>Name *</label>
                                <input
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor='role'>Role</label>
                                <select
                                    id="role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                >
                                    <option value="developer">Developer</option>
                                    <option value="manager">Manager</option>
                                    <option value="designer">Designer</option>
                                    <option value="qaEnginer">QA Engineer</option>

                                </select>
                                 <select
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>

                                </select>
                                <button type="submit">Add Item</button>
                            </form>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Practice;
