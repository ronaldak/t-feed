const ArgumentParser = require('argparse').ArgumentParser;

const version = require('../version');

const parseArguments = function()
{
	const parser = new ArgumentParser({
	  version,
	  addHelp: true,
	  description: 'Twitter feed simulator'
	});

	parser.addArgument(
	  'userFile',
	  {
	    help: 'path to user file'
	  }
	);

	parser.addArgument(
	  'tweetFile',
	  {
	    help: 'path to tweet file'
	  }
	);

	return parser.parseArgs();
};

module.exports = { parseArguments };
