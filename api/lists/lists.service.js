const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    addList,
    query,
    getById,
    updateList,
    deleteList  
}

async function deleteList(listId){
    const collection = await dbService.getCollection('lists');
    try {
        await collection.deleteOne({_id:ObjectId(listId)})
    } catch(err) {
        console.log('ERROR: cannot delete list')
        throw err
    }
}

async function updateList(list){
    const collection = await dbService.getCollection('lists');
    try {
        list._id = ObjectId(list._id);
        await collection.replaceOne({"_id": list._id}, {$set: list})
        return list
    } catch(err) {
        console.log('ERROR: cannot update list')
        throw err
    }
}




async function getById(listId){
    const collection = await dbService.getCollection('lists')
    try{
        listId = ObjectId(listId)
        const list = await collection.findOne({"_id": ObjectId(listId)})
        return list
    } catch(err){
        console.log('ERROR: cannot find list by id')
        throw err;
    }
}


async function query() {
    const collection = await dbService.getCollection('lists')
    try{
        const lists = await collection.find().toArray();
        return lists;
    } catch(err) {
        console.log('ERROR: cannot find lists');
        throw err;
    }
}

async function addList(list){
    const collection = await dbService.getCollection('lists');
    try {
        list.items = []
        await collection.insertOne(list);
        return list;
    } catch(err) {
        console.log('ERROR: cannot insert list');
        throw err;
    }
}

