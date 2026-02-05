import React, { useState } from 'react';
import {
    Users,
    Briefcase,
    PlusCircle,
    BarChart3,
    Search,
    MoreVertical,
    Eye,
    Edit3,
    Trash2,
    Clock,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EmployerDashboard = () => {
    const [activeTab, setActiveTab] = useState('jobs');
    const [showNewJobModal, setShowNewJobModal] = useState(false);

    // Mock stats
    const stats = [
        { label: 'Avisos Activos', value: '4', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Postulaciones', value: '128', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Entrevistas', value: '12', icon: BarChart3, color: 'text-orange-600', bg: 'bg-orange-50' },
        { label: 'Contrataciones', value: '3', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
    ];

    // Mock my jobs
    const myJobs = [
        { id: '1', title: 'Administrativo Contable', status: 'Activo', applicants: 42, views: 1200, date: '01/02/2024' },
        { id: '2', title: 'Auxiliar de Limpieza', status: 'Cerrado', applicants: 86, views: 2500, date: '15/01/2024' },
        { id: '3', title: 'Vendedor Senior', status: 'Pausado', applicants: 12, views: 450, date: '28/01/2024' },
    ];

    return (
        <div className="pt-24 min-h-screen bg-gray-50 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Area */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900">Panel de Empresa</h1>
                        <p className="text-gray-500 font-medium">Gestioná tus búsquedas y postulantes en José C. Paz.</p>
                    </div>
                    <button
                        onClick={() => setShowNewJobModal(true)}
                        className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
                    >
                        <PlusCircle size={20} />
                        Publicar nueva búsqueda
                    </button>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {stats.map((stat, idx) => (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            key={idx}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                                    <stat.icon size={24} />
                                </div>
                                <div className="text-sm font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">+12%</div>
                            </div>
                            <div className="text-3xl font-extrabold text-gray-900 mb-1">{stat.value}</div>
                            <div className="text-sm font-medium text-gray-400 uppercase tracking-wider">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="flex border-b border-gray-100 px-8">
                        <button
                            onClick={() => setActiveTab('jobs')}
                            className={`py-6 px-4 font-bold relative transition-colors ${activeTab === 'jobs' ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            Mis Búsquedas
                            {activeTab === 'jobs' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full" />}
                        </button>
                        <button
                            onClick={() => setActiveTab('applicants')}
                            className={`py-6 px-4 font-bold relative transition-colors ${activeTab === 'applicants' ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            Postulantes Recientes
                            {activeTab === 'applicants' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full" />}
                        </button>
                    </div>

                    <div className="p-8">
                        {activeTab === 'jobs' ? (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="relative w-full max-w-md">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            placeholder="Filtrar búsquedas..."
                                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl focus:ring-primary/20 font-medium text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="text-gray-400 text-sm font-bold uppercase tracking-wider">
                                                <th className="pb-4 px-4 font-bold">Título de la vacante</th>
                                                <th className="pb-4 px-4 font-bold">Estado</th>
                                                <th className="pb-4 px-4 font-bold text-center">Postulantes</th>
                                                <th className="pb-4 px-4 font-bold text-center">Vistas</th>
                                                <th className="pb-4 px-4 font-bold">Fecha</th>
                                                <th className="pb-4 px-4 font-bold text-right">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {myJobs.map((job) => (
                                                <tr key={job.id} className="hover:bg-gray-50/50 transition-colors group">
                                                    <td className="py-4 px-4">
                                                        <div className="font-bold text-gray-900 group-hover:text-primary transition-colors">{job.title}</div>
                                                        <div className="text-xs text-gray-400 font-medium">ID: #{job.id}00234</div>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tighter shadow-sm border ${job.status === 'Activo' ? 'bg-green-50 text-green-600 border-green-100' :
                                                                job.status === 'Pausado' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                                                    'bg-gray-50 text-gray-400 border-gray-100'
                                                            }`}>
                                                            {job.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-4 text-center">
                                                        <div className="font-bold text-gray-900">{job.applicants}</div>
                                                        <div className="text-[10px] text-primary font-bold uppercase cursor-pointer hover:underline">Ver todos</div>
                                                    </td>
                                                    <td className="py-4 px-4 text-center font-bold text-gray-500">{job.views}</td>
                                                    <td className="py-4 px-4 text-sm font-medium text-gray-500">{job.date}</td>
                                                    <td className="py-4 px-4 text-right">
                                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button className="p-2 hover:bg-white hover:shadow-md rounded-lg text-gray-400 hover:text-primary transition-all"><Eye size={18} /></button>
                                                            <button className="p-2 hover:bg-white hover:shadow-md rounded-lg text-gray-400 hover:text-orange-500 transition-all"><Edit3 size={18} /></button>
                                                            <button className="p-2 hover:bg-white hover:shadow-md rounded-lg text-gray-400 hover:text-red-500 transition-all"><Trash2 size={18} /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-xl flex items-start gap-3">
                                    <AlertCircle className="text-yellow-600 mt-1" size={20} />
                                    <div>
                                        <div className="text-yellow-800 font-bold">Postulaciones sin revisar</div>
                                        <div className="text-yellow-700 text-sm font-medium">Tenés 14 nuevas postulaciones desde la última vez que ingresaste.</div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[1, 2, 3, 4].map((n) => (
                                        <div key={n} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-4 hover:border-primary/30 cursor-pointer transition-all">
                                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-lg">
                                                {['JP', 'MG', 'RA', 'LR'][n - 1]}
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-bold text-gray-900">{['Juan Pérez', 'María García', 'Roberto Arce', 'Luisa Ramos'][n - 1]}</div>
                                                <div className="text-xs text-gray-500 font-medium">Aplicó a: <span className="text-primary">Administrativo Contable</span></div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-[10px] text-gray-400 font-bold uppercase">Hace {n * 2} horas</div>
                                                <button className="text-xs font-bold text-primary hover:underline">Ver perfil</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* New Job Modal (Simulated) */}
            <AnimatePresence>
                {showNewJobModal && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowNewJobModal(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80]"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white z-[90] rounded-3xl p-8 shadow-2xl"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Nueva Búsqueda Laboral</h2>
                            <form className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-sm font-bold text-gray-700 block mb-2">Título de la posición</label>
                                        <input type="text" className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20" placeholder="Ej: Cajero/a" />
                                    </div>
                                    <div>
                                        <label className="text-sm font-bold text-gray-700 block mb-2">Categoría</label>
                                        <select className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20">
                                            <option>Administración</option>
                                            <option>Ventas</option>
                                            <option>Salud</option>
                                            <option>Construcción</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-bold text-gray-700 block mb-2">Descripción del puesto</label>
                                    <textarea rows="4" className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20" placeholder="Escribí los detalles de la oferta..."></textarea>
                                </div>

                                <div className="flex gap-4 justify-end">
                                    <button
                                        type="button"
                                        onClick={() => setShowNewJobModal(false)}
                                        className="px-6 py-3 text-gray-500 font-bold hover:bg-gray-100 rounded-xl transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all"
                                    >
                                        Publicar Aviso
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default EmployerDashboard;
