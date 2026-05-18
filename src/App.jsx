import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Hero from './components/Hero';
import ProjectList from './components/ProjectList';
import Socials from './components/Socials';
import AboutMe from './components/AboutMe';
import ErrorPage from './components/ErrorPage';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';

function MainContent() {
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialDark = saved === 'dark' || (!saved && prefersDark);
    setIsDark(initialDark);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="app min-h-screen transition-colors duration-500 overflow-x-hidden font-sans selection:bg-[var(--color-accent)] selection:text-[var(--color-text)]">
      <ThemeToggle isDark={isDark} toggle={toggleTheme} />
      <div className="snap-section max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
        <Socials />
        <AboutMe />
        <ProjectList />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/403" element={<ErrorPage code={403} title="Acceso Prohibido" message="No tienes permiso para acceder a esta página." />} />
        <Route path="/401" element={<ErrorPage code={401} title="No Autorizado" message="Necesitas iniciar sesión para ver este contenido." />} />
        <Route path="*" element={<ErrorPage code={404} title="Página No Encontrada" message="Lo sentimos, la página que buscas no existe." />} />
      </Routes>
    </Router>
  );
}

export default App;
