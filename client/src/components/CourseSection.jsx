import React from 'react';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const staticCourses = [
    { id: 1, title: 'Armado de CV', description: 'Aprendé a destacar tus habilidades y experiencia.', duration: '4 semanas', icon: '📄' },
    { id: 2, title: 'Oratoria', description: 'Mejorá tu capacidad de comunicación y expresión oral.', duration: '6 semanas', icon: '🗣️' },
    { id: 3, title: 'Normas de seguridad e higiene', description: 'Conocimientos fundamentales para el trabajo seguro.', duration: '5 semanas', icon: '🛡️' },
    { id: 4, title: 'Habilidades blandas', description: 'Desarrollá empatía, trabajo en equipo y liderazgo.', duration: '4 semanas', icon: '🤝' },
    { id: 5, title: 'Excel para administración', description: 'Dominio de planillas para gestión administrativa.', duration: '8 semanas', icon: '📊' },
    { id: 6, title: 'Word para administración', description: 'Procesamiento de textos profesional.', duration: '4 semanas', icon: '📝' },
];

const CourseSection = () => {
    const [courses, setCourses] = React.useState(staticCourses);

    React.useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/courses');
                if (response.ok) {
                    const data = await response.json();
                    if (data.length > 0) setCourses(data);
                }
            } catch (error) {
                console.log('Using static courses as fallback');
            }
        };
        fetchCourses();
    }, []);

    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Plataforma Educativa</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Capacitate para conseguir tu empleo con nuestros cursos gratuitos diseñados para el mercado laboral actual.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course, index) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group"
                        >
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                {course.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                            <p className="text-gray-600 mb-6">{course.description}</p>

                            <div className="flex items-center justify-between mt-auto">
                                <div className="flex items-center text-gray-400 text-sm">
                                    <Clock size={16} className="mr-1" />
                                    <span>{course.duration}</span>
                                </div>
                                <button className="text-primary font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                                    Saber más <ArrowRight size={18} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <button className="bg-primary/10 text-primary px-8 py-3 rounded-full font-bold hover:bg-primary/20 transition-all">
                        Ver todos los cursos
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CourseSection;
