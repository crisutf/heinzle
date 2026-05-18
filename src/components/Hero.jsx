import React from 'react';
import { motion } from 'framer-motion';
const Hero = () => {
    return (
        <section className="flex flex-col items-center justify-center min-h-[70vh] pt-32 pb-16 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-8"
            >
                <div className="w-[300px] h-[300px] rounded-3xl overflow-hidden ring-4 ring-[var(--color-border)] shadow-lg mx-auto bg-[var(--color-bg)]">
                    <img
                        src="https://cdn.crisu.qzz.io/heinzle/P.svg"
                        alt="ProjectHeinzle Logo"
                        className="w-full h-full object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
                    />
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                className="space-y-4"
            >
                <h1 className="text-4xl md:text-6xl font-semibold text-[var(--color-text)] tracking-tight">
                    ProjectHeinzle
                </h1>
                
                <div className="max-w-2xl mx-auto space-y-8">
                    <p className="text-lg md:text-xl text-[var(--color-muted)] font-light leading-relaxed">
                        From firmware fixes to ultimate mods.
                    </p>
                    
                    <div className="flex flex-wrap gap-4 justify-center items-center pt-4">
                        <a 
                            href="#proyectos" 
                            className="px-6 py-2.5 bg-[var(--color-btn)] text-[var(--color-btn-text)] rounded-full font-medium hover:opacity-90 transition-colors shadow-sm"
                        >
                            View Projects
                        </a>
                        <a 
                            href="https://github.com/ProjectHeinzle" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-2.5 bg-[var(--color-card)] text-[var(--color-text)] rounded-full font-medium hover:bg-[var(--color-border)] transition-colors shadow-sm ring-1 ring-[var(--color-border)]"
                        >
                            GitHub
                        </a>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
