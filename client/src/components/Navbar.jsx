import React, { useState, useEffect } from 'react';
import { Menu, X, Briefcase, GraduationCap, User, LogIn, LogOut, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { user, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-3 group">
                        <img
                            src="logo-municipalidad.png"
                            alt="Logo JCP"
                            className={`h-10 md:h-12 w-auto transition-all duration-300 ${scrolled ? 'brightness-100' : 'brightness-100'}`}
                        />
                        <div className="w-px h-8 bg-gray-200 hidden md:block"></div>
                        <div className="flex flex-col leading-tight">
                            <span className={`text-lg md:text-xl font-black tracking-tighter ${scrolled ? 'text-gray-900' : 'text-gray-900'}`}>
                                José C. Paz <span className="text-primary font-bold">EMPLEO</span>
                            </span>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                Ciudad del Aprendizaje
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/empleos" className="text-gray-700 hover:text-primary font-medium transition-colors">Busco Trabajo</Link>
                        <Link to="/empresas" className="text-gray-700 hover:text-primary font-medium transition-colors">Empresas</Link>
                        <Link to="/capacitacion" className="text-gray-700 hover:text-primary font-medium transition-colors flex items-center gap-1">
                            <GraduationCap size={18} />
                            Capacitación
                        </Link>
                        <Link to="/crear-cv" className="text-gray-700 hover:text-primary font-medium transition-colors flex items-center gap-1">
                            <FileText size={18} />
                            Crear CV
                        </Link>
                        <div className="flex items-center space-x-4 ml-4">
                            {user ? (
                                <div className="flex items-center gap-4">
                                    <Link to="/perfil" className="flex items-center gap-2 px-4 py-2 bg-primary/5 text-primary font-bold rounded-full hover:bg-primary/10 transition-all">
                                        <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-xs">
                                            {user.name?.[0]?.toUpperCase()}
                                        </div>
                                        Mi Perfil
                                    </Link>
                                    <button onClick={logout} className="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Cerrar sesión">
                                        <LogOut size={20} />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <Link to="/login" className="flex items-center gap-2 px-4 py-2 text-primary font-semibold hover:bg-primary/5 rounded-full transition-all">
                                        <LogIn size={18} />
                                        Ingresar
                                    </Link>
                                    <Link to="/registro" className="bg-primary text-white px-6 py-2 rounded-full font-semibold hover:bg-primary-dark transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                                        Regístrate
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Mobile Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 p-2">
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 animate-in slide-in-from-top duration-300">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/empleos" className="block px-3 py-2 text-gray-700 hover:bg-primary/5 hover:text-primary rounded-md">Busco Trabajo</Link>
                        <Link to="/empresas" className="block px-3 py-2 text-gray-700 hover:bg-primary/5 hover:text-primary rounded-md">Empresas</Link>
                        <Link to="/capacitacion" className="block px-3 py-2 text-gray-700 hover:bg-primary/5 hover:text-primary rounded-md">Capacitación</Link>
                        <Link to="/crear-cv" className="block px-3 py-2 text-gray-700 hover:bg-primary/5 hover:text-primary rounded-md">Crear CV</Link>
                        <div className="pt-4 border-t border-gray-100 flex flex-col space-y-2 px-3">
                            <Link to="/login" className="w-full text-center py-2 text-primary font-semibold">Ingresar</Link>
                            <Link to="/registro" className="w-full bg-primary text-white text-center py-3 rounded-xl font-semibold">Regístrate</Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
