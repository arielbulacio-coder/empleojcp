import React, { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, Filter, ChevronRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { jobService } from '../services/mockService';

const JobsPage = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedJob, setSelectedJob] = useState(null);
    const [applied, setApplied] = useState({});

    useEffect(() => {
        jobService.getJobs().then(data => {
            setJobs(data);
            setLoading(false);
        });
    }, []);

    const handleApply = (jobId) => {
        jobService.applyToJob({ jobId, userId: 'user123' }).then(() => {
            setApplied(prev => ({ ...prev, [jobId]: true }));
            // In a real app, we'd wait for API response
        });
    };

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="pt-24 min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row gap-8">

                    {/* Sidebar Filters */}
                    <aside className="w-full md:w-64 space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Filter size={18} className="text-primary" />
                                Filtros
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-2">Categoría</label>
                                    <select className="w-full bg-gray-50 border-none rounded-lg text-sm focus:ring-primary">
                                        <option>Todas las categorías</option>
                                        <option>Administración</option>
                                        <option>Ventas</option>
                                        <option>Industria</option>
                                        <option>Logística</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-2">Tipo de jornada</label>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-sm text-gray-600">
                                            <input type="checkbox" className="rounded text-primary focus:ring-primary" checked readOnly />
                                            Full-time
                                        </label>
                                        <label className="flex items-center gap-2 text-sm text-gray-600">
                                            <input type="checkbox" className="rounded text-primary focus:ring-primary" />
                                            Part-time
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                            <h4 className="font-bold text-primary mb-2">¿Necesitás ayuda?</h4>
                            <p className="text-sm text-primary/70 mb-4">Nuestro equipo de orientación laboral está para ayudarte a armar tu CV.</p>
                            <button className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
                                Consultar ahora <ChevronRight size={14} />
                            </button>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 space-y-4">
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Buscar por puesto o palabra clave..."
                                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-all font-medium text-gray-700"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl text-gray-500 text-sm font-medium">
                                <MapPin size={18} />
                                José C. Paz
                            </div>
                        </div>

                        <div className="space-y-4">
                            {loading ? (
                                <div className="h-40 flex items-center justify-center text-gray-500">Cargando empleos...</div>
                            ) : filteredJobs.length > 0 ? (
                                filteredJobs.map((job) => (
                                    <motion.div
                                        layout
                                        key={job.id}
                                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
                                        onClick={() => setSelectedJob(job)}
                                    >
                                        <div className="flex flex-col md:flex-row justify-between gap-4">
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="px-2 py-0.5 bg-indigo-50 text-primary text-xs font-bold rounded-full uppercase tracking-wider">
                                                        {job.category}
                                                    </span>
                                                    <span className="text-xs text-gray-400 font-medium">• {job.posted}</span>
                                                </div>
                                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">{job.title}</h3>
                                                <div className="flex items-center gap-4 mt-2 text-gray-500 font-medium text-sm">
                                                    <div className="flex items-center gap-1">
                                                        <Briefcase size={16} />
                                                        {job.company}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <MapPin size={16} />
                                                        {job.location}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-end justify-between text-right">
                                                <div className="text-primary font-bold">{job.salary}</div>
                                                <div className="text-xs text-gray-400 font-medium bg-gray-50 px-3 py-1 rounded-full border border-gray-100 uppercase tracking-tighter">
                                                    {job.type}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="bg-white p-12 rounded-2xl text-center text-gray-500 border border-dashed border-gray-200">
                                    No se encontraron empleos que coincidan con tu búsqueda.
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>

            {/* Detail Slide-over / Modal */}
            <AnimatePresence>
                {selectedJob && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedJob(null)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white z-[70] shadow-2xl p-8 overflow-y-auto"
                        >
                            <button
                                onClick={() => setSelectedJob(null)}
                                className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <ChevronRight size={24} className="rotate-180" />
                            </button>

                            <div className="pt-8">
                                <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-bold rounded-full mb-4 inline-block">
                                    {selectedJob.category}
                                </span>
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedJob.title}</h2>
                                <div className="flex items-center gap-4 text-gray-500 font-semibold mb-8">
                                    <div className="flex items-center gap-1">
                                        <Briefcase size={20} className="text-primary/60" />
                                        {selectedJob.company}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin size={20} className="text-primary/60" />
                                        {selectedJob.location}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="bg-gray-50 p-4 rounded-xl">
                                        <div className="text-sm text-gray-400 font-medium">Salario ofrecido</div>
                                        <div className="text-lg font-bold text-gray-900">{selectedJob.salary}</div>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl">
                                        <div className="text-sm text-gray-400 font-medium">Jornada laboral</div>
                                        <div className="text-lg font-bold text-gray-900">{selectedJob.type}</div>
                                    </div>
                                </div>

                                <div className="space-y-6 mb-10 text-gray-600 leading-relaxed">
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900 mb-2">Descripción del puesto</h4>
                                        <p>{selectedJob.description}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900 mb-2">Requisitos</h4>
                                        <ul className="list-disc list-inside space-y-1">
                                            {selectedJob.requirements.map((req, i) => (
                                                <li key={i}>{req}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="sticky bottom-0 bg-white pt-4 pb-2">
                                    {applied[selectedJob.id] ? (
                                        <div className="w-full bg-green-50 text-green-700 py-4 rounded-2xl flex items-center justify-center gap-2 font-bold border border-green-100">
                                            <CheckCircle2 size={24} />
                                            ¡Postulación enviada con éxito!
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => handleApply(selectedJob.id)}
                                            className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg hover:bg-primary-dark transition-all shadow-lg hover:shadow-primary/30 transform hover:-translate-y-1"
                                        >
                                            Postularme Ahora
                                        </button>
                                    )}
                                    <p className="text-center text-xs text-gray-400 mt-4 font-medium uppercase tracking-widest">
                                        AL POSTULARTE, LA EMPRESA RECIBIRÁ TU PERFIL AUTOMÁTICAMENTE
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default JobsPage;
