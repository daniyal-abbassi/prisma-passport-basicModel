// upload router file
const {Router} = require('express');
const uploadRouter = Router();
//require controller of this router
const uploadController= require('../controllers/UploadController');
//multer for handling files in req object
const multer = require('multer');
const ensureLoggedIn = require('../middleware/auth');
const upload = multer({storage: multer.memoryStorage()})


uploadRouter.get('/',ensureLoggedIn,uploadController.uploadGet)

uploadRouter.post('/',upload.single('file'),uploadController.uploadPost)

module.exports = uploadRouter;