// controllers/teamController.js
import { TeamMember } from '../models/index.js';
import { createLogger } from '../utils/logger.js';

const logger = createLogger('team-controller');

// GET /api/team — public
export const getTeamMembers = async (req, res) => {
  try {
    const members = await TeamMember.findAll({
      where: { active: true },
      order: [['order', 'ASC'], ['createdAt', 'ASC']],
    });
    res.json({ success: true, data: members });
  } catch (error) {
    logger.error('getTeamMembers error', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET /api/team/all — admin (includes inactive)
export const getAllTeamMembers = async (req, res) => {
  try {
    const members = await TeamMember.findAll({
      order: [['order', 'ASC'], ['createdAt', 'ASC']],
    });
    res.json({ success: true, data: members });
  } catch (error) {
    logger.error('getAllTeamMembers error', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// POST /api/team — admin
export const createTeamMember = async (req, res) => {
  try {
    const { name, title, bio, imageUrl, linkedinUrl, twitterUrl, email, order, active } = req.body;

    if (!name || !title) {
      return res.status(400).json({ success: false, error: 'Name and title are required' });
    }

    const member = await TeamMember.create({
      name,
      title,
      bio,
      imageUrl,
      linkedinUrl,
      twitterUrl,
      email,
      order: order ?? 0,
      active: active !== undefined ? active : true,
    });

    logger.info('TeamMember created', { id: member.id, name: member.name });
    res.status(201).json({ success: true, data: member });
  } catch (error) {
    logger.error('createTeamMember error', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// PUT /api/team/:id — admin
export const updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, title, bio, imageUrl, linkedinUrl, twitterUrl, email, order, active } = req.body;

    const member = await TeamMember.findByPk(id);
    if (!member) {
      return res.status(404).json({ success: false, error: 'Team member not found' });
    }

    await member.update({
      name: name ?? member.name,
      title: title ?? member.title,
      bio: bio !== undefined ? bio : member.bio,
      imageUrl: imageUrl !== undefined ? imageUrl : member.imageUrl,
      linkedinUrl: linkedinUrl !== undefined ? linkedinUrl : member.linkedinUrl,
      twitterUrl: twitterUrl !== undefined ? twitterUrl : member.twitterUrl,
      email: email !== undefined ? email : member.email,
      order: order !== undefined ? order : member.order,
      active: active !== undefined ? active : member.active,
    });

    logger.info('TeamMember updated', { id: member.id });
    res.json({ success: true, data: member });
  } catch (error) {
    logger.error('updateTeamMember error', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// DELETE /api/team/:id — admin
export const deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;

    const member = await TeamMember.findByPk(id);
    if (!member) {
      return res.status(404).json({ success: false, error: 'Team member not found' });
    }

    await member.destroy();
    logger.info('TeamMember deleted', { id });
    res.json({ success: true, message: 'Team member deleted successfully' });
  } catch (error) {
    logger.error('deleteTeamMember error', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
