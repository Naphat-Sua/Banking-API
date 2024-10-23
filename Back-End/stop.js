const fs = require('fs');

// Đọc ID quá trình từ tệp process_id.txt
const processId = fs.readFileSync('bankend_id.txt', 'utf8').trim();

// Sử dụng child_process.spawn để chạy lệnh kill và dừng quá trình
const { spawn } = require('child_process');
const killProcess = spawn('kill', [processId]);

// Xử lý sự kiện khi quá trình dừng
killProcess.on('exit', (code, signal) => {
  if (signal) {
    console.log(`Quá trình đã được dừng bởi tín hiệu: ${signal}`);
  } else {
    console.log(`Quá trình đã được dừng với mã thoát: ${code}`);
  }
});
