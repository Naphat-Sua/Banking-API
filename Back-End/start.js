const { exec } = require('child_process');

const command = 'nohup npm run start:prod > bankend.log 2>&1 & echo $! > bankend_id.txt';

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Exec error: ${error}`);
    return;
  }

  console.log(`Start bankend is  listening port 8000`);
  //console.error(`stderr: ${stderr}`);
});
