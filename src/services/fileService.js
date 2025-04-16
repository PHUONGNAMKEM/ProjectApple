
const path = require('path');
const fs = require('fs').promises;

const uploadSingleFile = async (fileObject) => {

    let uploadPath = path.resolve(__dirname, '../public/images/upload');

    // get image extension - lấy tên mở rộng
    let extName = path.extname(fileObject.name);

    // lấy ra tên ban đầu
    let baseName = path.basename(fileObject.name, extName);

    // 
    let finalName = `${baseName}-${Date.now()}${extName}`;
    let finalPath = `${uploadPath}/${finalName}`;

    try {
        await fileObject.mv(finalPath);
        return {
            status: "success",
            path: finalName,
            error: null
        }

    } catch (err) {
        console.log(">>> check error: ", err);
        return {
            status: "failed",
            path: null,
            error: JSON.stringify(err)
        }
    }
}
// My uploadSingleFile
// const uploadSingleFile = async (fileObject) => {
//     // let uploadPath = __dirname + "/" + fileObject.name;

//     // cách 1:
//     // Lấy ngày hiện tại
//     const now = new Date();
//     const day = String(now.getDate()).padStart(2, '0'); // luôn trả về ngày có 2 chữ số - 04, 05, ...
//     const month = String(now.getMonth() + 1).padStart(2, '0'); // getMonth() trả về 0-11, nên +1
//     const year = now.getFullYear(); // Ví dụ: 2025

//     console.log("day: ", day);
//     console.log("month: ", month);
//     console.log("year: ", year);

//     // Tạo chuỗi định dạng ngày: DD-MM-YYYY
//     const dateFormatted = `${day}-${month}-${year}`;
//     console.log("dateFormatted: ", dateFormatted);

//     // cách 2:
//     // const timestamp = Date.now();

//     // Tạo đường dẫn để kiểm tra xem đã tồn tại hay chưa
//     let uploadDir = path.join(__dirname, "../public/images/upload");


//     try {
//         // Kiểm tra xem đường dẫn đã tồn tại chưa nếu chưa thì tạo mới nó
//         await fs.mkdir(uploadDir, { recursive: true });

//         let uploadPath = path.join(uploadDir, `${dateFormatted}_${fileObject.name}`);
//         console.log(">>> check uploadPath:", uploadPath);

//         await fileObject.mv(uploadPath);
//         return {
//             status: "success",
//             path: `/public/images/upload/${fileObject.name}`,
//             error: null
//         }

//     } catch (err) {
//         console.log(">>> check error: ", err);
//         return {
//             status: "failed",
//             path: null,
//             error: JSON.stringify(err)
//         }
//     }
// }


const uploadMultipleFiles = async (filesArr) => {

    try {
        let uploadPath = path.resolve(__dirname, '../public/images/upload');
        let resultArr = [];
        let countSuccess = 0;
        for (let i = 0; i < filesArr.length; i++) {
            // get image extension - lấy tên mở rộng
            let extName = path.extname(filesArr[i].name);

            // lấy ra tên ban đầu
            let baseName = path.basename(filesArr[i].name, extName);

            // 
            let finalName = `${baseName}-${Date.now()}${extName}`;
            let finalPath = `${uploadPath}/${finalName}`;


            console.log(">>> check __dirname: ", __dirname);
            console.log(">>> check extName: ", extName); // đuôi định dạng ảnh vd: .png
            console.log(">>> check baseName: ", baseName); // tên ảnh: map
            console.log(">>> check finalName: ", finalName); //
            console.log(">>> check finalPath: ", finalPath);

            try {
                await filesArr[i].mv(finalPath);
                resultArr.push({
                    status: 'success',
                    path: finalName,
                    filename: filesArr[i].name,
                    error: null
                })
                countSuccess++;
            } catch (err) {
                resultArr.push({
                    status: 'failed',
                    path: null,
                    filename: filesArr[i].name,
                    error: JSON.stringify(err)
                })
            }
        }

        return {
            countSuccess: countSuccess,
            detail: resultArr
        }

    } catch (error) {
        console.log(error);
    }
}

// My uploadMultipleFiles
// const uploadMultipleFiles = async (fileObject) => {
//     let results = [];

//     if (!Array.isArray(fileObject)) {
//         fileObject = [fileObject];
//     }

//     console.log("fileobject: ", fileObject); // [{img_inf_1, img_inf2}]
//     console.log("typeof fileobject: ", typeof fileObject); // object

//     for (let file of fileObject) {
//         const result = uploadSingleFile(file);
//         results.push(result);
//     }

//     return {
//         status: "success",
//         path: `/public/images/upload/`,
//         error: null
//     }
// }

module.exports = {
    uploadSingleFile,
    uploadMultipleFiles
}