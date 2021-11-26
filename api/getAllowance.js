const execFile = require("child_process").execFile;

const child=execFile("cscript.exe", ['//NoLogo','getAllowance.vbs','_morning'], (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});