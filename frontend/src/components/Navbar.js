import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md w-full">
      <div className="container mx-auto flex justify-between items-center">
        { }
        <h1 className="text-xl font-bold">Farmer Empowerment</h1>

        { }
        <ul className="flex space-x-4">
          <li><Link to="/home" className="hover:underline">Home</Link></li>
          <li><Link to="/schemes" className="hover:underline">Schemes</Link></li>
          <li><Link to="/market" className="hover:underline">Market</Link></li>
          <li><Link to="/news" className="hover:underline">NewsPage</Link></li>
          <li><Link to="/weather" className="hover:underline">Weather</Link></li>
          <li><Link to="/training" className="hover:underline">Training</Link></li>

          { }
         <button onClick={() => navigate("/profile")} className="your-button-styles">
           Profile
         </button>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
