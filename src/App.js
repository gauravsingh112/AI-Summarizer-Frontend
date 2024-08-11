import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/NavBarComponents/HomePage';
import About from './components/NavBarComponents/About';
import Contact from './components/NavBarComponents/Contact';
import Navbar from './components/HomePage/Home';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact-us" element={<Contact />} />
            </Routes>
        </Router>
    );
}

export default App;
