const Item = require('./item.model');



async function createItem(itemData = {}) {
	try {
	  const newItem = await Item.create({
		...itemData,
		id: items.length + 1,
		lastUpdate: new Date()
	  });
	  return newItem;
	} catch (error) {
	  console.error('Error creating item:', error);
	  throw new Error('Could not create item');
	}
  }

  async function getAllItems(filter = null) {
	try {
	  let query = {};
	  if (filter !== null) {
		query.isActive = filter;
	  }
	  const items = await Item.find(query).exec();
	  return items;
	} catch (error) {
	  console.error('Error fetching items:', error);
	  throw new Error('Could not fetch items');
	}
  }

  async function findItem(id) {
	try {
	  const item = await Item.findById(id).exec();
	  return item;
	} catch (error) {
	  console.error('Error finding item:', error);
	  throw new Error('Item not found');
	}
  }

  async function updateItem(id, itemData = {}) {
	try {
	  const updatedItem = await Item.findByIdAndUpdate(id, {
		...itemData,
		lastUpdate: new Date()
	  }, { new: true }).exec();
	  if (!updatedItem) {
		throw new Error('Item not found');
	  }
	  return updatedItem;
	} catch (error) {
	  console.error('Error updating item:', error);
	  throw new Error('Could not update item');
	}
  }

  async function deleteItem(id) {
	try {
	  const deletedItem = await Item.findByIdAndDelete(id).exec();
	  if (!deletedItem) {
		throw new Error('Item not found');
	  }
	  return deletedItem;
	} catch (error) {
	  console.error('Error deleting item:', error);
	  throw new Error('Could not delete item');
	}
  }

module.exports = { createItem, getAllItems, findItem, updateItem, deleteItem };
