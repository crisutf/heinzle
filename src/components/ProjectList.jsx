import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Navigation, ExternalLink, X, AlertTriangle, Download, HardDrive, Cpu, Settings, FolderSearch, PenTool, Eraser, Activity, Info } from 'lucide-react';

const projects = [
    {
        id: 1,
        name: 'SSD Tweaker Portable',
        description: 'Optimize your SSD for better performance.',
        longDescription: 'SSD Tweaker is a tool designed to optimize and adjust your solid-state drive (SSD) settings in Windows, helping to extend its lifespan and improve system performance.',
        url: 'https://github.com/projectheinzle/SSDTweakerPortable',
        downloadUrl: 'https://github.com/projectheinzle/SSDTweakerPortable/archive/refs/heads/main.zip',
        tags: ['Optimization', 'SSD', 'Portable'],
        icon: <HardDrive size={24} />,
        color: 'text-blue-500',
        bg: 'bg-blue-500/10'
    },
    {
        id: 2,
        name: 'SpaceSniffer Portable',
        description: 'Visualize hard drive space usage.',
        longDescription: 'SpaceSniffer is a disk space visualization tool that allows you to understand how files and folders are structured on your drives using a treemap.',
        url: 'https://github.com/projectheinzle/SpacesnifferPortable',
        downloadUrl: 'https://github.com/projectheinzle/SpacesnifferPortable/archive/refs/heads/main.zip',
        tags: ['Disk', 'Visualization', 'Portable'],
        icon: <FolderSearch size={24} />,
        color: 'text-amber-500',
        bg: 'bg-amber-500/10'
    },
    {
        id: 3,
        name: 'Rufus Portable',
        description: 'Create bootable USB drives easily.',
        longDescription: 'Rufus is a utility that helps format and create bootable USB flash drives, such as USB keys/pendrives, memory sticks, etc.',
        url: 'https://github.com/projectheinzle/RufusPortable',
        downloadUrl: 'https://github.com/projectheinzle/RufusPortable/archive/refs/heads/main.zip',
        tags: ['USB', 'Boot', 'Portable'],
        icon: <Settings size={24} />,
        color: 'text-zinc-500',
        bg: 'bg-zinc-500/10'
    },
    {
        id: 4,
        name: 'MiniTool Partition Wizard Portable',
        description: 'Professional disk partition manager.',
        longDescription: 'One of the best tools for managing hard drive partitions, allowing you to resize, clone, and recover partitions safely.',
        url: 'https://github.com/projectheinzle/MiniToolPartitionWizardPortable',
        downloadUrl: 'https://github.com/projectheinzle/MiniToolPartitionWizardPortable/archive/refs/heads/main.zip',
        tags: ['Partitions', 'Disk', 'Portable'],
        icon: <PenTool size={24} />,
        color: 'text-blue-600',
        bg: 'bg-blue-600/10'
    },
    {
        id: 5,
        name: 'FAT32 Format Portable',
        description: 'Format large drives to FAT32.',
        longDescription: 'A simple and effective tool to format disk drives larger than 32GB to the FAT32 file system, something Windows does not allow natively.',
        url: 'https://github.com/projectheinzle/FAT32FormatPortable',
        downloadUrl: 'https://github.com/projectheinzle/FAT32FormatPortable/archive/refs/heads/main.zip',
        tags: ['Format', 'FAT32', 'Portable'],
        icon: <Eraser size={24} />,
        color: 'text-green-500',
        bg: 'bg-green-500/10'
    },
    {
        id: 6,
        name: 'Dism++ Portable',
        description: 'Advanced Windows cleaning and optimization.',
        longDescription: 'Dism++ is a graphical interface for DISM that allows you to perform deep system cleanups, manage drivers, and optimize Windows easily.',
        url: 'https://github.com/projectheinzle/Dism-Portable',
        downloadUrl: 'https://github.com/projectheinzle/Dism-Portable/archive/refs/heads/main.zip',
        tags: ['System', 'Optimization', 'Portable'],
        icon: <Settings size={24} />,
        color: 'text-cyan-500',
        bg: 'bg-cyan-500/10'
    },
    {
        id: 7,
        name: 'Defraggler Portable',
        description: 'Lightweight and powerful disk defragmenter.',
        longDescription: 'Defraggler allows you to defragment entire hard drives or individual files, improving data access times.',
        url: 'https://github.com/projectheinzle/DefragglerPortable',
        downloadUrl: 'https://github.com/projectheinzle/DefragglerPortable/archive/refs/heads/main.zip',
        tags: ['Disk', 'Defrag', 'Portable'],
        icon: <Activity size={24} />,
        color: 'text-purple-500',
        bg: 'bg-purple-500/10'
    },
    {
        id: 8,
        name: 'CrystalDiskMark Portable',
        description: 'Performance benchmark for your disks.',
        longDescription: 'CrystalDiskMark is a benchmark utility that measures sequential and random read/write speeds for your storage drives.',
        url: 'https://github.com/projectheinzle/CrystalDiskMarkPortable',
        downloadUrl: 'https://github.com/projectheinzle/CrystalDiskMarkPortable/archive/refs/heads/main.zip',
        tags: ['Benchmark', 'Performance', 'Portable'],
        icon: <Cpu size={24} />,
        color: 'text-red-500',
        bg: 'bg-red-500/10'
    },
    {
        id: 9,
        name: 'CrystalDiskInfo Portable',
        description: 'Monitor your hard drive health.',
        longDescription: 'Essential tool for monitoring the health status and temperature of your HDD/SSD drives, detecting potential failures before they happen.',
        url: 'https://github.com/projectheinzle/CrystalDiskInfoPortable',
        downloadUrl: 'https://github.com/projectheinzle/CrystalDiskInfoPortable/archive/refs/heads/main.zip',
        tags: ['Health', 'Monitoring', 'Portable'],
        icon: <Info size={24} />,
        color: 'text-indigo-500',
        bg: 'bg-indigo-500/10'
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
                My Projects/Discoveries
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
                                                Repository
                                            </a>
                                            {selectedProject.downloadUrl && (
                                                <a 
                                                    href={selectedProject.downloadUrl}
                                                    className={`flex-1 flex items-center justify-center gap-3 px-6 py-3 ${selectedProject.modalBg ? 'bg-white/10 text-white border border-white/20' : 'bg-[var(--color-card)] text-[var(--color-text)] border border-[var(--color-border)]'} rounded-xl font-medium hover:opacity-90 transition-colors`}
                                                >
                                                    <Download size={20} />
                                                    Download
                                                </a>
                                            )}
                                            {selectedProject.demoUrl && (
                                                <a 
                                                    href={selectedProject.demoUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`flex-1 flex items-center justify-center gap-3 px-6 py-3 ${selectedProject.modalBg ? 'bg-white/10 text-white border border-white/20' : 'bg-[var(--color-card)] text-[var(--color-text)] border border-[var(--color-border)]'} rounded-xl font-medium hover:opacity-90 transition-colors`}
                                                >
                                                    <ExternalLink size={20} />
                                                    Go to the web
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
