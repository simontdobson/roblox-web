
const util = require('util');
const execFile = util.promisify(require('child_process').execFile);

module.exports =  function(res) {
   var result = {
	   running: false
   }
   getStatus().then(function(status) {
     console.log('getStatus returned ' + status);  
	if (status) {
		result.running=true;
	}
	res.json(result)
   });
}

async function getStatus() {
  const promise = execFile("cscript.exe", ['//NoLogo','queryProcess.vbs']);
  const child = promise.child;
  const { stdout, stderr } = await promise;
  return stdout
}