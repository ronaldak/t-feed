const cli = require('./cli');

const main = function()
{
	const config = cli.parseArguments();

	process.exit(0);
};

main();
