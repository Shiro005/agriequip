import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { AuthContext } from '../context/AuthProvider';

export function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                login({ token: data.token, name: data.name });
                navigate('/dashboard');
            } else {
                setError(data.error || 'Sign-up failed');
            }
        } catch (err) {
            console.error('Error during sign-up:', err);
            setError('An error occurred during sign-up');
        }
    };

    return (
        <section className="bg-gray-50 flex items-center justify-center ">
            <div className="bg-gray-100 flex rounded-2xl shadow-lg p-5 items-center mt-32">
                <div className="md:w-1/2 px-8 md:px-16">
                    <h2 className="font-bold text-2xl text-green-600">Sign <span className='text-gray-900'>Up</span></h2>
                    <p className="text-xs mt-4 text-gray-800">Create an account to get started</p>

                    <form onSubmit={handleSignUp} className="flex flex-col gap-4">
                        <input
                            className="p-2 mt-8 rounded-xl border"
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            className="p-2 rounded-xl border"
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="relative">
                            <input
                                className="p-2 rounded-xl border w-full"
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button className="bg-green-600 rounded-xl text-white py-2 hover:scale-105 duration-300 hover:bg-green-700">
                            Sign Up
                        </button>
                    </form>

                    {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

                    <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
                        <hr className="border-gray-400" />
                        <p className="text-center text-sm">OR</p>
                        <hr className="border-gray-400" />
                    </div>

                    <div className="mt-3 text-xs flex justify-between items-center text-gray-800">
                        <p>Already have an account?</p>
                        <Link to="/signin" className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">Sign In</Link>
                    </div>
                </div>

                <div className="md:block hidden w-1/2">
                    <img className="rounded-2xl" src="https://images.pexels.com/photos/235731/pexels-photo-235731.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Sign Up" />
                </div>
            </div>
        </section>
    );
}