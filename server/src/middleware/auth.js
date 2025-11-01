import Admin from '../models/Admin.js';

export async function requireAuth(req, res, next) {
  try {
    const id = req.session?.adminId;
    if (!id) return res.status(401).json({ error: 'Unauthorized' });
    req.admin = await Admin.findById(id).lean();
    if (!req.admin) return res.status(401).json({ error: 'Unauthorized' });
    next();
  } catch (e) {
    next(e);
  }
}
