// backend/controllers/jobController.js
import { validationResult } from 'express-validator';
import { JobApplication } from '../models/index.js';
import { sendJobApplicationConfirmation, sendAdminNotification } from '../utils/resendClient.js';

export const createJobApplication = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const jobApplication = await JobApplication.create(req.body);

    // Send confirmation email to applicant
    try {
      await sendJobApplicationConfirmation(req.body);
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
    }

    // Send notification to admin
    try {
      await sendAdminNotification(
        'New Job Application',
        `
        <p>A new job application has been submitted:</p>
        <ul>
          <li><strong>Position:</strong> ${req.body.jobId}</li>
          <li><strong>Name:</strong> ${req.body.fullName}</li>
          <li><strong>Email:</strong> ${req.body.email}</li>
          <li><strong>Experience:</strong> ${req.body.experience} years</li>
          <li><strong>Current Company:</strong> ${req.body.currentCompany || 'Not specified'}</li>
        </ul>
        <p>Please check the admin panel for details.</p>
        `
      );
    } catch (adminEmailError) {
      console.error('Failed to send admin notification:', adminEmailError);
    }

    res.status(201).json({
      success: true,
      message: 'Job application submitted successfully',
      data: jobApplication,
    });
  } catch (error) {
    next(error);
  }
};

export const getJobApplications = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 20,
      jobId,
      status,
      search,
      sortBy = 'createdAt',
      sortOrder = 'DESC'
    } = req.query;

    const offset = (page - 1) * limit;
    const where = {};

    if (jobId) where.jobId = jobId;
    if (status) where.status = status;
    if (search) {
      where[Op.or] = [
        { fullName: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } },
        { jobId: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const { count, rows: applications } = await JobApplication.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sortBy, sortOrder.toUpperCase()]],
    });

    res.json({
      success: true,
      data: applications,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateApplicationStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const application = await JobApplication.findByPk(id);
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found',
      });
    }

    await application.update({ status, notes });

    res.json({
      success: true,
      message: 'Application updated successfully',
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

export const getOpenPositions = async (req, res, next) => {
  try {
    // In a real app, this would come from a Jobs/Positions model
    const openPositions = [
      {
        id: 'senior-fullstack-dev',
        title: 'Senior Full-Stack Developer',
        department: 'Engineering',
        location: 'Remote',
        type: 'Full-time',
        experience: '5+ years',
        salary: '$120,000 - $160,000',
        description: 'We are looking for an experienced Full-Stack Developer to join our team.',
      },
      {
        id: 'devops-engineer',
        title: 'DevOps Engineer',
        department: 'Infrastructure',
        location: 'San Francisco, CA',
        type: 'Full-time',
        experience: '3+ years',
        salary: '$100,000 - $140,000',
        description: 'Join our infrastructure team to build and maintain scalable cloud solutions.',
      },
      {
        id: 'ux-designer',
        title: 'UX/UI Designer',
        department: 'Design',
        location: 'Remote',
        type: 'Full-time',
        experience: '4+ years',
        salary: '$90,000 - $130,000',
        description: 'Create beautiful and intuitive user interfaces for our clients.',
      },
    ];

    res.json({
      success: true,
      data: openPositions,
    });
  } catch (error) {
    next(error);
  }
};

export const getApplicationStats = async (req, res, next) => {
  try {
    const total = await JobApplication.count();
    const pending = await JobApplication.count({ where: { status: 'pending' } });
    const reviewed = await JobApplication.count({ where: { status: 'reviewed' } });
    const shortlisted = await JobApplication.count({ where: { status: 'shortlisted' } });
    const hired = await JobApplication.count({ where: { status: 'hired' } });

    res.json({
      success: true,
      data: {
        total,
        pending,
        reviewed,
        shortlisted,
        hired,
      },
    });
  } catch (error) {
    next(error);
  }
};