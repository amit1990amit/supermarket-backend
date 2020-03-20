const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId

module.exports = {
    addItem,
    query,
    getById,
    updateItem,
    deleteItem,
    getByName
    
}

async function deleteItem(itemId){
    const collection = await dbService.getCollection('items')
    try {
        await collection.deleteOne({_id:ObjectId(itemId)})
    } catch(err) {
        console.log('ERROR: cannot delete item')
        throw err;
    }
}

async function updateItem(item){
    const collection = await dbService.getCollection('items')
    try {
        console.log('qqqqqqqqqqqqqqqqqqqqq',item)
        item._id = ObjectId(item._id)
        await collection.replaceOne({"_id": item._id}, {$set: item})
        console.log('qqqqqqqqqqqqqqqqqqqqq',item)
        return item
    } catch (err) {
        console.log('ERROR: cannot update item')
        throw err;
    }
}

 


async function getById(itemId){
    const collection = await dbService.getCollection('items')
    try{
        itemId = ObjectId(itemId)
        const item = await collection.findOne({ "_id": ObjectId(itemId) })
        return item
    } catch(err) {
        console.log('ERROR: cannot find item by id')
        throw err;
    }
}

async function getByName(itemName){
    const collection = await dbService.getCollection('items')
    try{
        const item = await collection.findOne({ "name": itemName })
        return item
    } catch(err) {
        console.log('ERROR: cannot find item by id')
        throw err;
    }
}


async function query() {
    console.log('qqqqqqqqqqqqqqqqqqqqq')
    const collection = await dbService.getCollection('items')
    try{
        const items = await collection.find().toArray();
        return items
    } catch(err) {
        console.log('ERROR: cannot find items')
        throw err;
    }
}

async function addItem(item) {
    console.log('f3',item)
    const collection = await dbService.getCollection('items')
    try {
        await collection.insertOne(item);
        return item;
    } catch (err) {
        console.log(`ERROR: cannot insert item`)
        throw err;
    }
}



