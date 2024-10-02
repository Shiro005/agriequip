// require('dotenv').config();
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

export function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch(`http://localhost:5000/api/users/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                login({ token: data.token, name: data.name });
                navigate('/dashboard');
            } else {
                setError(data.error || 'Sign-in failed');
            }
        } catch (err) {
            console.error('Error during sign-in:', err);
            setError('An error occurred during sign-in');
        }
    };

    return (
        <section className="bg-gray-50 flex items-center justify-center ">
            <div className="bg-gray-100 flex rounded-2xl shadow-lg p-5 items-center mx-auto lg:px-8 mt-32">
                <div className="md:w-1/2 px-8 md:px-16">
                    <h2 className="font-bold text-2xl text-green-600">Sign <span className='text-gray-900'>In</span></h2>
                    <p className="text-xs mt-4 text-[#252525]">If you are already a member, easily log in</p>

                    <form onSubmit={handleSignIn} className="flex flex-col gap-4">
                        <input
                            className="p-2 mt-8 rounded-xl border"
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
                            Login
                        </button>
                    </form>

                    {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

                    <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
                        <hr className="border-gray-400" />
                        <p className="text-center text-sm">OR</p>
                        <hr className="border-gray-400" />
                    </div>

                    <div className="mt-5 text-xs border-b border-[#151515] py-4 text-[#151515]">
                        <a href="#">Forgot your password?</a>
                    </div>

                    <div className="mt-3 text-xs flex justify-between items-center text-[#181818]">
                        <p>Don't have an account?</p>
                        <Link to="/signup" className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">Register</Link>
                    </div>
                </div>

                <div className="md:block hidden w-1/2">
                    <img className="rounded-2xl" src="https://images.pexels.com/photos/20527519/pexels-photo-20527519/free-photo-of-farmers-in-india.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Login" />
                </div>
            </div>
        </section>
    );
}