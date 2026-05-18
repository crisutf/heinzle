import React from 'react';
import { motion } from 'framer-motion';

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

            <div className="max-w-2xl mx-auto">
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
                        A computer scientist who enjoys experimenting and sharing his findings.

                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutMe;
