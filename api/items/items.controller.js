const ItemService = require('./items.service');
 
async function createItem(req, res) {
    // request validations
    // if (!req.body.email) {
    //     return res.send(400, 'email is required');
    // } 
    let check = await ItemService.getByName(req.body.name)
    if (check && check.name){
        check.quantity = +req.body.quantity + +check.quantity
        console.log('wwwwwwwwwwwwwwwwwwwwwwwww',check)
        await ItemService.updateItem(check)
        return res.json(check)
    } else {
        const item = req.body
        try {
            await ItemService.addItem(item);
            return res.json(item);
        } catch (err) {
            res.send(500, "Internal Server Error");
        }

    }

   
}

async function getItems(req,res){
    //console.log(req.body)
    try {
        const items = await ItemService.query()
        return res.json(items)
    } catch(err) {
        res.send(500,"server error")
    }
}

async function getItem(req,res){
    const item = await ItemService.getById(req.params.id)
    return res.json(item)
}

async function updateItem(req,res){
    const item = req.body;
    item._id = req.params._id;
    try {
        await ItemService.updateItem(item)
        return res.json(item)
    } catch(err) {
        res.send(500, "Internal Server Error");
    }
}

async function deleteItem(req,res){
    await ItemService.deleteItem(req.params._id)
    res.end()
}

module.exports ={
    createItem,
    getItems,
    getItem,
    updateItem,
    deleteItem,
}