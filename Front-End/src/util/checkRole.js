function cutHost() {
  const Host = window.location.host.split('.')
  console.log('host='+window.location.host)
  console.log('islocalhost'+isLocalhost());
  if(isLocalhost() == true){
    return 'admin.localhost';
  }else if (Host.length > 1) {
    const checkIndexSandbox = Host[0].indexOf('sandbox')
    if (checkIndexSandbox >= 0) {
      const cutSandbox = Host[0].split('-')
      return cutSandbox[0]
    } else {
      return Host[0]
    }
  }
 }
function isLocalhost() {
  const Host = window.location.host.split('.');
  const ipAddress = Host[0];

  // Kiểm tra xem IP có thuộc các dải địa chỉ '192..' hoặc '172..'
  if (ipAddress.startsWith('192') || ipAddress.startsWith('172') || ipAddress.startsWith('10')) {
    return true;
  }
  
  // Kiểm tra xem hostname có phải là "localhost" hoặc "127.0.0.1"
  if (ipAddress === 'localhost' || ipAddress === '127') {
    return true;
  }

  // Kiểm tra xem hostname có chứa "localhost" (ví dụ: localhost:3000)
  if (Host.includes('localhost')) {
    return true;
  }

  // Nếu không thỏa mãn các điều kiện trên, trang web không đang chạy trên localhost
  return false;
}



export default () => {
  return cutHost()
  // return 'manager'
}
