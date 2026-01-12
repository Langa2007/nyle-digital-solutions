// backend/routes/admin.js
import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { Contact, JobApplication, BlogPost, Portfolio, Service } from '../models/index.js';
import { Op } from 'sequelize';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// ----------------------
// Configure Cloudinary
// ----------------------
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// ----------------------
// Multer memory storage
// ----------------------
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ----------------------
// Helper to upload files to Cloudinary
// ----------------------
const uploadToCloudinary = (fileBuffer, folder = 'nyle-digital') => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

// ----------------------
// Middleware: Admin authentication
// ----------------------
router.use(authenticate);
router.use(authorize(['admin', 'staff']));

// ----------------------
// Dashboard Stats
// ----------------------
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

// ----------------------
// Recent Activity
// ----------------------
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
    ]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 10);

    res.json({ success: true, data: activities });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ----------------------
// File Upload Endpoints
// ----------------------
router.post('/upload/image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, error: 'No file uploaded' });

    const result = await uploadToCloudinary(req.file.buffer, 'nyle-digital');
    res.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/upload/file', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, error: 'No file uploaded' });

    const result = await uploadToCloudinary(req.file.buffer, 'nyle-digital/files');
    res.json({
      success: true,
      url: result.secure_url,
      filename: req.file.originalname,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ----------------------
// Bulk Actions for Contacts
// ----------------------
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
