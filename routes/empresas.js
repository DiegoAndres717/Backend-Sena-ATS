const { Router} = require('express');
const { registrarEmpresa, autenticarEmpresa } = require('../controllers/empresa');

const router = Router();

router.post('/registrar', registrarEmpresa);
router.post('/login', autenticarEmpresa);

module.exports = router;