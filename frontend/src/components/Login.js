import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login",
                { email, password },
                { withCredentials: true }
            );

            if (res.status === 200) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                alert("Login successful!");
                navigate("/home");
            }
        } catch (error) {
            alert(error.response?.data?.message || "Invalid credentials");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-green-100 relative">
            
            {/* AgriTech Animated Brand Name */}
            <h1 className="absolute top-5 left-5 text-4xl font-extrabold text-green-700 animate-slide-in">
                <span className="text-green-900">Agri</span>Tech
            </h1>

            <div className="bg-white shadow-2xl rounded-3xl flex max-w-5xl w-full overflow-hidden relative animate-fade-in">
                
                {/* Left Side - Login Form */}
                <div className="w-1/2 p-12 flex flex-col justify-center">
                    <h2 className="text-4xl font-bold text-green-700">Welcome Back</h2>
                    <p className="text-gray-600 mb-6">Login to continue</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <input 
                            type="email" 
                            placeholder="Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-green-500 transition-all"
                            required 
                        />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-green-500 transition-all"
                            required 
                        />
                        <button 
                            type="submit" 
                            className="w-full bg-green-600 text-white py-4 rounded-lg text-lg hover:bg-green-700 transition-all"
                        >
                            Login
                        </button>
                    </form>
                    
                    <p className="mt-4 text-sm">New user?  
                        <button 
                            className="text-green-600 ml-1 hover:underline"
                            onClick={() => navigate("/register")}
                        >
                            Register
                        </button>
                    </p>
                </div>


                {/* Right Side - Image */}
                <img 
              src="/farm-landing.jpg" 
              alt="Farm background"
             className="w-full h-full object-cover"
           />


            </div>
        </div>
    );
};

export default Login;
