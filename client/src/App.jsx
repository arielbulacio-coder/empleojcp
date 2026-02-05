import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CourseSection from './components/CourseSection';
import JobsPage from './pages/JobsPage';
import EmployerDashboard from './pages/EmployerDashboard';
import AuthPage from './pages/AuthPage';
import UserProfile from './pages/UserProfile';
import CVCreator from './pages/CVCreator';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Briefcase, Building2, GraduationCap, Users, ChevronRight, LogOut, User as UserIcon } from 'lucide-react';

const isGitHubPages = window.location.hostname.includes('github.io');
const basePath = isGitHubPages ? '/empleojcp' : '';

const Home = () => {
  return (
    <>
      <Hero />

      {/* Categories / Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">¿Cómo podemos ayudarte?</h2>
            <p className="text-gray-500 font-medium">Servicios integrales para el desarrollo laboral en José C. Paz.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Link to="/empleos" className="block text-center p-8 rounded-3xl bg-indigo-50 hover:bg-indigo-100 transition-all cursor-pointer group hover:-translate-y-1">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:shadow-md transition-all">
                <Briefcase className="text-primary group-hover:scale-110 transition-transform" size={32} />
              </div>
              <h3 className="font-bold text-gray-900 text-lg">Soy Vecino</h3>
              <p className="text-sm text-gray-500 mt-2 font-medium">Busco empleo y capacitación</p>
            </Link>
            <Link to="/empresas" className="block text-center p-8 rounded-3xl bg-sky-50 hover:bg-sky-100 transition-all cursor-pointer group hover:-translate-y-1">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:shadow-md transition-all">
                <Building2 className="text-secondary group-hover:scale-110 transition-transform" size={32} />
              </div>
              <h3 className="font-bold text-gray-900 text-lg">Soy Empresa</h3>
              <p className="text-sm text-gray-500 mt-2 font-medium">Busco talento local para mi negocio</p>
            </Link>
            <Link to="/capacitacion" className="block text-center p-8 rounded-3xl bg-amber-50 hover:bg-amber-100 transition-all cursor-pointer group hover:-translate-y-1">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:shadow-md transition-all">
                <GraduationCap className="text-accent group-hover:scale-110 transition-transform" size={32} />
              </div>
              <h3 className="font-bold text-gray-900 text-lg">Cursos Gratuitos</h3>
              <p className="text-sm text-gray-500 mt-2 font-medium">Especializate y mejorá tu perfil</p>
            </Link>
            <Link to="/perfil" className="block text-center p-8 rounded-3xl bg-emerald-50 hover:bg-emerald-100 transition-all cursor-pointer group hover:-translate-y-1">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:shadow-md transition-all">
                <Users className="text-emerald-500 group-hover:scale-110 transition-transform" size={32} />
              </div>
              <h3 className="font-bold text-gray-900 text-lg">Mi Perfil</h3>
              <p className="text-sm text-gray-500 mt-2 font-medium">Gestioná tus datos y postulaciones</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Empleos Destacados</h2>
              <p className="text-gray-500 font-medium">Las oportunidades más recientes en José C. Paz.</p>
            </div>
            <a href="/empleos" className="text-primary font-bold flex items-center gap-2 hover:underline">
              Ver todas las ofertas <ChevronRight size={20} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Cajero/a de Supermercado', company: 'Cadena Local', salary: '$350.000', type: 'Full-time' },
              { title: 'Técnico Electromecánico', company: 'Fábrica del Norte', salary: 'A convenir', type: 'Full-time' },
              { title: 'Atención al Cliente', company: 'Comercio Céntrico', salary: '$320.000', type: 'Part-time' }
            ].map((job, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all cursor-pointer group">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-primary/5 rounded-xl text-primary">
                    <Briefcase size={24} />
                  </div>
                  <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-md">{job.type}</span>
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-primary transition-colors">{job.title}</h3>
                <p className="text-gray-500 text-sm font-medium mb-4">{job.company}</p>
                <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                  <span className="text-primary font-bold">{job.salary}</span>
                  <button className="text-sm font-bold text-gray-400 group-hover:text-primary transition-colors">Postularse</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CourseSection />

      {/* Stats Board */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -mr-96 -mt-96"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-5xl font-extrabold text-white mb-2">15.000+</div>
              <div className="text-primary-light font-bold uppercase tracking-widest text-sm">Vecinos registrados</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold text-white mb-2">450+</div>
              <div className="text-primary-light font-bold uppercase tracking-widest text-sm">Empresas aliadas</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold text-white mb-2">8.500+</div>
              <div className="text-primary-light font-bold uppercase tracking-widest text-sm">Puestos cubiertos</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">¿Listo para dar el siguiente paso?</h2>
          <p className="text-primary-light text-xl mb-10 max-w-2xl mx-auto font-medium text-opacity-90">
            Unite a la comunidad de empleo más grande de José C. Paz y empezá a construir tu futuro hoy mismo.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-primary px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all border border-transparent">
              Crear mi Perfil
            </button>
            <button className="bg-transparent text-white border border-white/30 px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all">
              Consultar Oficinas
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-gray-950 text-white py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <span className="text-2xl font-bold">Empleos <span className="text-primary-light">José C. Paz</span></span>
              <p className="mt-4 text-gray-400 max-w-sm leading-relaxed">
                Oficina de Empleo Municipal de José C. Paz. Un proyecto dedicado a potenciar el talento local y fortalecer el tejido productivo de nuestra región.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 uppercase tracking-wider text-xs text-gray-500">Navegación</h4>
              <ul className="space-y-4 text-gray-400 font-medium">
                <li><Link to="/empleos" className="hover:text-primary-light transition-colors">Buscador de Empleo</Link></li>
                <li><Link to="/capacitacion" className="hover:text-primary-light transition-colors">Cursos Gratuitos</Link></li>
                <li><Link to="/empresas" className="hover:text-primary-light transition-colors">Portal Empresas</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 uppercase tracking-wider text-xs text-gray-500">Contacto</h4>
              <ul className="space-y-4 text-gray-400 font-medium text-sm">
                <li>📍 Av. Altube 1234, José C. Paz</li>
                <li>📧 empleo@josecpaz.gob.ar</li>
                <li>📞 02320 44-XXXX</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm font-medium">
            <p>© 2024 Municipalidad de José C. Paz. Todos los derechos reservados.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Términos</a>
              <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

const Capacitacion = () => (
  <div className="pt-20">
    <CourseSection />
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router basename={basePath}>
        <div className="min-h-screen bg-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/empleos" element={<JobsPage />} />
            <Route path="/capacitacion" element={<Capacitacion />} />
            <Route path="/empresas" element={<EmployerDashboard />} />
            <Route path="/perfil" element={<UserProfile />} />
            <Route path="/crear-cv" element={<CVCreator />} />
            <Route path="/login" element={<AuthPage type="login" />} />
            <Route path="/registro" element={<AuthPage type="register" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
