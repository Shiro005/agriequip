import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import {
    BarChart, Newspaper, BellRing, Paperclip, LogOut, ChevronLeft, ChevronRight, PlusCircle,
    ShoppingCart
} from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

export function Dashboard() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [address, setAddress] = useState('');
    const [addressSuggestions, setAddressSuggestions] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [category, setCategory] = useState('');
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        image_url: '',
        rate: '',
        location: '',
        contact_details: '',
        category: '',
        price: '',
    });
    const [popupOpen, setPopupOpen] = useState(false);
    const [error, setError] = useState('');
    const [cart, setCart] = useState([]);

    useEffect(() => {
        if (!user) {
            navigate('/signin');
        } else {
            fetchDashboardData();
            fetchProducts();
        }
    }, [user, navigate]);

    const fetchDashboardData = async () => {
        try {
            const response = await fetch('https://agriequip-lilac.vercel.app/dashboard', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const data = await response.json();
            setDashboardData(data);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await fetch(`https://agriequip-lilac.vercel.app/api/products?location=${selectedAddress}&category=${category}`);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [selectedAddress, category]);

    const handleLogout = () => {
        logout();
        navigate('/signin');
    };

    const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

    const handleAddressChange = async (e) => {
        const input = e.target.value;
        setAddress(input);

        if (input.length > 2) {
            try {
                const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${input}&key=12be6b11f09e44b5aa24081f1091c8d0`);
                const suggestions = await response.json();
                setAddressSuggestions(suggestions.results);
            } catch (error) {
                console.error('Error fetching address suggestions:', error);
            }
        } else {
            setAddressSuggestions([]);
        }
    };

    const handleAddressSelect = (selected) => {
        setSelectedAddress(selected);
        setAddress('');
        setAddressSuggestions([]);
        setError('');
    };

    const handleAddProduct = async () => {
        if (!selectedAddress) {
            setError('Please select a location before posting');
            return;
        }

        try {
            const response = await fetch('https://agriequip-lilac.vercel.app/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ ...newProduct, location: selectedAddress })
            });
            const addedProduct = await response.json();
            setProducts(prevProducts => [...prevProducts, addedProduct]);
            setPopupOpen(false);
            setNewProduct({
                name: '',
                image_url: '',
                rate: '',
                location: '',
                contact_details: '',
                category: '',
                price: '',
            });
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            const response = await fetch(`https://agriequip-lilac.vercel.app/api/products/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                setProducts(products.filter(product => product.id !== productId));
            } else {
                console.error('Failed to delete the product');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleEditProduct = async (productId) => {
        const productToEdit = products.find(product => product.id === productId);
        setNewProduct(productToEdit);
        setPopupOpen(true);
    };

    const handleAddToCart = (product) => {
        setCart(prevCart => [...prevCart, product]);
    };

    return (
        <div className="flex bg-white mt-20 max-h-max">
            {/* Sidebar */}
            <aside className={`transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} bg-white p-4 relative`}>
                <nav className="mt-6 flex flex-col h-full">
                    <button
                        onClick={toggleSidebar}
                        className="bg-green-500 text-white p-2 rounded-full hover:bg-green-700 transition duration-200 flex items-center justify-center mb-5"
                    >
                        {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                    </button>
                    <a className={`flex items-center py-3 px-4 mb-2 rounded-lg transition duration-200 ${isSidebarOpen ? 'hover:bg-green-100' : 'justify-center hover:bg-green-200'}`} href="#">
                        <BarChart className="inline-block" size={24} />
                        {isSidebarOpen && <span className="ml-4">Dashboard</span>}
                    </a>
                    <a
                        className={`flex items-center py-3 px-4 mb-2 rounded-lg transition duration-200 ${isSidebarOpen ? 'hover:bg-green-100' : 'justify-center hover:bg-green-200'}`}
                        href="#"
                        onClick={() => setPopupOpen(true)}
                    >
                        <PlusCircle className="inline-block" size={24} />
                        {isSidebarOpen && <span className="ml-4">Add New Product</span>}
                    </a>
                    <a className={`flex items-center py-3 px-4 mb-2 rounded-lg transition duration-200 ${isSidebarOpen ? 'hover:bg-green-100' : 'justify-center hover:bg-green-200'}`} href="#">
                        <Newspaper className="inline-block" size={24} />
                        {isSidebarOpen && <span className="ml-4">Blogs</span>}
                    </a>
                    <a className={`flex items-center py-3 px-4 mb-2 rounded-lg transition duration-200 ${isSidebarOpen ? 'hover:bg-green-100' : 'justify-center hover:bg-green-200'}`} href="#">
                        <BellRing className="inline-block" size={24} />
                        {isSidebarOpen && <span className="ml-4">Notifications</span>}
                    </a>
                    <a className={`flex items-center py-3 px-4 mb-2 rounded-lg transition duration-200 ${isSidebarOpen ? 'hover:bg-green-100' : 'justify-center hover:bg-green-200'}`} href="#">
                        <Paperclip className="inline-block" size={24} />
                        {isSidebarOpen && <span className="ml-4">Checklists</span>}
                    </a>
                    <div className="mt-auto">
                        <button
                            onClick={handleLogout}
                            className="w-full px-4 py-3 text-center text-white bg-green-500 rounded-lg hover:bg-green-600 transition duration-200 flex items-center justify-center"
                        >
                            <LogOut className="inline-block" size={20} />
                            {isSidebarOpen && <span className="ml-4">Logout</span>}
                        </button>
                    </div>
                </nav>
            </aside>
            {/* Main Content */}
            <main className="flex-1 p-6">
                <h1 className="text-3xl font-semibold mb-4">Welcome, {user.name}!</h1>

                {/* Address Input and Category Filter */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        value={address}
                        onChange={handleAddressChange}
                        className="border p-2 rounded-lg w-full"
                        placeholder="Type your address..."
                    />
                    {addressSuggestions.length > 0 && (
                        <ul className="border mt-2 rounded-lg bg-white absolute z-10 w-full">
                            {addressSuggestions.map((suggestion, index) => (
                                <li
                                    key={index}
                                    className="cursor-pointer p-2 hover:bg-gray-200"
                                    onClick={() => handleAddressSelect(suggestion.formatted)}
                                >
                                    {suggestion.formatted}
                                </li>
                            ))}
                        </ul>
                    )}

                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border p-2 rounded-lg w-full mt-4"
                        placeholder="Filter by category..."
                    />
                </div>

                {/* Product List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {products.map(product => (
                        <div key={product.id} className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                            <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
                            <p className="text-gray-600">Rate: {product.rate}</p>
                            <p className="text-gray-600">Price: ${product.price}/day</p>
                            <p className="text-gray-600">Location: {product.location}</p>
                            <p className="text-gray-600">Contact: {product.contact_details}</p>
                            <p className="text-gray-600">Category: {product.category}</p>
                            <p className="text-gray-600">Owner: {product.owner}</p>
                            <div className="flex mt-4 flex-wrap">
                                {product.owner === user.name && (
                                    <>
                                        <button onClick={() => handleEditProduct(product.id)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center mr-2">
                                            <FontAwesomeIcon icon={faEdit} />
                                            <span className="ml-2">Edit</span>
                                        </button>
                                        <button onClick={() => handleDeleteProduct(product.id)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 flex items-center mr-2">
                                            <FontAwesomeIcon icon={faTrash} />
                                            <span className="ml-2">Delete</span>
                                        </button>
                                    </>
                                )}
                                <button onClick={() => handleAddToCart(product)} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 flex items-center">
                                    <ShoppingCart size={20} />
                                    <span className="ml-2">Add to Cart</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Add/Edit Product Popup */}
                {popupOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-md w-1/2">
                            <h2 className="text-2xl font-semibold mb-4">{newProduct.id ? 'Edit Product' : 'Add New Product'}</h2>
                            {error && <p className="text-red-500 mb-4">{error}</p>}
                            <input
                                type="text"
                                value={newProduct.name}
                                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                className="border p-2 rounded-lg w-full mb-4"
                                placeholder="Product Name"
                            />
                            <input
                                type="text"
                                value={newProduct.image_url}
                                onChange={(e) => setNewProduct({ ...newProduct, image_url: e.target.value })}
                                className="border p-2 rounded-lg w-full mb-4"
                                placeholder="Image URL"
                            />
                            <input
                                type="text"
                                value={newProduct.rate}
                                onChange={(e) => setNewProduct({ ...newProduct, rate: e.target.value })}
                                className="border p-2 rounded-lg w-full mb-4"
                                placeholder="Rate"
                            />
                            <input
                                type="text"
                                value={newProduct.price}
                                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                className="border p-2 rounded-lg w-full mb-4"
                                placeholder="Price per day"
                            />
                            <input
                                type="text"
                                value={newProduct.category}
                                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                className="border p-2 rounded-lg w-full mb-4"
                                placeholder="Category"
                            />
                            <textarea
                                value={newProduct.contact_details}
                                onChange={(e) => setNewProduct({ ...newProduct, contact_details: e.target.value })}
                                className="border p-2 rounded-lg w-full mb-4"
                                placeholder="Contact Details"
                            />
                            <button
                                onClick={handleAddProduct}
                                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                            >
                                {newProduct.id ? 'Update Product' : 'Add Product'}
                            </button>
                            <button
                                onClick={() => setPopupOpen(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300 ml-4"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}