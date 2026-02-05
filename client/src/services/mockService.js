// Mock data for the simulation
export const MOCK_JOBS = [
    {
        id: '1',
        title: 'Administrativo Contable',
        company: 'Distribuidora JCP',
        location: 'José C. Paz - Centro',
        category: 'Administración',
        salary: 'A convenir',
        type: 'Full-time',
        posted: 'Hace 2 días',
        description: 'Buscamos administrativo con experiencia en manejo de Excel y sistemas contables. Tareas de facturación y conciliación bancaria.',
        requirements: ['Residir en José C. Paz', 'Secundario completo', 'Conocimientos de Excel intermedio/avanzado']
    },
    {
        id: '2',
        title: 'Operario de Producción',
        company: 'Industrial Norte',
        location: 'José C. Paz - Parque Industrial',
        category: 'Industria',
        salary: '$450.000 + Premios',
        type: 'Full-time',
        posted: 'Hace 1 día',
        description: 'Se requiere personal para línea de montaje y empaque. Turnos rotativos.',
        requirements: ['Experiencia previa en fábrica', 'Disponibilidad horaria']
    },
    {
        id: '3',
        title: 'Vendedor de Salón',
        company: 'Tienda de Ropa JCP',
        location: 'José C. Paz - Av. Altube',
        category: 'Ventas',
        salary: 'Sueldo base + Comisión',
        type: 'Part-time',
        posted: 'Reciente',
        description: 'Vendedor con perfil proactivo para atención al cliente y gestión de inventario.',
        requirements: ['Buena presencia', 'Habilidades de comunicación', 'Disponibilidad sábados']
    },
    {
        id: '4',
        title: 'Repositor Externo',
        company: 'Agencia de Merchandising',
        location: 'José C. Paz y Malvinas',
        category: 'Logística',
        salary: '$380.000',
        type: 'Full-time',
        posted: 'Hace 3 días',
        description: 'Reposición de mercadería en supermercados de la zona.',
        requirements: ['Movilidad propia (preferentemente)', 'Libreta sanitaria al día']
    }
];

export const MOCK_APPLICATIONS = [
    {
        id: 'app1',
        jobId: '1',
        userName: 'Juan Pérez',
        status: 'Pendiente',
        appliedDate: '2024-02-04'
    },
    {
        id: 'app2',
        jobId: '1',
        userName: 'María García',
        status: 'En Revisión',
        appliedDate: '2024-02-03'
    }
];

export const jobService = {
    getJobs: () => Promise.resolve(MOCK_JOBS),
    getJobById: (id) => Promise.resolve(MOCK_JOBS.find(j => j.id === id)),
    applyToJob: (appData) => {
        console.log('Simulating application:', appData);
        return Promise.resolve({ success: true, message: 'Postulación enviada con éxito' });
    }
};
