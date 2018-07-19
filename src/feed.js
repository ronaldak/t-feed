const Feed = function(users, tweets)
{
	this._users = users;
	this._tweets = tweets;
};

Feed.prototype.for = function *(user)
{
	/* Iterate over all tweets, emitting a tweet if the given user is the author
	   or follows the tweet's author */
	for (const tweet of this._tweets)
	{
		if (user === tweet.author || this._users.isFollower(user, tweet.author))
			yield tweet;
	}
};

module.exports = Feed;
