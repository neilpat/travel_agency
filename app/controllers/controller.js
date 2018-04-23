async function getDogs(req, res)	{
	res.status(200).json({"DOGS": ["bob", "jope"]});
}

async function postDogs(req, res)	{
	var username = req.body.username;
	res.status(200).json({"name": username});
}

module.exports.getDogs = getDogs;
module.exports.postDogs = postDogs;
