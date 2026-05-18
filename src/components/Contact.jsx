import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

const Contact = () => {
    return (
        <section className="container mx-auto px-6 py-24 mb-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[var(--color-card)] rounded-3xl p-10 md:p-16 border border-[var(--color-border)] shadow-sm"
            >
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-[var(--color-text)] tracking-tight">
                        ¿Do you have a question?
                    </h2>
                    <p className="text-[var(--color-muted)] mb-10 text-lg font-light">
                        Contact Me!
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <motion.a
                            href="mailto:projectheinzle@gmail.com"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center gap-3 px-8 py-3.5 bg-[var(--color-btn)] text-[var(--color-btn-text)] rounded-xl font-medium hover:opacity-90 transition-colors w-full sm:w-auto justify-center"
                        >
                            <Mail size={20} />
                            projectheinzle@gmail.com
                        </motion.a>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Contact;
