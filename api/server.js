const http = require('http');
const { exec } = require("child_process");
const fs = require('fs');

const hostname = 'DESKTOP-E1GJEEI';
const port = 3000;

const server = http.createServer((req, res) => {

  req.on('error', (err) => {
    console.error(err);
    res.statusCode = 400;
    res.end();
  });
    res.statusCode = 200; 
    res.setHeader('Content-Type', 'text/html');
    try {
        var today = getDayOfYear(new Date()); 
        res.write('<html>');
        res.write('<body>');
        console.log('Day of year today: ' + today);
        fs.readFile('c:\\scripts\\roblox.log', 'UTF-8', (err,data) => {
          const lines = data.split(/\r?\n/);
          lines.forEach((line) => {
            if (line.startsWith('Start')) {
                const cols = line.split(',');
                timestamp = cols[1];
                d = new Date(Date.parse(timestamp));
                logday = getDayOfYear(d);
                if (logday == today) {
                  executable = cols[5];
                  pid = cols[3];
                  console.log("Started at " + timestamp + " " + executable + " " + logday);
                  res.write(pid + ',Start at ' + timestamp + '\n');
                  res.write('<br>');
                }
            } else if (line.startsWith('End')) {
                const cols = line.split(',');
                timestamp = cols[1];
                d = new Date(Date.parse(timestamp));
                logday = getDayOfYear(d);
                if (logday == today) {
                  seconds = cols[2]
                  pid = cols[3];
                  executable = cols[4];
                  console.log("Ended at " + timestamp + " " + executable + " " + seconds + " seconds" + " " + logday);
                  res.write(pid + ',Ended at ' + timestamp + ' ' + seconds + '\n');
                  res.write('<br>');
                }
            }
        });
        res.write('</body>');
        res.write('</html>');
        res.end();
    });    

      } catch (err) {
        console.error(err);
      }
     
//    
//    exec("type c:\\scripts\\roblox.log", (error, stdout, stderr) => {
//    if (error) {
//        console.log(`error: ${error.message}`);
//        return;
//    }
//    if (stderr) {
//        console.log(`stderr: ${stderr}`);
//        return;
//    }
//    console.log(`stdout: ${stdout}`);
//    });
//  });


  res.on('error', (err) => {
    console.error(err);
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function getDayOfYear(adate) {
        var start = new Date(adate.getFullYear(), 0, 0);
        var diff = (adate - start) + ((start.getTimezoneOffset() - adate.getTimezoneOffset()) * 60 * 1000);
        var oneDay = 1000 * 60 * 60 * 24;
        var day = Math.floor(diff / oneDay);
        return day;
}