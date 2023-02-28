

function router(app) {

    app.use('/', (req,res) => {
        res.json("hải đăng là tôi")
    });
}

module.exports = router;