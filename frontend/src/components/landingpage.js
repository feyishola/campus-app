import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const text = "Explore the Nigerian Defence Academy";
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <div className="min-h-screen bg-green-900 text-white flex flex-col items-center">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center p-4 max-w-6xl">
        <img src="/NDA-192.png" alt="NDA Logo" className="h-12" />
        <button
          className="bg-yellow-500 text-green-900 font-semibold px-6 py-2 rounded-lg"
          onClick={() => navigate("/auth")}
        >
          Sign In
        </button>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mt-20 px-6 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{displayText}</h1>
        <p className="text-lg md:text-xl mb-6">
          Get detailed information about every building in the academy and
          locate them on an interactive map.
        </p>
        <button
          className="bg-yellow-500 text-green-900 text-lg font-semibold px-8 py-3 rounded-lg"
          onClick={() => navigate("/auth")}
        >
          Get Started
        </button>
      </section>
    </div>
  );
};

export default LandingPage;
