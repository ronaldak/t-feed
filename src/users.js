const _ = require("lodash");
const fs = require("fs");
const util = require("util");

const freadFile = util.promisify(fs.readFile);

const Users = function()
{
	this._followerMap = {};
};

Users.prototype.parseFile = async function(userFile)
{
	let data;

	try
	{
		data = await freadFile(userFile, { encoding: "ASCII" });
	}
	catch (error)
	{
		throw new Error("Error parsing user file");
	}

	this._parseData(data);
};

Users.prototype._parseData = function(data)
{
	this._followerMap = _.reduce(_.split(data, "\n"), (followersMap, line) => {
		if (line.length > 0)
		{
			const parts = _.compact(_.split(line, / |,|follows/));

			if (!this._validateLine(parts))
				throw new Error("Invalid line encountered in user file");

			_.forEach(parts, part => {
				if (!(part in followersMap))
					followersMap[part] = [];
			});

			followersMap[parts[0]] = _.union(followersMap[parts[0]], _.slice(parts, 1));
		}

		return followersMap;
	}, {});
};

Users.prototype._validateLine = function(line)
{
	let valid = true;

	if (line.length < 2)
		valid = false;

	return valid;
};

Users.prototype.toSortedList = function *()
{
	const sortedList = _.keys(this._followerMap).sort();

	for (let i = 0; i < sortedList.length; i++)
		yield sortedList[i];
};

Users.prototype.isFollower = function(user1, user2)
{
	return user1 in this._followerMap && _.includes(this._followerMap[user1], user2);
};

Users.prototype.toJSON = function()
{
	return this._followerMap;
};

module.exports = Users;
