const _ = require("lodash");
const fs = require("fs");
const util = require("util");

const freadFile = util.promisify(fs.readFile);

const TWEET_LINE_LENGTH = 2;
const MIN_TWEET_MESSAGE_LENGTH = 1;
const MAX_TWEET_MESSAGE_LENGTH = 140;
const MIN_TWEET_AUTHOR_LENGTH = 1;

const Tweets = function()
{
	this._tweetList = [];
};

Tweets.prototype.loadFromFile = async function(tweetFile)
{
	let data;

	try
	{
		data = await freadFile(tweetFile, { encoding: "ASCII" });
	}
	catch (error)
	{
		throw new Error("cannot read tweet file");
	}

	this._parseData(data);
};

Tweets.prototype._parseData = function(data)
{
	this._tweetList = _.compact(_.map(_.split(data, "\n"), line => {
		let tweet;

		// Consider only non-empty lines
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

	if (line.length !== TWEET_LINE_LENGTH)
		valid = false;
	else if (line[0].length < MIN_TWEET_AUTHOR_LENGTH)
		valid = false;
	else if (line[1].length < MIN_TWEET_MESSAGE_LENGTH || line[1].length > MAX_TWEET_MESSAGE_LENGTH)
		valid = false;

	return valid;
};

Tweets.prototype[Symbol.iterator] = function *() {
	for (let i = 0; i < this._tweetList.length; i++)
		yield this._tweetList[i];
};

Tweets.prototype.toJSON = function()
{
	return this._tweetList;
};

module.exports = Tweets;
