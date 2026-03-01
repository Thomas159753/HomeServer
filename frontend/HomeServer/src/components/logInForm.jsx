import { Link } from "react-router-dom";
import { useState } from "react";

export default function LogInForm() {
    const [form, setForm] = useState({email: "", password: ""});
    
    function onChange(e) {
        setForm(form => ({...form, [e.target.name]: e.target.value}))
    };

    async function handleSubmit(e) {
        e.preventDefault();
        
        try {
            const res = await fetch("http://localhost:3112/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: form.email,
                    password: form.password,
                })
            });
            
            // Convert the data to json
            const data = await res.json();
        
            console.log( data)
        }catch(error) {
            console.error(error)
        }
    }
    
    return (
        <>
           <section>
                <div className="flex flex-col items-center justify-center mx-auto md:h-screen">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8 border-2 rounded-md border-black">
                        <h1 className="text-xl font-medium">Sign in to your account</h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit} noValidate>
                            <div>
                                <label className="block mb-2" htmlFor="email">Email:</label>
                                <input
                                    className="block w-full border border-black rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="name@email.com"
                                    onChange={onChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2" htmlFor="password">Password</label>
                                <input
                                    className="block w-full border border-black rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="•••••••"
                                    onChange={onChange}
                                    required
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="remember"
                                            aria-describedby="remember"
                                            type="checkbox"
                                            className="w-4 h-4 border focus:ring-2"
                                            required
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember">Remember me </label>
                                    </div>
                                </div>
                                <Link to="#" className="text-sm font-medium hover:underline">Forgot password?</Link>
                            </div>
                            <button className="w-full border border-black rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-black hover:bg-gray-400 transition-colors duration-300 cursor-pointer" type="submit" >Sign in</button>
                            <p>
                                Don’t have an account yet? <Link className="font-medium hover:underline" to="/register">Sign up</Link>
                            </p>
                            <Link to="/" className="flex items-center px-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                                </svg>
                                <span className="flex-1 ms-3 font-semibold hover:underline">Go Back</span>
                            </Link>
                        </form>
                    </div>
                </div>
           </section>
        </>
    )
}