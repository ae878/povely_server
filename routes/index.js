var multer = require('multer');
var express = require('express');
var router = express.Router();
const { wrap : async } = require('co');
var Diary = require('./../models/diary.js');
var path = require('path'), __parentDir = path.dirname(__dirname);


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
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
//var upload = multer({ dest: './public/uploads' });
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '포블리n' });
});


router.post('/posting', upload.single('image'),async(function*(req,res){
console.log(req.file);

  var diary = new Diary({
    title : req.body.title,
    description : req.body.description,
    date : req.body.date,
    photo : req.file.path
  });

    try {

          diary.save();

        res.json( {"result" : "success"} );

    } catch( err ) {

        console.log( err );
  res.json({"result" : "fail"});
    }

}));

router.get('/list', upload.single('image'),async(function*(req,res){

  let diary = yield Diary.find();

/*  let data = [];

  for(let i=0; i<diary.length; i++){
    let item = items[i];
    let o = {
      id: item.id,
      title: item.name,
      price: item.price,
      seller: item.seller.username,
      image: item.images[0].thumbnail_small
    }
    data.push(o);
  }*/
  res.json(diary);
}));

module.exports = router;
