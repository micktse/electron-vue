#!/usr/bin/env node
const electron = require('electron')
const spawn = require('./node_modules/cross-spawn')
const argv = process.argv.slice(2)

const result = spawn.sync(electron, [require.resolve('./app')].concat(argv), { stdio: 'ignore' })

process.exit(result.status)
