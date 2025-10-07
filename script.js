// Update time display
function updateTime() {
    const now = new Date();
    const timeString = now.toISOString().replace('T', ' ').slice(0, 19);
    document.getElementById('current-time').textContent = timeString;
}

// Initialize time display and update every second
updateTime();
setInterval(updateTime, 1000);

// Search functionality
document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== document.getElementById('search')) {
        e.preventDefault();
        document.getElementById('search').focus();
    }
});

document.getElementById('search').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const query = e.target.value;
        if (query) {
            window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        }
    }
});