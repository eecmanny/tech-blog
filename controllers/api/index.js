const router = require('express').Router();
const userRoutes = require('./userRoutes');
const dashboardRoutes = require('./dashboardRoutes');

//http://localhost:3001/api/users
router.use('/users', userRoutes);
//http://localhost:3001/api/dashboard
router.use('/dashboard', dashboardRoutes);

module.exports = router;
