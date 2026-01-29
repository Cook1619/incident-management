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
        status: 'Active'
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newItem = {
            id: items.length + 1,
            ...formData
        }
        setItems([...items, newItem])
        setFormData({name: '', role: '', status: 'Active'})
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
                            {items.map(({ id, name, role, status }) => (
                                <li key={id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-semibold text-lg text-gray-800">{name}</h3>
                                            <p className="text-sm text-gray-600">{role}</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            status === 'Active' 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-gray-100 text-gray-800'
                                        }`}>
                                            {status}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Form Section - Build your form here */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add New Item</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor='name' className="block text-sm font-medium text-gray-700 mb-1">
                                    Name*
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter name"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor='role' className="block text-sm font-medium text-gray-700 mb-1">
                                    Role*
                                </label>
                                <select
                                    id="role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="">Select a role</option>
                                    <option value="Developer">Developer</option>
                                    <option value="Designer">Designer</option>
                                    <option value="QA Engineer">QA Engineer</option>
                                    <option value="Manager">Manager</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor='status' className="block text-sm font-medium text-gray-700 mb-1">
                                    Status*
                                </label>
                                <select
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>

                            <button 
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
                            >
                                Add Item
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Practice;
