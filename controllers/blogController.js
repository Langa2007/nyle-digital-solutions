// backend/controllers/blogController.js
import { BlogPost } from '../models/index.js';
import { Op } from 'sequelize';

export const getAllBlogPosts = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      tag,
      search,
      sortBy = 'publishedAt',
      sortOrder = 'DESC'
    } = req.query;

    const offset = (page - 1) * limit;
    const where = { status: 'published' };

    if (category) where.category = category;
    if (tag) where.tags = { [Op.contains]: [tag] };
    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { excerpt: { [Op.iLike]: `%${search}%` } },
        { content: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const { count, rows: posts } = await BlogPost.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sortBy, sortOrder.toUpperCase()]],
      attributes: { exclude: ['content'] }, // Don't send full content in list
    });

    res.json({
      success: true,
      data: posts,
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

export const getBlogPostBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    
    const post = await BlogPost.findOne({
      where: { slug, status: 'published' },
      include: [{
        association: 'authorUser',
        attributes: ['firstName', 'lastName', 'avatar'],
      }],
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
    }

    // Increment view count
    await post.increment('views', { by: 1 });

    res.json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

export const createBlogPost = async (req, res, next) => {
  try {
    const { title, content, excerpt, category, tags, featuredImage } = req.body;
    
    const slug = title.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim();

    const blogPost = await BlogPost.create({
      title,
      slug,
      content,
      excerpt: excerpt || content.substring(0, 200) + '...',
      category,
      tags: tags || [],
      featuredImage,
      author: req.user.firstName + ' ' + req.user.lastName,
      authorId: req.user.id,
      publishedAt: new Date(),
      readTime: Math.ceil(content.split(' ').length / 200), // 200 words per minute
    });

    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: blogPost,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBlogPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const blogPost = await BlogPost.findByPk(id);
    if (!blogPost) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found',
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

    await blogPost.update(updates);

    res.json({
      success: true,
      message: 'Blog post updated successfully',
      data: blogPost,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBlogPost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const blogPost = await BlogPost.findByPk(id);
    if (!blogPost) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
    }

    await blogPost.destroy();

    res.json({
      success: true,
      message: 'Blog post deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const getBlogCategories = async (req, res, next) => {
  try {
    const categories = await BlogPost.findAll({
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

export const getFeaturedPosts = async (req, res, next) => {
  try {
    const posts = await BlogPost.findAll({
      where: { status: 'published' },
      order: [['views', 'DESC']],
      limit: 5,
      attributes: ['id', 'title', 'slug', 'excerpt', 'featuredImage', 'category', 'publishedAt', 'readTime'],
    });

    res.json({
      success: true,
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};