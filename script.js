// 动态显示当前时间
function updateTime() {
  const now = new Date();
  const timeString = now.getFullYear() + '-' + 
                     String(now.getMonth() + 1).padStart(2, '0') + '-' + 
                     String(now.getDate()).padStart(2, '0') + ' ' + 
                     String(now.getHours()).padStart(2, '0') + ':' + 
                     String(now.getMinutes()).padStart(2, '0') + ':' + 
                     String(now.getSeconds()).padStart(2, '0');
  document.getElementById('current-time').textContent = timeString;
}

// 每秒更新一次时间
setInterval(updateTime, 1000);
updateTime(); // 初始化时立即显示时间
