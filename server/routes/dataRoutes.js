const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

router.get('/', authMiddleware, dataController.getAllData);
router.get('/analytics', authMiddleware, dataController.getAnalytics);
router.post('/', authMiddleware, adminMiddleware, dataController.addData);
router.put('/:id', authMiddleware, adminMiddleware, dataController.updateData);
router.delete('/:id', authMiddleware, adminMiddleware, dataController.deleteData);

module.exports = router;
