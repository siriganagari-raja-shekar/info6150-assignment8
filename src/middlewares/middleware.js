const errorMiddleware = (err, req, res, next) =>{
    console.log(err);
    return res.status(501).json({
        error: "Some error occured during the operation. Please try again later"
    });
}

const undefinedRouteHandler = (req, res) =>{
    res.status(404).json({
        error: "Request is not valid. Please try another route"
    })
}

module.exports = {
    errorMiddleware: errorMiddleware,
    undefinedRouteHandler: undefinedRouteHandler
}