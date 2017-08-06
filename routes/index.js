var multer = require('multer');
var express = require('express');
var router = express.Router();
const { wrap : async } = require('co');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __parentDir+ '/public/uploads')
  },
  filename: function (req, file, cb) {
    file.uploadedFile = {
       name: req.originalname,
       ext: file.mimetype.split('/')[1]
     };
     cb(null, file.uploadedFile.name + '.' + file.uploadedFile.ext);
  }
});
var upload = multer({storage: storage});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '포블리n' });
});


router.post('/posting', upload.single('image'),async(function*(req,res){
	res.json(req.file);

}));


router.get('/:id',async(function* (req,res){
        res.json({title:req.params.id});
}));
module.exports = router;
