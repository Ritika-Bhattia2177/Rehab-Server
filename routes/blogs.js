const express = require('express');
const router = express.Router();
const blogsController = require('../controllers/blogsController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', blogsController.getAllBlogs);
router.get('/:id', blogsController.getBlogById);
router.post('/', protect, authorize('admin'), blogsController.createBlog);
router.put('/:id', protect, authorize('admin'), blogsController.updateBlog);
router.delete('/:id', protect, authorize('admin'), blogsController.deleteBlog);

module.exports = router;
