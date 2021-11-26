const fs = require('fs');

module.exports = function(res) {
    var results = []
    try {
        var today = getDayOfYear(new Date()); 
        fs.readFile('c:\\scripts\\roblox.log', 'UTF-8', (err,data) => {
          const lines = data.split(/\r?\n/);
		  let sessionMap = new Map()
          lines.forEach((line) => {
            if (line.startsWith('Start')) {
                result = {}
                const cols = line.split(',');
                timestamp = cols[1];
                d = new Date(Date.parse(timestamp));
                logday = getDayOfYear(d);
                if (logday == today) {
                  executable = cols[5];
                  pid = cols[3];
                  console.log("Started at " + timestamp + " " + executable + " " + logday);
                  result.started = timestamp
                  result.pid = pid
				  sessionMap.set(pid, result);
 //                 res.write(pid + ',Start at ' + timestamp + '\n');
 //                 res.write('<br>');
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
				  result = sessionMap.get(pid);
				  if (result) {
                    result.ended = timestamp;
                    result.seconds = seconds;
				  } else
					  console.log('RobloxLog found end but no start for pid ' + pid);
                  //results.push(result)
                  console.log("Ended at " + timestamp + " " + executable + " " + seconds + " seconds" + " " + logday);
 //                 res.write(pid + ',Ended at ' + timestamp + ' ' + seconds + '\n');
 //                 res.write('<br>');
                }
            }
        });
		sessionMap.forEach(function(value,key) {
			results.push(value);
		});
      res.json(results);
      res.end();
      });
    } catch (err) {
        console.err(err);
    }
//    return result
}

function getDayOfYear(adate) {
        var start = new Date(adate.getFullYear(), 0, 0);
        var diff = (adate - start) + ((start.getTimezoneOffset() - adate.getTimezoneOffset()) * 60 * 1000);
        var oneDay = 1000 * 60 * 60 * 24;
        var day = Math.floor(diff / oneDay);
        return day;
}
