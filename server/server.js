const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const formidable = require('express-formidable');
const cloudinary = require('cloudinary');
const async = require('async');

const app = express();

require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true); // Remove Deprecation Warning
mongoose.set('useNewUrlParser', true); // Remove Deprecation Warning
mongoose.set('useFindAndModify', false); // Remove Deprecation Warning
mongoose.connect(process.env.DATABASE);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static('client/build'));

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

// Models
const { User } = require('./models/user');
const { Brand } = require('./models/brand');
const { Category } = require('./models/category');
const { Product } = require('./models/product');
const { Site } = require('./models/site');

// Middlewares
const { auth } = require('./middleware/auth');
const { admin } = require('./middleware/admin');

//--- Brand Endpoints ---//
// Add Brand
app.post('/api/products/brands', auth, admin, (req, res) => {
  const brand = new Brand(req.body);
  brand.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      brand: doc
    });
  });
});

// Get All Brands
app.get('/api/products/brands', (req, res) => {
  Brand.find({}, (err, brands) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(brands);
  });
});

//--- Category Endpoints ---//
// Add Category
app.post('/api/products/categories', auth, admin, (req, res) => {
  const category = new Category(req.body);
  category.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      category: doc
    });
  });
});

// Get All Categories
app.get('/api/products/categories', (req, res) => {
  Category.find({}, (err, categories) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(categories);
  });
});

//--- Product Endpoints ---//
// Get Latest Sneakers
app.get('/api/products/sneakers/collections', (req, res) => {
  let order = req.query.order ? req.query.order : 'asc';
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  let limit = req.query.limit ? parseInt(req.query.limit) : 100;
  Product.find()
    .populate('brand')
    .populate('category')
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, docs) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send(docs);
    });
});

// Get Sneakers By Query
app.get('/api/products/sneakers', (req, res) => {
  let type = req.query.type;
  let items = req.query.id;
  if (type === 'array') {
    let ids = req.query.id.split(',');
    items = [];
    items = ids.map(item => {
      return mongoose.Types.ObjectId(item)
    });
  }
  Product.find({ '_id': { $in: items } })
    .populate('brand')
    .populate('category')
    .exec((err, docs) => {
      // if (err) return res.status(400).send(err);
      return res.status(200).send(docs);
    });
});

// Add Sneaker
app.post('/api/products/sneakers', auth, admin, (req, res) => {
  const product = new Product(req.body);
  product.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      sneakers: doc
    });
  });
});

// Get Sneakers by Filter Conditions
app.post('/api/products/shop', (req, res) => {
  let order = req.body.order ? req.body.order : 'desc';
  let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
  let limit = req.body.limit ? parseInt(req.body.limit) : 50;
  let skip = parseInt(req.body.skip);
  let findArgs = {};
  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === 'price') {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        }
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }
  Product.find(findArgs)
    .populate('brand')
    .populate('category')
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, docs) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({
        size: docs.length,
        sneakers: docs
      })
    })
});

//--- Users Endpoints ---//
// User Authentication
app.get('/api/users/auth', auth, (req, res) => {
  res.status(200).json({
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    cart: req.user.cart,
    history: req.user.history
  });
});

// User Registration
app.post('/api/users/register', (req, res) => {
  const user = new User(req.body);
  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
    });
  });
});

// User Login
app.post('/api/users/login', (req, res) => {
  // find the email
  User.findOne({ 'email': req.body.email }, (err, user) => {
    if (!user) return res.json({ loginSuccess: false, message: 'Email not found' });
    // check password
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) return res.json({ loginSuccess: false, message: 'Wrong password' });
      // generate a token
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie('orangebox_auth', user.token).status(200).json({
          loginSuccess: true
        });
      });
    });
  });
});

// User Logout
app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: '' },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true
      });
    }
  );
});

// User Update Profile
app.post('/api/users/updateProfile', auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: req.body },
    { new: true },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true
      });
    }
  )
})

// Admin User Uploads Images
app.post('/api/users/uploadimage', auth, admin, formidable(), (req, res) => {
  cloudinary.uploader.upload(req.files.file.path, (result) => {
    res.status(200).send({
      public_id: result.public_id,
      url: result.url
    })
  }, {
      public_id: `${Date.now()}`,
      resource_type: 'auto'
    });
});

// Admin User Removes Images
app.get('/api/users/removeimage', auth, admin, (req, res) => {
  let public_id = req.query.public_id;
  cloudinary.uploader.destroy(public_id, (error, result) => {
    if (error) return res.json({ success: false, error });
    res.status(200).send('Removed');
  });
});

// User Adds Products to Cart
app.post('/api/users/addToCart', auth, (req, res) => {
  User.findOne({ _id: req.user._id }, (err, doc) => {
    let duplicate = false;
    doc.cart.forEach((item) => {
      if (item.id == req.query.productId) {
        duplicate = true;
      }
    });
    if (duplicate) {
      User.findOneAndUpdate(
        { _id: req.user._id, "cart.id": mongoose.Types.ObjectId(req.query.productId) },
        { $inc: { "cart.$.quantity": 1 } },
        { new: true },
        (err, doc) => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(doc.cart);
        }
      )
    } else {
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            cart: {
              id: mongoose.Types.ObjectId(req.query.productId),
              quantity: 1,
              date: Date.now()
            }
          }
        },
        { new: true },
        (err, doc) => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(doc.cart);
        }
      );
    }
  });
});

// User Removes Product From Cart
app.get('/api/users/removeFromCart', auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $pull: {
        cart: {
          id: mongoose.Types.ObjectId(req.query._id)
        }
      }
    },
    { new: true },
    (err, doc) => {
      let cart = doc.cart;
      let array = cart.map(item => {
        return mongoose.Types.ObjectId(item.id);
      });
      Product.find({ '_id': { $in: array } })
        .populate('brand')
        .populate('category')
        .exec((err, cartDetail) => {
          return res.status(200).json({
            cartDetail,
            cart
          });
        });
    }
  );
});

// User Successfully Purchases Items in Cart
app.post('/api/users/successBuy', auth, (req, res) => {
  let history = [];
  req.body.cartDetail.forEach((item) => {
    history.push({
      dateOfPurchase: Date.now(),
      id: item._id,
      name: item.name,
      brand: item.brand.name,
      price: item.price,
      quantity: item.quantity
    });
  });
  User.findOneAndUpdate(
    { _id: req.user._id }, // find the user
    { $push: { history: history }, $set: { cart: [] } }, // add history and remove items in cart
    { new: true }, // get updated document of user
    (err, user) => {
      if (err) return res.json({ success: false, err });
      // update number of sold value in a product
      let products = [];
      history.forEach((item) => {
        products.push({ id: item.id, quantity: item.quantity });
      });
      async.eachSeries(products, (item, callback) => {
        Product.update(
          { _id: item.id }, // find the product
          { $inc: { "sold": item.quantity } }, // update
          { new: false },
          callback
        )
      }, (err) => {
        if (err) return res.json({ success: false, err })
        res.status(200).json({
          success: true,
          cart: user.cart,
          cartDetail: []
        });
      });
    }
  );
});

//--- Site Endpoints ---//
// Get Site Info
app.get('/api/site/siteData', (req, res) => {
  Site.find({}, (err, site) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(site[0].siteInfo)
  });
});

// Admin User Update Site Info
app.post('/api/site/siteData', auth, admin, (req, res) => {
  Site.findOneAndUpdate(
    { name: 'Site' },
    { $set: { siteInfo: req.body } },
    { new: true },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
        siteInfo: doc.siteInfo
      });
    }
  );
});

if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Server running at ${port}`)
})