import express from 'express';
import { createLogger } from '../utils/logger.js';

const router = express.Router();
const logger = createLogger('frontend');

router.post('/', (req, res) => {
  const { level, message, meta, source } = req.body;

  const logMessage = `[${source || 'unknown'}] ${message}`;

  if (level === 'error') {
    logger.error(logMessage, meta);
  } else if (level === 'warn') {
    logger.warn(logMessage, meta);
  } else {
    logger.info(logMessage, meta);
  }

  res.status(204).send();
});

export default router;
