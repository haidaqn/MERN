//
const notFoundPath = (req, res, next) => {
    const err = new Error(`route ${req.originalUrl} not found !`);
    res.status(404);
    next(err);
};

const errHandler = (err, req,res,next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // check statusCode
    res.status(statusCode).json({
        success: false,
        message: err?.message
    });

}

module.exports = { notFoundPath, errHandler };