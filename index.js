#!/usr/bin/env node

// NOTE: The official inquirer documentation is really good. To know more about the different question types,
// please refer to https://www.npmjs.com/package/inquirer#prompt-types

const program = require('commander')
const inquirer = require('inquirer')
const clipboardy = require('clipboardy')
const { awsRegions, gcpRegions } = require('./src')
require('colors')
const { version } = require('./package.json')
program.version(version) // This is required is you wish to support the --version option.

inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'))

const chooseRegions = async (cloud, regions) => {
	const { region } = await inquirer.prompt([
		{ 
			type: 'autocomplete', 
			name: 'region', 
			message: `Search ${cloud} availability zones & regions:`,
			pageSize: 20,
			source: function(answersSoFar, input) {
				if (input) 
					return regions
						.filter(r => `${r.az} (az) - ${r.region} (region): ${r.name}`.toLowerCase().indexOf(input.toLowerCase()) >= 0)
						.map(r => ({
							name: `${r.az} (az) - ${r.region} (region): ${r.name}`,
							value:r
						}))
						.sort((a,b) => a.value > b.value ? 1 : -1)
				else
					return regions
						.map(r => ({
							name: `${r.az} (az) - ${r.region} (region): ${r.name}`,
							value:r
						}))
						.sort((a,b) => a.value.az > b.value.az ? 1 : -1)
			}
		}
	])

	return region
}

// 1. Creates your first command. This example shows an 'order' command with a required argument
// called 'product' and an optional argument called 'option'.
program
	.command('select')
	.option('-a, --aws', 'Only list AWS regions')
	.option('-g, --gcp', 'Only list GCP regions')
	.description('Default behavior. List the existing regions for either AWS or Google Cloud. Equivalent to `npx get-regions`') // Optional description
	.action(async options => {
		const { aws, gcp } = options||{}
		let cloud = aws ? 'AWS' : gcp ? 'GCP' : null
		if (!cloud) {
			const resp = await inquirer.prompt([{
				type: 'list',
				name: 'cloud',
				message: 'Select a Cloud provider: ',
				pageSize: 2,
				choices:['AWS', 'GCP']
			}])
			cloud = resp.cloud
		}

		const regions = await (cloud == 'AWS' ? awsRegions : gcpRegions)
		const region = await chooseRegions(cloud, regions)

		clipboardy.writeSync(region.region)

		console.log(`${region.region.bold} copied to your clipboard`.green)
	})

// 2. Deals with cases where no command is passed.
const cmdArgs = [process.argv[0], process.argv[1]]
if (process.argv.length == 2)
	cmdArgs.push('select')
else if (process.argv.length > 2) {
	const thirdArg = (process.argv[2]||'').toLowerCase().trim()
	if (thirdArg == 'aws' || thirdArg == '--aws' || thirdArg == '-a')
		cmdArgs.push('select', '--aws')
	else if (thirdArg == 'gcp' || thirdArg == '--gcp' || thirdArg == '-g')
		cmdArgs.push('select', '--gcp')
	else
		cmdArgs.push(process.argv[2], process.argv[3])
}

// 3. Starts the commander program
program.parse(cmdArgs) 





