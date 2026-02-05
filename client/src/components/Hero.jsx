import React from 'react';
import { Search, MapPin, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-secondary/20 rounded-full blur-3xl opacity-50"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block py-1 px-4 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6">
                        Oficina de Empleo Municipal
                    </span>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
                        Uniendo puentes en el <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                            distrito y la región
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                        Capacitate para conseguir tu empleo. Ofrecemos herramientas para que los vecinos
                        encuentren oportunidades y las empresas el mejor talento local.
                    </p>

                    <div className="max-w-4xl mx-auto bg-white p-4 rounded-2xl shadow-2xl border border-gray-100 flex flex-col md:flex-row gap-4">
                        <div className="flex-1 flex items-center px-4 py-3 bg-gray-50 rounded-xl border border-transparent focus-within:border-primary/30 transition-all">
                            <Search className="text-gray-400 mr-3" size={20} />
                            <input
                                type="text"
                                placeholder="Puesto, empresa o palabra clave"
                                className="bg-transparent border-none focus:ring-0 w-full text-gray-700"
                            />
                        </div>
                        <div className="flex-1 flex items-center px-4 py-3 bg-gray-50 rounded-xl border border-transparent focus-within:border-primary/30 transition-all">
                            <MapPin className="text-gray-400 mr-3" size={20} />
                            <input
                                type="text"
                                placeholder="José C. Paz, Buenos Aires"
                                defaultValue="José C. Paz"
                                className="bg-transparent border-none focus:ring-0 w-full text-gray-700"
                            />
                        </div>
                        <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-dark transition-all flex items-center justify-center gap-2">
                            <Search size={20} />
                            Buscar Empleo
                        </button>
                    </div>

                    <div className="mt-12 flex flex-wrap justify-center gap-6 text-gray-500">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span>+500 Vacantes activas</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            <span>+120 Empresas registradas</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                            <span>+15 Cursos gratuitos</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;
