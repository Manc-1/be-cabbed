

exports.sendUserById = (req, res, next) => {
    const {_id} = req.params;
    getUserById({_id}).then((user) => {
        res.status(200).send({user})
    })
    .catch((err) => {
        console.log(err)
    })

    console.log('in controllers')
}