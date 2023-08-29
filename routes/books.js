var express = require('express');
var router = express.Router();
const BookModel = require('../models/bookModels')

const multer = require('multer');
const storageDisk = multer.diskStorage({
    destination: (req,file, cb) =>{
        cb(null,'./public/images');
    },
    filename: (req, file, cb) =>{
        cb(null, file.fieldname + '-' + 'jpeg');
    }
});

var upload = multer({storage: storageDisk})

/* GET users listing. */
router.get('/',async function(req, res, next) {
    let books = await BookModel.find();
    return res.render('book/index', {books: books});
});

//search
router.get('/search',async function(req, res, next) {
    let title = req.query.title;
    let books = await BookModel.find({'title': new RegExp(title, 'i')});
    return res.render('book/index', {books: books});
});

//create
router.get('/create', function(req, res, next) {
    return res.render('book/create')
  });

  router.post('/create',upload.single('image'), async function(req, res, next) {
    let body = req.body;
    let file = req.file;
    let book = new BookModel({
        title: body.title,
        price: body.price,
        image: file.filename
    });

    await book.save();
    return res.redirect('/book')
  });

  //update
router.get('/update/:id', async function(req, res, next) {
    let id = req.params.id;
    let book = await BookModel.findById();
    return res.render('book/update', {book: book})
});

router.post('/update:/id',upload.single('image'), async function(req, res, next) {
    
    });



module.exports = router;