
const util = require('util');
const execFile = util.promisify(require('child_process').execFile);

module.exports =  function(res) {
   var result = {
	   running: false
   }
   lockScreen().then(function(status) {
     console.log('lock returned ' + status);  
	if (status) {
		result.running=true;
	}
	res.json(result)
   });
}

async function lockScreen() {
  const promise = execFile("cscript.exe", ['//NoLogo','lock.vbs']);
  const child = promise.child;
  const { stdout, stderr } = await promise;
  return stdout
}