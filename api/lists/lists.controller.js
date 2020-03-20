const ListService = require('./lists.service');


async function createList(req,res) {
    const list = req.body
    try {
        await ListService.addList(list)
        return res.json(list)
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


async function getLists(req,res){
    try{
        const lists = await ListService.query()
        return res.json(lists)
    } catch(err){
        res.send(500,"server error")
    }
}

async function getList(req,res) {
    let list = await ListService.getById(req.params.id)
    return res.json(list)
}

async function updateList(req,res){
    const list = req.body;
    list._id = req.params._id;
    try{
        await ListService.updateList(list)
        return res.json(list)
    } catch(err) {
        res.send(500, "Internal Server Error");
    }
}

async function deleteList(req,res){
    await ListService.deleteList(req.params._id)
    res.end()
}





module.exports ={
    createList,
    getLists,
    getList,
    updateList,
    deleteList
}