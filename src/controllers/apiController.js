
const Project = require("../models/project");
const User = require("../models/user");


const { uploadSingleFile, uploadMultipleFiles } = require("../services/fileService");

const getUsersAPI = async (req, res) => {
    let results = await User.find({});

    return res.status(200).json({
        errorCode: 0,
        data: results
    });
}

const postCreateUsersAPI = async (req, res) => {
    let { fullname, email, password, phone, address, role } = req.body;

    let user = await User.create({
        fullname,
        email,
        password,
        phone,
        address
    });

    return res.status(200).json({
        errorCode: 0,
        data: user
    });
}

const putUpdateUserAPI = async (req, res) => {

    let { fullname, email, password, phone, address, role } = req.body;
    let userId = req.body.userId;

    // ở đây nó dùng 2 object, 1 là dkien tìm kiếm document cần cập nhật, 2 là dl mới cần cập nhật
    let user = await User.updateOne({ _id: userId }, { fullname: fullname, email: email, password: password, phone: phone, address });

    return res.status(200).json({
        errorCode: 0,
        data: user
    });
}


const deleteUserAPI = async (req, res) => {
    const userId = req.body.userId;

    let result = await User.deleteOne({
        _id: userId
    });

    return res.status(200).json({
        errorCode: 0,
        data: result
    });
}


const postUploadSingleFileApi = async (req, res) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let result = await uploadSingleFile(req.files.image);
    console.log(">>> check result: ", result);

    return res.send("ok single");
}

const postUploadMultipleFilesApi = async (req, res) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // nếu req.files.image là một array tức là nó chứa nhiều hình ảnh -> upload multiple file
    if (Array.isArray(req.files.image)) {
        console.log("check req.files.image:", req.files.image);
        let result = await uploadMultipleFiles(req.files.image);
        return res.status(200).json({
            EC: 0,
            data: result
        });
    }
    else {
        return await postUploadSingleFileApi(req, res);
    }
}



const getProjectsAPI = async (req, res) => {
    let results = await Project.find({});

    return res.status(200).json({
        errorCode: 0,
        data: results
    });
}




module.exports = {
    getUsersAPI, postCreateUsersAPI, putUpdateUserAPI, deleteUserAPI, postUploadSingleFileApi, getProjectsAPI, postUploadMultipleFilesApi
}