import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Building2, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const AuthPage = ({ type = 'login' }) => {
    const [isLogin, setIsLogin] = useState(type === 'login');
    const [role, setRole] = useState('seeker');
    const [formData, setFormData] = useState({ email: '', password: '', name: '', companyName: '' });
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const res = await login(formData.email, formData.password);
        if (res.success) {
            navigate(role === 'employer' ? '/empresas' : '/empleos');
        } else {
            setError(res.message);
        }
    };

    return (
        <div className="min-h-screen pt-20 pb-12 flex items-center justify-center bg-gray-50 px-4">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] bg-secondary/10 rounded-full blur-3xl"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 relative z-10"
            >
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">
                        {isLogin ? '¡Bienvenido de nuevo!' : 'Crea tu cuenta'}
                    </h2>
                    <p className="text-gray-500 mt-2 font-medium">
                        {isLogin ? 'Ingresa para gestionar tus búsquedas' : 'Súmate a la comunidad de José C. Paz'}
                    </p>
                </div>

                {!isLogin && (
                    <div className="flex p-1 bg-gray-100 rounded-2xl mb-8">
                        <button
                            onClick={() => setRole('seeker')}
                            className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${role === 'seeker' ? 'bg-white text-primary shadow-sm' : 'text-gray-500'}`}
                        >
                            Soy Vecino
                        </button>
                        <button
                            onClick={() => setRole('employer')}
                            className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${role === 'employer' ? 'bg-white text-secondary shadow-sm' : 'text-gray-500'}`}
                        >
                            Soy Empresa
                        </button>
                    </div>
                )}

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-center gap-3 text-sm font-medium">
                        <AlertCircle size={18} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 mb-2 block">
                                {role === 'seeker' ? 'Nombre completo' : 'Nombre de la empresa'}
                            </label>
                            <div className="relative">
                                {role === 'seeker' ? <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} /> : <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />}
                                <input
                                    type="text"
                                    required
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 font-medium text-gray-700"
                                    placeholder={role === 'seeker' ? "Ej: Juan Pérez" : "Ej: Distribuidora JCP"}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Correo electrónico</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="email"
                                required
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 font-medium text-gray-700"
                                placeholder="correo@ejemplo.com"
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Contraseña</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="password"
                                required
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 font-medium text-gray-700"
                                placeholder="••••••••"
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg mt-6 hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group"
                    >
                        {isLogin ? 'Ingresar' : 'Registrarme'}
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                <div className="mt-8 text-center text-sm font-medium">
                    <span className="text-gray-400">
                        {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
                    </span>
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="ml-2 text-primary hover:underline font-bold"
                    >
                        {isLogin ? 'Regístrate' : 'Inicia sesión'}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default AuthPage;
