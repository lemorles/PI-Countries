const { Router } = require("express");
// Importar todos los routers;
const countryRoutes = require("./country");
const activityRoutes = require("./activity");
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
// Configurar los routers
router.use("/countries", countryRoutes);
router.use("/activity", activityRoutes);

// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
