const _ = require("lodash");
const fs = require("fs");
const util = require("util");

const freadFile = util.promisify(fs.readFile);

const Tweets = function()
{
	this._tweetList = [];
};

Tweets.prototype.parseFile = async function(tweetFile)
{
	let data;

	try
	{
		data = await freadFile(tweetFile, { encoding: "ASCII" });
	}
	catch (error)
	{
		throw new Error("Error parsing tweet file");
	}

	this._parseData(data);
};

Tweets.prototype._parseData = function(data)
{
	this._tweetList = _.compact(_.map(_.split(data, "\n"), line => {
		let tweet;

		if (line.length > 0)
		{
			const parts = _.invokeMap(_.split(line, ">"), "trim");

			if (!this._validateLine(parts))
				throw new Error("Invalid line encountered in tweet file");

			tweet = {
				author: parts[0],
				message: parts[1],
			};
		}

		return tweet;
	}));
};

Tweets.prototype._validateLine = function(line)
{
	let valid = true;

	if (line.length !== 2)
		valid = false;
	else if (line[0].length === 0)
		valid = false;
	else if (line[1].length === 0 || line[1].length > 140)
		valid = false;

	return valid;
};

Tweets.prototype.toJSON = function()
{
	return this._tweetList;
};

module.exports = Tweets;
