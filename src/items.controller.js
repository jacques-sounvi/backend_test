const service = require('./items.service');

async function findItem(req, res, next, id) {
	const item = service.findItem(id);
	if (!item) {
		return res.status(404).json({
			message: 'invalid item',
			errors: { id: 'is unknown' },
		});
	}
	req.item = item;
	next();
}

async function createItem(req, res, next) {
	const newItem = service.createItem();
	return res.json({ item: newItem });
}

async function getAllItems(req, res, next) {
	try {
	  const { filter_by } = req.query;
	  let filter = null;
	  if (filter_by) {
		if (filter_by === 'active') {
		  filter = true;
		} else if (filter_by === 'inactive') {
		  filter = false;
		} else {
		  return res.status(400).json({
			message: 'Invalid filter',
			errors: { filter_by: 'must be "active" or "inactive"' },
		  });
		}
	  }
	  const items = await service.getAllItems(filter);
	  res.json({ items });
	} catch (error) {
	  next(error);
	}
}

async function getOneItem(req, res, next) {
	return res.json({ item: req.item });
}

async function updateItem(req, res, next) {
	return res.json({ item: service.updateItem(req.item, req.body.item || {}) });
}

async function deleteItem(req, res, next) {
	service.deleteItem(req.item);
	return res.json({ item: req.item });
}

module.exports = {
	findItem,
	createItem,
	getAllItems,
	getOneItem,
	updateItem,
	deleteItem,
};
