const { Job, Company } = require('../models');

exports.createJob = async (req, res) => {
    try {
        const { title, description, requirements, category, location, salaryRange } = req.body;

        // Assuming the user is an employer and has a company
        const company = await Company.findOne({ where: { userId: req.user.id } });
        if (!company) {
            return res.status(403).json({ message: 'Solo las empresas pueden publicar empleos' });
        }

        const job = await Job.create({
            title,
            description,
            requirements,
            category,
            location,
            salaryRange,
            companyId: company.id
        });

        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.findAll({
            include: [{ model: Company, attributes: ['name', 'industry'] }],
            where: { status: 'open' },
            order: [['createdAt', 'DESC']]
        });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findByPk(req.params.id, {
            include: [{ model: Company }]
        });
        if (!job) return res.status(404).json({ message: 'Empleo no encontrado' });
        res.json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
