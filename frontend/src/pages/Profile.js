import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Profile.css";

const API_KEY = "b0bca82a487a5f101e8c79764175c25e"; // ✅ Your Weather API Key

const WeatherCard = ({ weather, city }) => {
    return (
        <div className="weather-card">
            <h3>Weather in {city}</h3>
            {weather ? (
                <>
                    <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
                    <p><strong>Condition:</strong> {weather.weather[0].description}</p>
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="Weather Icon" />
                </>
            ) : (
                <p>Loading weather...</p>
            )}
        </div>
    );
};

const Profile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [weather, setWeather] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({ username: "", email: "", city: "", role: "" });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) throw new Error("No token found, please log in again.");

                const response = await fetch("http://localhost:5000/api/auth/profile", {
                    method: "GET",
                    headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
                    credentials: "include",
                });

                if (!response.ok) throw new Error("Failed to fetch profile");

                const data = await response.json();
                setUser(data);
                setEditForm(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchProfile();
    }, []);

    useEffect(() => {
        if (user && user.city) {
            const fetchWeather = async () => {
                try {
                    const response = await fetch(
                        `https://api.openweathermap.org/data/2.5/weather?q=${user.city}&appid=${API_KEY}&units=metric`
                    );
                    if (!response.ok) throw new Error("Failed to fetch weather data");

                    const data = await response.json();
                    setWeather(data);
                } catch (err) {
                    console.error("Weather API Error:", err);
                }
            };

            fetchWeather();
        }
    }, [user]);

    const handleEdit = () => setIsEditing(true);
    const handleInputChange = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value });

    const handleSave = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:5000/api/profile/update-profile", {
                method: "PUT",
                headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
                body: JSON.stringify(editForm),
                credentials: "include",
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Failed to update profile");
            setUser(result);
            setIsEditing(false);
            alert("Profile updated successfully!");
        } catch (err) {
            alert(err.message);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate("/login");
    };

    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!user) return <p>Loading profile...</p>;

    return (
        <div className="profile-container">
            <Navbar />

            <div className="profile-box">
                <h2>Welcome, {user.username}!</h2>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>City:</strong> {user.city}</p>
                <p><strong>Role:</strong> {user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
                <button className="edit-btn" onClick={handleEdit}>Edit Profile</button>
            </div>

            {isEditing && (
                <div className="edit-modal">
                    <div className="edit-modal-content">
                        <h3>Edit Profile</h3>
                        <input type="text" name="username" value={editForm.username} onChange={handleInputChange} placeholder="Username" />
                        <input type="email" name="email" value={editForm.email} onChange={handleInputChange} placeholder="Email" />
                        <input type="text" name="city" value={editForm.city} onChange={handleInputChange} placeholder="City" />
                        <select name="role" value={editForm.role} onChange={handleInputChange}>
                            <option value="user">User</option>
                            <option value="farmer">Farmer</option>
                        </select>
                        <button onClick={handleSave}>Save</button>
                        <button onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                </div>
            )}

            {/* Weather Info Card */}
            {user.city && <WeatherCard weather={weather} city={user.city} />}

            {/* Logout Button */}
            <div className="logout-container">
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>

            <Footer />
        </div>
    );
};

export default Profile;
