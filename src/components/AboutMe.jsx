import React from 'react';
import { motion } from 'framer-motion';
import { Hexagon, Navigation } from 'lucide-react';

const AboutMe = () => {
    return (
        <section className="py-24 px-6 max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-3xl md:text-4xl font-semibold text-[var(--color-text)] tracking-tight mb-4">
                    About me
                </h2>
                <div className="w-12 h-1 bg-[var(--color-text)] mx-auto rounded-full opacity-10" />
            </motion.div>

            <div className="max-w-2xl mx-auto space-y-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-[var(--color-card)] p-8 rounded-3xl border border-[var(--color-border)] shadow-sm space-y-4"
                >
                    <h3 className="text-xl font-semibold text-[var(--color-text)] flex items-center gap-2">
                        Who am I?
                    </h3>
                    <p className="text-[var(--color-muted)] leading-relaxed">
                        An amateur computer enthusiast who enjoys experimenting with electronics, modifying them, and sharing his discoveries.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="bg-[var(--color-card)] p-8 rounded-3xl border border-[var(--color-border)] shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-6"
                >
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Hexagon size={18} className="text-[var(--color-accent)]" />
                            <h4 className="text-sm font-medium text-[var(--color-muted)] uppercase tracking-wider">I like to...</h4>
                        </div>
                        <ul className="space-y-2">
                            {['Install custom firmware', 'Use retro technology', 'Experiment with computers'].map((item, i) => (
                                <li key={i} className="text-lg font-semibold text-[var(--color-text)] flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] opacity-50" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Navigation size={18} className="text-[var(--color-accent)]" />
                            <h4 className="text-sm font-medium text-[var(--color-muted)] uppercase tracking-wider">Technical Skills</h4>
                        </div>
                        <ul className="space-y-2">
                            {['Computer Systems Specialist', 'Video Editing', 'PC & Hardware Repair'].map((item, i) => (
                                <li key={i} className="text-lg font-semibold text-[var(--color-text)] flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] opacity-50" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutMe;
