const ROLES = require('../utils/roles');

const canEdit = async (req, res, next) => {
  const { role } = await req.user;

  if (!role) {
    return res.status(404).json({
      error: { title: 'User has no role' },
      data: null,
    });
  }
  if (role !== ROLES.admin) {
    return res.status(404).json({
      error: { title: 'Invalid user permission' },
      data: null,
    });
  }

  return next();
};

module.exports = { canEdit };
