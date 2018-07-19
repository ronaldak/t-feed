const _ = require("lodash");
const fs = require("fs");
const util = require("util");

const freadFile = util.promisify(fs.readFile);

const MIN_USER_LINE_LENGTH = 1;

const Users = function()
{
	this._followerMap = {};
};

Users.prototype.loadFromFile = async function(userFile)
{
	let data;

	try
	{
		data = await freadFile(userFile, { encoding: "ASCII" });
	}
	catch (error)
	{
		throw new Error("cannot read user file");
	}

	this._parseData(data);
};

Users.prototype._parseData = function(data)
{
	this._followerMap = _.reduce(_.split(data, "\n"), (followersMap, line, index) => {
		// Consider only non-empty lines
		if (line.length > 0)
		{
			const parts = _.compact(_.split(line, / |,|follows/i));
			const validationError = this._validateLine(parts);

			if (!_.isNil(validationError))
				throw new Error("User file, line " + (index + 1) + ": " + validationError);

			/* Ensure that every user mentioned anywhere in the user file is recorded
			   in the followers map */
			_.forEach(parts, part => {
				if (!(part in followersMap))
					followersMap[part] = [];
			});

			/* Ensure that we gather all of a user's follows in cases where a user is
         mentioned on multiple lines */
			followersMap[parts[0]] = _.union(followersMap[parts[0]], _.slice(parts, 1));
		}

		return followersMap;
	}, {});
};

Users.prototype._validateLine = function(line)
{
	let valid;

	if (line.length < MIN_USER_LINE_LENGTH)
		valid = "insufficient users";

	return valid;
};

Users.prototype.toSortedList = function *()
{
	// Sort by user name, in ascending order
	const sortedList = _.keys(this._followerMap).sort();

	for (let i = 0; i < sortedList.length; i++)
		yield sortedList[i];
};

Users.prototype.isFollower = function(user1, user2)
{
	// Is user1 a follower of user2?
	return user1 in this._followerMap && _.includes(this._followerMap[user1], user2);
};

Users.prototype.toJSON = function()
{
	return this._followerMap;
};

module.exports = Users;
