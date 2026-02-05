const User = require('./User');
const Company = require('./Company');
const Job = require('./Job');
const Course = require('./Course');

// Associations
User.hasOne(Company, { foreignKey: 'userId', onDelete: 'CASCADE' });
Company.belongsTo(User, { foreignKey: 'userId' });

Company.hasMany(Job, { foreignKey: 'companyId', onDelete: 'CASCADE' });
Job.belongsTo(Company, { foreignKey: 'companyId' });

module.exports = {
    User,
    Company,
    Job,
    Course
};
