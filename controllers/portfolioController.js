// backend/controllers/portfolioController.js
import { Portfolio } from '../models/index.js';

export const getAllPortfolioItems = async (req, res, next) => {
  try {
    const { category, featured, limit = 12 } = req.query;
    const where = { status: 'published' };

    if (category) where.category = category;
    if (featured === 'true') where.featured = true;

    const portfolioItems = await Portfolio.findAll({
      where,
      limit: parseInt(limit),
      order: [['order', 'ASC'], ['createdAt', 'DESC']],
    });

    res.json({
      success: true,
      data: portfolioItems,
    });
  } catch (error) {
    next(error);
  }
};

export const getPortfolioItemBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    
    const portfolioItem = await Portfolio.findOne({
      where: { slug, status: 'published' },
    });

    if (!portfolioItem) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio item not found',
      });
    }

    res.json({
      success: true,
      data: portfolioItem,
    });
  } catch (error) {
    next(error);
  }
};

export const createPortfolioItem = async (req, res, next) => {
  try {
    const {
      title,
      description,
      category,
      client,
      technologies,
      featuredImage,
      liveUrl,
      githubUrl,
      results
    } = req.body;

    const slug = title.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim();

    const portfolioItem = await Portfolio.create({
      title,
      slug,
      description,
      category,
      client,
      technologies: technologies || [],
      featuredImage,
      liveUrl,
      githubUrl,
      results,
      status: 'published',
    });

    res.status(201).json({
      success: true,
      message: 'Portfolio item created successfully',
      data: portfolioItem,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePortfolioItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const portfolioItem = await Portfolio.findByPk(id);
    if (!portfolioItem) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio item not found',
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

    await portfolioItem.update(updates);

    res.json({
      success: true,
      message: 'Portfolio item updated successfully',
      data: portfolioItem,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePortfolioItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    const portfolioItem = await Portfolio.findByPk(id);
    if (!portfolioItem) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio item not found',
      });
    }

    await portfolioItem.destroy();

    res.json({
      success: true,
      message: 'Portfolio item deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const getPortfolioCategories = async (req, res, next) => {
  try {
    const categories = await Portfolio.findAll({
      attributes: ['category'],
      group: ['category'],
      where: { status: 'published' },
    });

    res.json({
      success: true,
      data: categories.map(c => c.category).filter(Boolean),
    });
  } catch (error) {
    next(error);
  }
};

export const getPortfolioStats = async (req, res, next) => {
  try {
    const total = await Portfolio.count({ where: { status: 'published' } });
    const categories = await Portfolio.count({
      attributes: ['category'],
      group: ['category'],
      where: { status: 'published' },
    });

    res.json({
      success: true,
      data: {
        total,
        categories: categories.length,
        featured: await Portfolio.count({ where: { featured: true, status: 'published' } }),
      },
    });
  } catch (error) {
    next(error);
  }
};