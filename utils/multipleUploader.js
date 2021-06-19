
const path = require("path")
const multer = require("multer")
const createError = require('http-errors')

function uploader(subfolderpath, allowed_file_type, max_file_size, max_file_number, err_msg) {

    // file upload path
    const UPLOADS_FOLDER = `${__dirname}/../public/uploads/${subfolderpath}/`;

    // define storage
    const storage = multer.diskStorage({

        destination: (req, file, cb) => {
            cb(null, UPLOADS_FOLDER)
        },

        filename: (req, file, cb) => {
            const fileExt = path.extname(file.originalname)
            let fileName = file.originalname
                .replace(fileExt, "")
                .toLowerCase()
                .split(" ")
                .join("-") + "-" + Date.now()

            cb(null, fileName + fileExt)
        }
    })

    // multer upload object
    const upload = multer({
        storage: storage,
        limits: {
            fileSize: max_file_size
        },
        fileFilter: (req, file, cb) => {
            if ( req.files.length > max_file_number ) {
                cb(createError(`Maximum ${max_file_number} files are allowed!`))
            } else {
                if(allowed_file_type.includes(file.mimetype)) {
                    cb(null, true)
                } else {
                    cb(createError(err_msg))
                }
            }
        }
    })

    return upload
}

module.exports = uploader




// // external imports
// const multer = require("multer");
// const path = require("path");
// const createError = require("http-errors");

// function uploader(
//     subfolder_path,
//     allowed_file_types,
//     max_file_size,
//     max_number_of_files,
//     error_msg
// ) {
//     // File upload folder
//     const UPLOADS_FOLDER = `${__dirname}/../public/uploads/${subfolder_path}/`;

//     // define the storage
//     const storage = multer.diskStorage({
//         destination: (req, file, cb) => {
//             cb(null, UPLOADS_FOLDER);
//         },
//         filename: (req, file, cb) => {
//             const fileExt = path.extname(file.originalname);
//             const fileName =
//                 file.originalname
//                     .replace(fileExt, "")
//                     .toLowerCase()
//                     .split(" ")
//                     .join("-") +
//                 "-" +
//                 Date.now();

//             cb(null, fileName + fileExt);
//         },
//     });

//     // preapre the final multer upload object
//     const upload = multer({
//         storage: storage,
//         limits: {
//             fileSize: max_file_size,
//         },
//         fileFilter: (req, file, cb) => {
//             if (req.files.length > max_number_of_files) {
//                 cb(
//                     createError(
//                         `Maximum ${max_number_of_files} files are allowed to upload!`
//                     )
//                 );
//             } else {
//                 if (allowed_file_types.includes(file.mimetype)) {
//                     cb(null, true);
//                 } else {
//                     cb(createError(error_msg));
//                 }
//             }
//         },
//     });

//     return upload;
// }

// module.exports = uploader;

