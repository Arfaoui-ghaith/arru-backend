const sharp = require('sharp');
const multer = require('multer');
const catchAsync = require('./../utils/catchAsync');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(new AppError('Not an image Please upload only images', 400), false);
    }
};

const upload = multer({
    dest: 'public/img/utilisateurs',
    storage: multerStorage,
    fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single('image');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {

    if (!req.file) return next();

    req.file.filename = `utilisateur-${req.user.id}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`storage/img/utilisateurs/${req.file.filename}`);

    next();
  });