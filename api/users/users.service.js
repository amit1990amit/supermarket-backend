const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    addUser,
    query,
    getById,
    updateUser,
    deleteUser,
    getByUserName  
}

async function deleteUser(userId){
    const collection = await dbService.getCollection('users');
    try {
        await collection.deleteOne({_id:ObjectId(userId)})
    } catch(err) {
        console.log('ERROR: cannot delete user')
        throw err
    }
}

async function updateUser(user){
    const collection = await dbService.getCollection('users');
    try {
        user._id = ObjectId(user._id);
        await collection.replaceOne({"_id": user._id}, {$set: user})
        return user
    } catch(err) {
        console.log('ERROR: cannot update user')
        throw err
    }
}




async function getById(userId){
    const collection = await dbService.getCollection('users')
    try{
        userId = ObjectId(userId)
        const user = await collection.findOne({"_id": ObjectId(userId)})
        return user
    } catch(err){
        console.log('ERROR: cannot find user by id')
        throw err;
    }
}

async function getByUserName(username) {
    const collection = await dbService.getCollection('users')
    try {
        const user = await collection.findOne({ username })
        return user
    } catch (err) {
        console.log(`ERROR: while finding user ${username}`)
        throw err;
    }
}

async function query() {
    const collection = await dbService.getCollection('users')
    try{
        const users = await collection.find().toArray();
        return users;
    } catch(err) {
        console.log('ERROR: cannot find users');
        throw err;
    }
}

async function addUser(user){
    const collection = await dbService.getCollection('users');
    try {
        await collection.insertOne(user);
        return user;
    } catch(err) {
        console.log('ERROR: cannot insert user');
        throw err;
    }
}