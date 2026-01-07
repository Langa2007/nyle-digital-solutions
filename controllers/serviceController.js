// backend/controllers/serviceController.js
import { Service } from '../models/index.js';

export const getAllServices = async (req, res, next) => {
  try {
    const { category, active = true } = req.query;
    const where = {};

    if (category) where.category = category;
    if (active !== undefined) where.active = active === 'true';

    const services = await Service.findAll({
      where,
      order: [['order', 'ASC']],
    });

    res.json({
      success: true,
      data: services,
    });
  } catch (error) {
    next(error);
  }
};

export const getServiceBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    
    const service = await Service.findOne({
      where: { slug, active: true },
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }

    res.json({
      success: true,
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

export const createService = async (req, res, next) => {
  try {
    const {
      title,
      description,
      category,
      features,
      technologies,
      startingPrice,
      icon
    } = req.body;

    const slug = title.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim();

    const service = await Service.create({
      title,
      slug,
      description,
      detailedDescription: description,
      category,
      features: features || [],
      technologies: technologies || [],
      startingPrice,
      icon,
      active: true,
    });

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

export const updateService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }

    // If title is being updated, regenerate slug
    if (updates.title) {
      updates.slug = updates.title.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/--+/g, '-')
        .trim();
    }

    await service.update(updates);

    res.json({
      success: true,
      message: 'Service updated successfully',
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteService = async (req, res, next) => {
  try {
    const { id } = req.params;

    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }

    await service.destroy();

    res.json({
      success: true,
      message: 'Service deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const getServiceCategories = async (req, res, next) => {
  try {
    const categories = await Service.findAll({
      attributes: ['category'],
      group: ['category'],
      where: { active: true },
    });

    res.json({
      success: true,
      data: categories.map(c => c.category).filter(Boolean),
    });
  } catch (error) {
    next(error);
  }
};

export const getServiceStats = async (req, res, next) => {
  try {
    const total = await Service.count({ where: { active: true } });
    const categories = await Service.count({
      attributes: ['category'],
      group: ['category'],
      where: { active: true },
    });

    res.json({
      success: true,
      data: {
        total,
        categories: categories.length,
      },
    });
  } catch (error) {
    next(error);
  }
};