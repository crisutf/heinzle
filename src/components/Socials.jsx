import React from 'react';
import { motion } from 'framer-motion';
import { Github, Instagram } from 'lucide-react';

const socialLinks = [
    { id: 1, name: 'GitHub', icon: <Github size={22} />, url: 'https://github.com/ProjectHeinzle', color: 'hover:text-[var(--color-text)]' },
    { id: 2, name: 'Instagram', icon: <Instagram size={22} />, url: '#', color: 'hover:text-pink-500' },
];

const Socials = () => {
    return (
        <section className="py-8 flex justify-center">
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                className="flex gap-4 bg-[var(--color-card)] px-6 py-3 rounded-full border border-[var(--color-border)] shadow-sm"
            >
                {socialLinks.map((link) => (
                    <motion.a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -2, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center justify-center w-12 h-12 rounded-full text-[var(--color-muted)] bg-[var(--color-border)]/30 hover:bg-[var(--color-border)]/50 transition-all duration-300 ${link.color}`}
                        title={link.name}
                    >
                        {link.icon}
                    </motion.a>
                ))}
            </motion.div>
        </section>
    );
};

export default Socials;
