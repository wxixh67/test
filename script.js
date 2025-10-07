// 动态更新时间显示
function updateTime() {
    const currentTime = new Date();
    const formattedTime = currentTime.getFullYear() + '-' +
        String(currentTime.getMonth() + 1).padStart(2, '0') + '-' +
        String(currentTime.getDate()).padStart(2, '0') + ' ' +
        String(currentTime.getHours()).padStart(2, '0') + ':' +
        String(currentTime.getMinutes()).padStart(2, '0') + ':' +
        String(currentTime.getSeconds()).padStart(2, '0');
    document.getElementById('current-time').textContent = formattedTime;
}

// 每秒更新时间
setInterval(updateTime, 1000);
updateTime();

// 搜索框动态提示
document.getElementById('search').addEventListener('input', function(event) {
    const query = event.target.value;
    console.log('搜索内容: ', query); // 这里可以将搜索内容与实际功能绑定
});
