
const util = require('util');
const execFile = util.promisify(require('child_process').execFile);

function getAllowances(res) {
   var config_result = {}
   getAllowanceAsync("_morning").then(function(morning) {
	config_result['morningMinutes'] = morning; 
   }).then(function () {
   getAllowanceAsync("_afternoon").then(function(afternoon) {
 //    console.log('getAllowance afternoon returned ' + afternoon); 
    config_result['afternoonMinutes'] = afternoon; 
	res.json(config_result)
   });
   })
}

function setAllowance(payload, res) {
	config_result = {};
	setAllowanceAsync("_morning", payload.morningMinutes).then(function (morning) {
	  config_result['morningMinutes'] = morning;
	  console.log('returned from setAllowanceAsync'); 
	}).then( function() {
		setAllowanceAsync("_afternoon",payload.afternoonMinutes).then(function(afternoon) {
			config_result['afternoon_minutes'] = afternoon;
			res.json(config_result);
		});
	});
}

async function getAllowanceAsync(suffix) {
  const promise = execFile("cscript.exe", ['//NoLogo','getAllowance.vbs',suffix]);
  const child = promise.child;
  const { stdout, stderr } = await promise;
  return stdout
}

async function setAllowanceAsync(key, value) {
  const promise = execFile("cscript.exe", ['//NoLogo','setAllowance.vbs',key, value]);
  const child = promise.child;
  const { stdout, stderr } = await promise;
  return stdout
}

exports.getAllowances = getAllowances;
exports.setAllowance = setAllowance;
//exports.postAllowance = postAllowance;