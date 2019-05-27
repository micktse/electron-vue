process.env.NODE_ENV = 'development'
const { spawn } = require('child_process')
const electron = require('electron')
let { stdout } = spawn('yarn', ['serve'])
let i = 0
let j = 0
stdout.on('data', chunk => {
	i++
	if (chunk.toString().trim() !== '') console.log(chunk.toString())
})
let start = function() {
	if (i === j) {
		spawn(electron, [`${__dirname}/index.js`])
	} else {
		j = i
		setTimeout(start, 3000)
	}
}
setTimeout(start, 3000)
