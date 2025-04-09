const {Router} = require('express')
const publicRouter = Router();

publicRouter.get('/:folderId/share',(req,res)=>{
    const folderId = req.params.folderId;
    res.send('this router will manage your folder share page',folderId)
})


module.exports=publicRouter;