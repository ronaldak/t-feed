const { ArgumentParser } = require("argparse");

// If the following module is missing, you probably haven't run 'npm run-script build'
const version = require("../version");

const parseArguments = function()
{
	const parser = new ArgumentParser({
		version: version,
		addHelp: true,
		description: "Twitter feed simulator",
	});

	parser.addArgument("userFile", { help: "path to user file" });
	parser.addArgument("tweetFile", { help: "path to tweet file" });

	return parser.parseArgs();
};

module.exports = { parseArguments };
