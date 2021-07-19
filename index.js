#!/usr/bin/env node

// NOTE: The official inquirer documentation is really good. To know more about the different question types,
// please refer to https://www.npmjs.com/package/inquirer#prompt-types

const program = require('commander')
const inquirer = require('inquirer')
const clipboardy = require('clipboardy')
const awsRegions = require('./src/aws/regions')
const gcpRegions = require('./src/gcp/regions')
require('colors')
const { version } = require('./package.json')
program.version(version) // This is required is you wish to support the --version option.

inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'))

const chooseRegions = async regions => {
	const { region } = await inquirer.prompt([
		{ 
			type: 'autocomplete', 
			name: 'region', 
			message: 'Select a region:',
			pageSize: 20,
			source: function(answersSoFar, input) {
				if (input) 
					return regions.filter(r => `${r.code} - ${r.name}`.toLowerCase().indexOf(input.toLowerCase()) >= 0).map(r => ({
						name: `${r.code} - ${r.name}`,
						value:r.code
					}))
				else
					return regions.map(r => ({
						name: `${r.code} - ${r.name}`,
						value:r.code
					}))
			}
		}
	])

	return region
}

// 1. Creates your first command. This example shows an 'order' command with a required argument
// called 'product' and an optional argument called 'option'.
program
	.command('select')
	.description('Default behavior. List the existing regions for either AWS or Google Cloud. Equivalent to `npx get-regions`') // Optional description
	.action(async () => {
		const { cloud } = await inquirer.prompt([{
			type: 'list',
			name: 'cloud',
			message: 'Select a Cloud provider: ',
			pageSize: 2,
			choices:['AWS', 'GCP (Google Cloud Platform)']
		}])

		const regions = cloud == 'AWS' ? awsRegions : gcpRegions
		const region = await chooseRegions(regions)

		clipboardy.writeSync(region)

		console.log(`${region.bold} copied to your clipboard`.green)
	})

// 2. Deals with cases where no command is passed.
if (process.argv.length == 2)
	process.argv.push('select')

// 3. Starts the commander program
program.parse(process.argv) 





