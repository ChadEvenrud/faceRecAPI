const handleImage = (db) => (req, res) => {
    const { id } = req.body;
    db("users")
        .where("id", "=", id)
        .increment("entries", 1)
        .returning("entries")
        .then((entries) => {
            console.log(entries);
        })
        .then(res.json("You did it"));
};

export default handleImage;