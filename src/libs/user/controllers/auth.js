module.exports = async (req, res) => {
    if (req.session.userId) {
        return res.json({
            authenticated: true
        })
    }

    return res.json({
        authenticated: false
    })
};
