module.exports = async (req, res) => {
    console.log('authReq', req.session.userId)
    if (req.session.userId) {
        return res.json({
            authenticated: true
        })
    }

    return res.json({
        authenticated: false
    })
};