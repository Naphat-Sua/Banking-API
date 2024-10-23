export default (req, file, callback) => {
    if (!file.originalname.match(/\.(csv)$/)) {
        return callback(new Error('Only csv files are allowed!'), false);
    }
    callback(null, true);
};
