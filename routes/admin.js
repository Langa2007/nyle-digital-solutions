// backend/routes/admin.js
import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { Contact, JobApplication, BlogPost, Portfolio, Service } from '../models/index.js';
import { Op } from 'sequelize';

const router = express.Router();

// All routes require admin authentication
router.use(authenticate);
router.use(authorize(['admin', 'staff']));

// Dashboard Stats
router.get('/dashboard/stats', async (req, res) => {
  try {
    const [
      totalContacts,
      newContacts,
      totalApplications,
      pendingApplications,
      totalBlogPosts,
      totalPortfolio,
      totalServices,
    ] = await Promise.all([
      Contact.count(),
      Contact.count({ where: { status: 'new' } }),
      JobApplication.count(),
      JobApplication.count({ where: { status: 'pending' } }),
      BlogPost.count({ where: { status: 'published' } }),
      Portfolio.count({ where: { status: 'published' } }),
      Service.count({ where: { active: true } }),
    ]);

    res.json({
      success: true,
      data: {
        contacts: { total: totalContacts, new: newContacts },
        applications: { total: totalApplications, pending: pendingApplications },
        blog: { total: totalBlogPosts },
        portfolio: { total: totalPortfolio },
        services: { total: totalServices },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Recent Activity
router.get('/activity/recent', async (req, res) => {
  try {
    const [recentContacts, recentApplications] = await Promise.all([
      Contact.findAll({
        limit: 10,
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'name', 'email', 'subject', 'status', 'createdAt'],
      }),
      JobApplication.findAll({
        limit: 10,
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'fullName', 'email', 'jobId', 'status', 'createdAt'],
      }),
    ]);

    const activities = [
      ...recentContacts.map(contact => ({
        type: 'contact',
        message: `${contact.name} submitted a contact form`,
        timestamp: contact.createdAt,
        data: contact,
      })),
      ...recentApplications.map(app => ({
        type: 'application',
        message: `${app.fullName} applied for ${app.jobId}`,
        timestamp: app.createdAt,
        data: app,
      })),
    ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
     .slice(0, 10);

    res.json({ success: true, data: activities });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// File Upload Endpoint
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'nyle-digital',
    allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'webp', 'pdf', 'doc', 'docx'],
    transformation: [{ width: 1000, height: 1000, crop: 'limit' }],
  },
});

const upload = multer({ storage });

router.post('/upload/image', upload.single('image'), (req, res) => {
  try {
    res.json({
      success: true,
      url: req.file.path,
      public_id: req.file.filename,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/upload/file', upload.single('file'), (req, res) => {
  try {
    res.json({
      success: true,
      url: req.file.path,
      filename: req.file.originalname,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Bulk Actions
router.post('/contacts/bulk-action', async (req, res) => {
  try {
    const { ids, action } = req.body;

    if (action === 'delete') {
      await Contact.destroy({ where: { id: ids } });
    } else if (['new', 'contacted', 'archived'].includes(action)) {
      await Contact.update({ status: action }, { where: { id: ids } });
    }

    res.json({ success: true, message: 'Bulk action completed' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;