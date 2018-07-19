const Feed = function(users, tweets)
{
	this._users = users;
	this._tweets = tweets;
};

Feed.prototype.for = function *(user)
{
	for (const tweet of this._tweets)
	{
		if (user === tweet.author || this._users.isFollower(user, tweet.author))
			yield tweet;
	}
};

module.exports = Feed;
