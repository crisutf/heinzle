import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Navigation, ExternalLink, X, AlertTriangle } from 'lucide-react';

const projects = [
    {
        id: 1,
        name: 'Proyecto 1',
        description: 'Descripción corta de tu proyecto.',
        longDescription: 'Descripción detallada de tu proyecto aquí.',
        url: '#',
        tags: ['Tag 1', 'Tag 2'],
        icon: <Navigation size={24} />,
        color: 'text-[var(--color-text)]',
        bg: 'bg-[var(--color-border)]/30'
    }
];

const ProjectList = () => {
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        if (selectedId) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedId]);

    const selectedProject = projects.find(p => p.id === selectedId);

    return (
        <section id="proyectos" className="container mx-auto px-6 py-24">
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-semibold mb-16 text-center text-[var(--color-text)] tracking-tight"
            >
                Mis Proyectos
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        layoutId={`card-${project.id}`}
                        onClick={() => setSelectedId(project.id)}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group bg-[var(--color-card)] p-8 rounded-3xl border border-[var(--color-border)] shadow-sm hover:shadow-xl flex flex-col justify-between cursor-pointer"
                    >
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <div className={`p-4 rounded-2xl ${project.bg} ${project.color}`}>
                                    {project.icon}
                                </div>
                                <div className="text-[var(--color-muted)] group-hover:text-[var(--color-text)] transition-colors">
                                    <ExternalLink size={20} />
                                </div>
                            </div>
                            
                            <h3 className="text-xl font-semibold mb-3 text-[var(--color-text)]">
                                {project.name}
                            </h3>
                            
                            <p className="text-[var(--color-muted)] mb-6 line-clamp-2 text-sm">
                                {project.description}
                            </p>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-4">
                            {project.tags.slice(0, 2).map(tag => (
                                <span key={tag} className="px-3 py-1 bg-[var(--color-border)]/30 text-[var(--color-muted)] rounded-full text-xs font-medium">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedId && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-md cursor-pointer"
                        />
                        
                        <motion.div
                            layoutId={`card-${selectedId}`}
                            className={`${selectedProject.modalBg || 'bg-[var(--color-card)]'} w-full max-w-2xl rounded-[32px] shadow-2xl relative z-[101] overflow-hidden flex flex-col`}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        >
                            <button 
                                onClick={() => setSelectedId(null)}
                                className={`absolute top-6 right-6 p-2 rounded-full ${selectedProject.modalBg ? 'bg-white/10 text-white/60 hover:text-white' : 'bg-[var(--color-border)]/30 text-[var(--color-muted)] hover:text-[var(--color-text)]'} hover:rotate-90 transition-all duration-300 z-[102]`}
                            >
                                <X size={20} />
                            </button>

                            <div className="p-8 md:p-12 overflow-y-auto max-h-[90vh]">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2, duration: 0.3 }}
                                >
                                    <div className="flex items-start gap-6 mb-8">
                                        <div className={`p-5 rounded-2xl ${selectedProject.modalBg ? 'bg-white/10' : selectedProject.bg} ${selectedProject.modalBg ? 'text-white' : selectedProject.color}`}>
                                            {selectedProject.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className={`text-2xl md:text-3xl font-semibold ${selectedProject.modalBg ? 'text-white' : 'text-[var(--color-text)]'}`}>
                                                {selectedProject.name}
                                            </h3>
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                {selectedProject.tags.map(tag => (
                                                    <span key={tag} className={`px-3 py-1 ${selectedProject.modalBg ? 'bg-white/10 text-white/70' : 'bg-[var(--color-border)]/30 text-[var(--color-muted)]'} rounded-full text-[10px] font-medium uppercase tracking-wider`}>
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <p className={`text-base md:text-lg ${selectedProject.modalBg ? 'text-white/70' : 'text-[var(--color-muted)]'} leading-relaxed font-light`}>
                                            {selectedProject.longDescription}
                                        </p>

                                        {selectedProject.warning && (
                                            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600">
                                                <AlertTriangle size={18} className="shrink-0" />
                                                <p className="text-sm font-medium">
                                                    {selectedProject.warning}
                                                </p>
                                            </div>
                                        )}

                                        <div className={`flex flex-col sm:flex-row gap-4 pt-6 border-t ${selectedProject.modalBg ? 'border-white/10' : 'border-[var(--color-border)]'}`}>
                                            <a 
                                                href={selectedProject.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`flex-1 flex items-center justify-center gap-3 px-6 py-3 ${selectedProject.modalBg ? 'bg-white text-black' : 'bg-[var(--color-btn)] text-[var(--color-btn-text)]'} rounded-xl font-medium hover:opacity-90 transition-colors`}
                                            >
                                                <Github size={20} />
                                                Repositorio
                                            </a>
                                            {selectedProject.demoUrl && (
                                                <a 
                                                    href={selectedProject.demoUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`flex-1 flex items-center justify-center gap-3 px-6 py-3 ${selectedProject.modalBg ? 'bg-white/10 text-white border border-white/20' : 'bg-[var(--color-card)] text-[var(--color-text)] border border-[var(--color-border)]'} rounded-xl font-medium hover:opacity-90 transition-colors`}
                                                >
                                                    <ExternalLink size={20} />
                                                    Ir a la web
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default ProjectList;
