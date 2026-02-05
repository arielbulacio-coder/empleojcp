import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User,
    Briefcase,
    GraduationCap,
    Plus,
    Trash2,
    ChevronRight,
    ChevronLeft,
    Download,
    Eye,
    Layout,
    Type,
    Phone,
    Mail,
    MapPin,
    Globe
} from 'lucide-react';

const CVCreator = () => {
    const [step, setStep] = useState(1);
    const [cvData, setCvData] = useState({
        personal: { name: '', title: '', email: '', phone: '', location: '', website: '', description: '' },
        experience: [],
        education: [],
        skills: [],
        languages: []
    });

    const [preview, setPreview] = useState(false);

    const handlePersonalChange = (e) => {
        const { name, value } = e.target;
        setCvData(prev => ({ ...prev, personal: { ...prev.personal, [name]: value } }));
    };

    const addExperience = () => {
        setCvData(prev => ({
            ...prev,
            experience: [...prev.experience, { id: Date.now(), company: '', role: '', period: '', description: '' }]
        }));
    };

    const updateExperience = (id, field, value) => {
        setCvData(prev => ({
            ...prev,
            experience: prev.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
        }));
    };

    const removeExperience = (id) => {
        setCvData(prev => ({ ...prev, experience: prev.experience.filter(exp => exp.id !== id) }));
    };

    const addEducation = () => {
        setCvData(prev => ({
            ...prev,
            education: [...prev.education, { id: Date.now(), school: '', degree: '', year: '' }]
        }));
    };

    const updateEducation = (id, field, value) => {
        setCvData(prev => ({
            ...prev,
            education: prev.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu)
        }));
    };

    const removeEducation = (id) => {
        setCvData(prev => ({ ...prev, education: prev.education.filter(edu => edu.id !== id) }));
    };

    const addSkill = (skill) => {
        if (skill && !cvData.skills.includes(skill)) {
            setCvData(prev => ({ ...prev, skills: [...prev.skills, skill] }));
        }
    };

    const removeSkill = (skill) => {
        setCvData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
    };

    const steps = [
        { id: 1, title: 'Datos Personales', icon: User },
        { id: 2, title: 'Experiencia Laboral', icon: Briefcase },
        { id: 3, title: 'Educación y Formación', icon: GraduationCap },
        { id: 4, title: 'Habilidades y Otros', icon: Layout }
    ];

    return (
        <div className="pt-24 min-h-screen bg-gray-50 pb-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900">Creador de CV</h1>
                        <p className="text-gray-500 font-medium">Diseñá un perfil profesional de alto impacto de forma gratuita.</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setPreview(!preview)}
                            className="bg-white text-gray-700 px-6 py-3 rounded-xl font-bold border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center gap-2"
                        >
                            {preview ? <Type size={18} /> : <Eye size={18} />}
                            {preview ? 'Editar Datos' : 'Vista Previa'}
                        </button>
                        <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all flex items-center gap-2">
                            <Download size={18} />
                            Descargar PDF
                        </button>
                    </div>
                </div>

                {/* Progress Bar */}
                {!preview && (
                    <div className="flex justify-between items-center mb-12 bg-white p-4 rounded-3xl shadow-sm border border-gray-100 overflow-x-auto">
                        {steps.map((s, idx) => (
                            <div key={s.id} className="flex items-center group">
                                <div className={`flex items-center gap-3 px-6 py-2 rounded-2xl transition-all ${step === s.id ? 'bg-primary text-white shadow-lg shadow-primary/20' :
                                        step > s.id ? 'text-green-600 bg-green-50' : 'text-gray-400'
                                    }`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step === s.id ? 'bg-white text-primary' :
                                            step > s.id ? 'bg-green-600 text-white' : 'bg-gray-100'
                                        }`}>
                                        {s.id}
                                    </div>
                                    <span className="font-bold whitespace-nowrap">{s.title}</span>
                                </div>
                                {idx < steps.length - 1 && <div className="w-12 h-px bg-gray-100 mx-4 hidden lg:block"></div>}
                            </div>
                        ))}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Form Content */}
                    <div className={`${preview ? 'lg:col-span-12' : 'lg:col-span-12'}`}>
                        <AnimatePresence mode="wait">
                            {preview ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    className="bg-white rounded-none shadow-2xl p-12 max-w-4xl mx-auto min-h-[11in] border border-gray-200 print:shadow-none"
                                    id="cv-preview"
                                >
                                    <div className="flex flex-col md:flex-row gap-8 border-b-4 border-primary pb-8 mb-8">
                                        <div className="flex-1">
                                            <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter mb-2">{cvData.personal.name || 'TU NOMBRE COMPLETO'}</h1>
                                            <h2 className="text-xl font-bold text-primary tracking-widest uppercase">{cvData.personal.title || 'TU PROFESIÓN O PUESTO'}</h2>
                                        </div>
                                        <div className="space-y-1 text-sm text-gray-500 font-medium">
                                            <div className="flex items-center gap-2"><Mail size={14} className="text-primary" /> {cvData.personal.email || 'correo@ejemplo.com'}</div>
                                            <div className="flex items-center gap-2"><Phone size={14} className="text-primary" /> {cvData.personal.phone || '+54 11 0000-0000'}</div>
                                            <div className="flex items-center gap-2"><MapPin size={14} className="text-primary" /> {cvData.personal.location || 'José C. Paz, Buenos Aires'}</div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-12 gap-12">
                                        <div className="col-span-12 md:col-span-8 space-y-8">
                                            <section>
                                                <h3 className="text-lg font-black text-gray-900 border-b-2 border-gray-100 pb-2 mb-4 uppercase tracking-widest flex items-center gap-2">
                                                    PERFIL PROFESIONAL
                                                </h3>
                                                <p className="text-gray-600 leading-relaxed italic">
                                                    {cvData.personal.description || 'Escribí aquí un resumen corto sobre tu perfil, motivación y qué valor aportás a las empresas.'}
                                                </p>
                                            </section>

                                            <section>
                                                <h3 className="text-lg font-black text-gray-900 border-b-2 border-gray-100 pb-2 mb-4 uppercase tracking-widest flex items-center gap-2">
                                                    EXPERIENCIA LABORAL
                                                </h3>
                                                <div className="space-y-6">
                                                    {cvData.experience.length > 0 ? cvData.experience.map(exp => (
                                                        <div key={exp.id}>
                                                            <div className="flex justify-between items-start mb-1">
                                                                <h4 className="font-bold text-gray-800 uppercase">{exp.role || 'Puesto'}</h4>
                                                                <span className="text-xs font-bold text-primary bg-primary/5 px-2 py-0.5 rounded uppercase">{exp.period || 'Periodo'}</span>
                                                            </div>
                                                            <div className="text-sm font-black text-gray-500 mb-2 tracking-widest">{exp.company || 'Empresa'}</div>
                                                            <p className="text-sm text-gray-600 whitespace-pre-line">{exp.description}</p>
                                                        </div>
                                                    )) : <p className="text-gray-300 text-sm">Carga tu experiencia laboral para verla aquí.</p>}
                                                </div>
                                            </section>
                                        </div>

                                        <div className="col-span-12 md:col-span-4 space-y-8">
                                            <section>
                                                <h3 className="text-lg font-black text-gray-900 border-b-2 border-gray-100 pb-2 mb-4 uppercase tracking-widest flex items-center gap-2">
                                                    EDUCACIÓN
                                                </h3>
                                                <div className="space-y-4">
                                                    {cvData.education.length > 0 ? cvData.education.map(edu => (
                                                        <div key={edu.id}>
                                                            <h4 className="font-bold text-gray-800 text-sm uppercase">{edu.degree || 'Título'}</h4>
                                                            <div className="text-xs font-bold text-primary mb-1">{edu.school}</div>
                                                            <div className="text-[10px] text-gray-400 font-bold tracking-widest">{edu.year}</div>
                                                        </div>
                                                    )) : <p className="text-gray-300 text-sm">Carga tu formación académica.</p>}
                                                </div>
                                            </section>

                                            <section>
                                                <h3 className="text-lg font-black text-gray-900 border-b-2 border-gray-100 pb-2 mb-4 uppercase tracking-widest flex items-center gap-2">
                                                    HABILIDADES
                                                </h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {cvData.skills.length > 0 ? cvData.skills.map(skill => (
                                                        <span key={skill} className="px-3 py-1 bg-gray-900 text-white text-[10px] font-black uppercase tracking-tighter rounded">
                                                            {skill}
                                                        </span>
                                                    )) : <p className="text-gray-300 text-sm">Agregá tus habilidades técnicas.</p>}
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key={step}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 mb-8"
                                >
                                    {step === 1 && (
                                        <div className="space-y-6">
                                            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                                <User className="text-primary" />
                                                Tus Datos Personales
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">Nombre Completo</label>
                                                    <input
                                                        name="name"
                                                        value={cvData.personal.name}
                                                        onChange={handlePersonalChange}
                                                        className="w-full bg-gray-50 border-none rounded-2xl py-3 px-6 focus:ring-2 focus:ring-primary/20 font-medium"
                                                        placeholder="Ej: Juan Carlos Paz"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">Título Profesional</label>
                                                    <input
                                                        name="title"
                                                        value={cvData.personal.title}
                                                        onChange={handlePersonalChange}
                                                        className="w-full bg-gray-50 border-none rounded-2xl py-3 px-6 focus:ring-2 focus:ring-primary/20 font-medium"
                                                        placeholder="Ej: Auxiliar Administrativo"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">Email</label>
                                                    <input
                                                        name="email"
                                                        value={cvData.personal.email}
                                                        onChange={handlePersonalChange}
                                                        className="w-full bg-gray-50 border-none rounded-2xl py-3 px-6 focus:ring-2 focus:ring-primary/20 font-medium"
                                                        placeholder="correo@ejemplo.com"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">Teléfono</label>
                                                    <input
                                                        name="phone"
                                                        value={cvData.personal.phone}
                                                        onChange={handlePersonalChange}
                                                        className="w-full bg-gray-50 border-none rounded-2xl py-3 px-6 focus:ring-2 focus:ring-primary/20 font-medium"
                                                        placeholder="+54 11 ...."
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">Perfil (Sobre mí)</label>
                                                <textarea
                                                    name="description"
                                                    value={cvData.personal.description}
                                                    onChange={handlePersonalChange}
                                                    rows="4"
                                                    className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary/20 font-medium leading-relaxed"
                                                    placeholder="Un resumen corto de quién sos y qué buscás..."
                                                ></textarea>
                                            </div>
                                        </div>
                                    )}

                                    {step === 2 && (
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-center mb-6">
                                                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                                    <Briefcase className="text-primary" />
                                                    Experiencia Laboral
                                                </h3>
                                                <button
                                                    onClick={addExperience}
                                                    className="bg-primary/5 text-primary px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-primary/10 transition-all"
                                                >
                                                    <Plus size={18} /> Agregar Trabajo
                                                </button>
                                            </div>

                                            <div className="space-y-8">
                                                {cvData.experience.map((exp, idx) => (
                                                    <div key={exp.id} className="p-6 bg-gray-50 rounded-3xl border border-gray-100 relative group">
                                                        <button
                                                            onClick={() => removeExperience(exp.id)}
                                                            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 hover:bg-white rounded-lg transition-all"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                                            <div>
                                                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">Empresa</label>
                                                                <input
                                                                    value={exp.company}
                                                                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                                                                    className="w-full bg-white border-none rounded-2xl py-3 px-6 focus:ring-2 focus:ring-primary/20 font-medium shadow-sm"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">Puesto</label>
                                                                <input
                                                                    value={exp.role}
                                                                    onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                                                                    className="w-full bg-white border-none rounded-2xl py-3 px-6 focus:ring-2 focus:ring-primary/20 font-medium shadow-sm"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">Periodo (Ej: 2020 - 2022)</label>
                                                            <input
                                                                value={exp.period}
                                                                onChange={(e) => updateExperience(exp.id, 'period', e.target.value)}
                                                                className="w-full bg-white border-none rounded-2xl py-3 px-6 focus:ring-2 focus:ring-primary/20 font-medium shadow-sm mb-4"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">Descripción de tareas</label>
                                                            <textarea
                                                                value={exp.description}
                                                                onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                                                                rows="3"
                                                                className="w-full bg-white border-none rounded-2xl py-3 px-6 focus:ring-2 focus:ring-primary/20 font-medium shadow-sm"
                                                            ></textarea>
                                                        </div>
                                                    </div>
                                                ))}
                                                {cvData.experience.length === 0 && (
                                                    <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-3xl">
                                                        <p className="text-gray-400 font-medium">No has agregado ninguna experiencia todavía.</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {step === 3 && (
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-center mb-6">
                                                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                                    <GraduationCap className="text-primary" />
                                                    Educación y Formación
                                                </h3>
                                                <button
                                                    onClick={addEducation}
                                                    className="bg-primary/5 text-primary px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-primary/10 transition-all"
                                                >
                                                    <Plus size={18} /> Agregar Estudio
                                                </button>
                                            </div>

                                            <div className="space-y-6">
                                                {cvData.education.map((edu) => (
                                                    <div key={edu.id} className="p-6 bg-gray-50 rounded-3xl border border-gray-100 relative">
                                                        <button
                                                            onClick={() => removeEducation(edu.id)}
                                                            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 hover:bg-white rounded-lg transition-all"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                            <div>
                                                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">Institución / Colegio</label>
                                                                <input
                                                                    value={edu.school}
                                                                    onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                                                                    className="w-full bg-white border-none rounded-2xl py-3 px-6 shadow-sm font-medium"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">Título / Carrera</label>
                                                                <input
                                                                    value={edu.degree}
                                                                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                                                                    className="w-full bg-white border-none rounded-2xl py-3 px-6 shadow-sm font-medium"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {step === 4 && (
                                        <div className="space-y-6">
                                            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                                <Layout className="text-primary" />
                                                Habilidades y Aptitudes
                                            </h3>

                                            <div>
                                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 block ml-1">Tecnologías o Habilidades (Presioná Enter)</label>
                                                <input
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            addSkill(e.target.value);
                                                            e.target.value = '';
                                                        }
                                                    }}
                                                    className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary/20 font-medium mb-4"
                                                    placeholder="Ej: Excel, Atención al Cliente, SAP, Inglés..."
                                                />
                                                <div className="flex flex-wrap gap-2">
                                                    {cvData.skills.map(skill => (
                                                        <span key={skill} className="flex items-center gap-2 px-4 py-2 bg-primary/5 text-primary font-bold rounded-xl text-sm">
                                                            {skill}
                                                            <button onClick={() => removeSkill(skill)}><Trash2 size={14} /></button>
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {!preview && (
                            <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                                <button
                                    onClick={() => setStep(s => Math.max(1, s - 1))}
                                    disabled={step === 1}
                                    className="flex items-center gap-2 px-8 py-3 rounded-2xl font-bold text-gray-400 hover:text-gray-900 disabled:opacity-30 disabled:hover:text-gray-400 transition-all"
                                >
                                    <ChevronLeft size={20} />
                                    Anterior
                                </button>
                                <button
                                    onClick={() => {
                                        if (step === steps.length) {
                                            setPreview(true);
                                        } else {
                                            setStep(s => s + 1);
                                        }
                                    }}
                                    className="bg-primary text-white flex items-center gap-2 px-10 py-3 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all"
                                >
                                    {step === steps.length ? 'Finalizar y Ver' : 'Siguiente Paso'}
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CVCreator;
