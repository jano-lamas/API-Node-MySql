const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const pathStorage = `${__dirname}/../storage`;
        cb(null, pathStorage)
    },
    filename: function (req, file, cb) {
        // TODO: mi-cv.pdf mi-foto.png mi-video.mp4
        const ext = file.originalname.split(".").pop(); // devolver {"name", "png"} .pop devuelve el ultimo elemento del array
        const filename = `file-${Date.now()}.${ext}`
        cb(null, filename)

    },
});

const uploadMiddleware = multer({ storage });

module.exports = uploadMiddleware;