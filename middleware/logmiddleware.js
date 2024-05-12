const requireLogin = (req, res, next) => {
    try {
        if (req.session && req.session.user) {
            const x = next();
        } else {
            throw { error: "Unauthorised login", statusCode: 401 };
        }
    } catch (error) {
        console.log("requireLogin", error);
        return res.status(error.statusCode).send({ error: error.error, status: false });
    }

}


module.exports = requireLogin;