import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Briefcase, FileText, Camera, Save, Target, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const UserProfile = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('perfil');

    return (
        <div className="pt-24 min-h-screen bg-gray-50 pb-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Profile Header */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32"></div>

                    <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                        <div className="relative group">
                            <div className="w-32 h-32 bg-primary/10 rounded-3xl flex items-center justify-center text-primary font-bold text-4xl border-4 border-white shadow-lg overflow-hidden">
                                {user?.name?.[0]?.toUpperCase() || 'U'}
                            </div>
                            <button className="absolute bottom-0 right-0 p-2 bg-white rounded-xl shadow-md border border-gray-100 text-gray-500 hover:text-primary transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                                <Camera size={18} />
                            </button>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-3xl font-bold text-gray-900 mb-1">{user?.name || 'Usuario'}</h1>
                            <p className="text-gray-500 font-medium flex items-center justify-center md:justify-start gap-2">
                                <Target size={16} className="text-primary" />
                                Buscando: Administrativo, Atención al Cliente
                            </p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                                <div className="flex items-center gap-1.5 text-sm text-gray-400 font-medium bg-gray-50 px-3 py-1 rounded-full">
                                    <MapPin size={14} /> José C. Paz
                                </div>
                                <div className="flex items-center gap-1.5 text-sm text-gray-400 font-medium bg-gray-50 px-3 py-1 rounded-full">
                                    <Mail size={14} /> {user?.email}
                                </div>
                            </div>
                        </div>

                        <button className="bg-primary text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all flex items-center gap-2">
                            <Save size={18} />
                            Guardar Cambios
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Navigation Sidebar */}
                    <div className="lg:col-span-1 space-y-4">
                        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-1">
                            {[
                                { id: 'perfil', label: 'Datos Personales', icon: User },
                                { id: 'experiencia', label: 'Experiencia y Educación', icon: Briefcase },
                                { id: 'postulaciones', label: 'Mis Postulaciones', icon: FileText },
                                { id: 'habilidades', label: 'Habilidades', icon: Award }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === tab.id ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'
                                        }`}
                                >
                                    <tab.icon size={20} />
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <div className="bg-indigo-600 rounded-2xl p-6 text-white relative overflow-hidden group cursor-pointer shadow-lg shadow-indigo-200">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150"></div>
                            <h4 className="font-bold text-lg mb-2 relative z-10">¿Tu CV está listo?</h4>
                            <p className="text-white/80 text-sm mb-4 relative z-10">Usa nuestra herramienta de revisión gratuita antes de postularte.</p>
                            <div className="flex items-center gap-2 font-bold text-sm bg-white/20 py-2 px-4 rounded-xl backdrop-blur-sm w-fit">
                                Revisar ahora <FileText size={16} />
                            </div>
                        </div>
                    </div>

                    {/* Form Content */}
                    <div className="lg:col-span-2">
                        <motion.div
                            layout
                            className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
                        >
                            <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                                {activeTab === 'perfil' && 'Información de contacto'}
                                {activeTab === 'experiencia' && 'Trayectoria laboral'}
                                {activeTab === 'postulaciones' && 'Seguimiento de búsquedas'}
                                {activeTab === 'habilidades' && 'Conocimientos técnicos'}
                            </h3>

                            {activeTab === 'perfil' && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">Teléfono</label>
                                            <div className="relative">
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                <input className="w-full bg-gray-50 border-none rounded-2xl py-3 px-12 focus:ring-2 focus:ring-primary/20 font-medium" placeholder="+54 11 ...." />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">Localidad</label>
                                            <div className="relative">
                                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                <input className="w-full bg-gray-50 border-none rounded-2xl py-3 px-12 focus:ring-2 focus:ring-primary/20 font-medium" defaultValue="José C. Paz" />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">Resumen Profesional</label>
                                        <textarea
                                            rows="4"
                                            className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary/20 font-medium leading-relaxed"
                                            placeholder="Contanos sobre tu experiencia y qué tipo de trabajo buscás..."
                                        ></textarea>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'postulaciones' && (
                                <div className="space-y-4">
                                    {[
                                        { title: 'Administrativo Contable', company: 'Distribuidora JCP', date: '04/02/2024', status: 'Enviado' },
                                        { title: 'Vendedor de Salón', company: 'Tienda de Ropa JCP', date: '02/02/2024', status: 'En Revisión' }
                                    ].map((app, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-primary/30 transition-all cursor-pointer group">
                                            <div>
                                                <div className="font-bold text-gray-900 group-hover:text-primary transition-colors">{app.title}</div>
                                                <div className="text-sm text-gray-500 font-medium">{app.company}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className={`text-xs font-bold px-3 py-1 rounded-full border mb-1 ${app.status === 'Enviado' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-orange-50 text-orange-600 border-orange-100'
                                                    }`}>
                                                    {app.status}
                                                </div>
                                                <div className="text-[10px] text-gray-400 font-bold uppercase">{app.date}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab !== 'perfil' && activeTab !== 'postulaciones' && (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                                        <PlusCircle size={32} />
                                    </div>
                                    <p className="text-gray-400 font-medium">Aún no has cargado información en esta sección.</p>
                                    <button className="mt-4 text-primary font-bold hover:underline">Agregar ahora</button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PlusCircle = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
);

export default UserProfile;
