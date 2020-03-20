const UserService = require('./users.service');


async function createUser(req,res) {
    const user = req.body
    try {
        await UserService.addUser(user)
        return res.json(user)
    } catch(err) {
        res.send(500,"internal server error")
    }

    
}

// async function createItem(req, res) {
//     console.log('qqqqqqqqqqqqqqqqqqqqqq',req.body);

//     let check = await ItemService.getByName(req.body.name)
//     if (check && check.name){
//         check.quantity = +req.body.quantity + +check.quantity
//         await ItemService.updateItem(check)
//         return res.json(check)
//     } else {
//         const item = req.body
//         try {
//             await ItemService.addItem(item);
//             return res.json(item);
//         } catch (err) {
//             res.send(500, "Internal Server Error");
//         }

//     }

   
// }


async function getUsers(req,res){
    try{
        const users = await UserService.query()
        return res.json(users)
    } catch(err){
        res.send(500,"server error")
    }
}

async function getUser(req,res) {
    let user = await UserService.getById(req.params.id)
    return res.json(user)
}

async function updateUser(req,res){
    const user = req.body;
    user._id = req.params._id;
    try{
        await UserService.updateUser(user)
        return res.json(user)
    } catch(err) {
        res.send(500, "Internal Server Error");
    }
}

async function deleteUser(req,res){
    await UserService.deleteUser(req.params._id)
    res.end()
}





module.exports ={
    deleteUser,
    updateUser,
    getUser,
    getUsers,
    createUser
}