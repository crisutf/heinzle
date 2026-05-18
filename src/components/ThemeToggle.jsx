import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ isDark, toggle }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggle}
            className="fixed top-6 right-6 z-50 p-3 rounded-full bg-[var(--color-card)] border border-[var(--color-border)] shadow-lg"
        >
            {isDark ? (
                <Sun size={20} className="text-[var(--color-accent)]" />
            ) : (
                <Moon size={20} className="text-[var(--color-accent)]" />
            )}
        </motion.button>
    );
};

export default ThemeToggle;
