const fs = require('fs');
const path = require('path');
const itemFilename = process.env.ITEMS_FILENAME || 'items.json';

const itemsFilePath = path.join(__dirname, 'data', itemFilename);

// Read and parse items from file
let items = [];
try {
  items = JSON.parse(fs.readFileSync(itemsFilePath).toString());
} catch (error) {
  console.error('Error reading items file:', error);
}


async function createItem(itemData = {}) {
	const newItem = { ...itemData, id: items.length + 1, lastUpdate: new Date() };
	items = [...items, newItem];
	return newItem;
}

// add filter as parameter
async function getAllItems(filter = null) {
	if (filter !== null) {
	  const filteredItems = items.filter((item) => item.isActive === filter);
	  console.log(`Filtering by: ${filter}`, filteredItems);
	  return filteredItems;
	}
	console.log('No filter applied', items);
	return items;
  }

async function findItem(id) {
	return items.find((i) => +i.id === +id);
}

async function updateItem(item, itemData = {}) {
	const updatedItem = { ...item, ...itemData, lastUpdate: new Date() };
	items = [...items.filter((i) => i.id !== item.id), updatedItem];
	return updatedItem;
}

async function deleteItem(item) {
	items = items.filter((i) => i.id !== item.id);
}

module.exports = { createItem, getAllItems, findItem, updateItem, deleteItem };
