import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [city, setCity] = useState("");
    const [role, setRole] = useState("user"); // Default role is "user"
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Selected Role:", role);  // Debugging - Check role value
        
        try {
            const res = await axios.post(
                "http://localhost:5000/api/auth/register",
                { username, email, password, city, role },  // Ensure role is sent
                { withCredentials: true }
            );
    
            if (res.status === 201) {
                alert("Registration successful!");
                navigate("/login");
            }
        } catch (error) {
            alert(error.response?.data?.message || "Registration failed");
        }
    };
    

    return (
        <div className="auth-page">
            {/* AgriTech Brand Name */}
            <h1 className="brand-name"><b>AgriTech</b></h1>

            <div className="auth-container">
                {/* Left: Registration Form */}
                <div className="auth-form-box">
                    <h2>Register</h2>
                    <form onSubmit={handleSubmit} className="auth-form">
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />

                        {/* ✅ Dropdown for Role Selection */}
                        <select value={role} onChange={(e) => setRole(e.target.value)} required>
                            <option value="user">User</option>
                            <option value="farmer">Farmer</option>
                        </select>

                        <button type="submit">Register</button>
                    </form>
                    <p>Already have an account? <button className="switch-btn" onClick={() => navigate("/login")}>Login</button></p>
                </div>

                {/* Right: Background Image */}
                <div className="image-box">
                    <img src="/farm-landing.jpg" alt="Farm background" />
                </div>
            </div>
        </div>
    );
};

export default Register;
