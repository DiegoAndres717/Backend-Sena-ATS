const { Router} = require('express');
const { registrarAprendiz, autenticarAprendiz } = require('../controllers/aprendiz');

const router = Router();

router.post('/registrar', registrarAprendiz);
router.post('/login', autenticarAprendiz);

module.exports = router;
