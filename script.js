// 初始导航数据
let navigationData = {
    categories: ['工作', '学习', '娱乐', '工具', '社交'],
    links: [
        {
            id: 1,
            name: 'GitHub',
            url: 'https://github.com',
            category: '工作',
            color: '#333333'
        },
        {
            id: 2,
            name: 'MDN',
            url: 'https://developer.mozilla.org',
            category: '学习',
            color: '#83bfff'
        },
        {
            id: 3,
            name: 'YouTube',
            url: 'https://youtube.com',
            category: '娱乐',
            color: '#ff0000'
        },
        {
            id: 4,
            name: 'ChatGPT',
            url: 'https://chat.openai.com',
            category: '工具',
            color: '#74aa9c'
        },
        {
            id: 5,
            name: 'Twitter',
            url: 'https://twitter.com',
            category: '社交',
            color: '#1da1f2'
        }
    ]
};

// DOM 元素
const categoryNav = document.getElementById('categoryNav');
const linksGrid = document.getElementById('linksGrid');
const searchInput = document.getElementById('searchInput');
const addBtn = document.getElementById('addBtn');
const addModal = document.getElementById('addModal');
const linkForm = document.getElementById('linkForm');
const cancelBtn = document.getElementById('cancelBtn');
const linkCategorySelect = document.getElementById('linkCategory');

// 初始化应用
function initApp() {
    loadFromLocalStorage();
    renderCategories();
    renderLinks();
    setupEventListeners();
}

// 从本地存储加载数据
function loadFromLocalStorage() {
    const savedData = localStorage.getItem('personalNavigation');
    if (savedData) {
        navigationData = JSON.parse(savedData);
    }
}

// 保存数据到本地存储
function saveToLocalStorage() {
    localStorage.setItem('personalNavigation', JSON.stringify(navigationData));
}

// 渲染分类导航
function renderCategories() {
    categoryNav.innerHTML = '';
    
    // 添加"全部"分类
    const allBtn = document.createElement('button');
    allBtn.className = 'category-btn active';
    allBtn.textContent = '全部';
    allBtn.addEventListener('click', () => filterLinks('all'));
    categoryNav.appendChild(allBtn);
    
    // 添加其他分类
    navigationData.categories.forEach(category => {
        const btn = document.createElement('button');
        btn.className = 'category-btn';
        btn.textContent = category;
        btn.addEventListener('click', () => filterLinks(category));
        categoryNav.appendChild(btn);
    });
    
    // 更新表单中的分类选项
    updateCategorySelect();
}

// 更新表单中的分类选项
function updateCategorySelect() {
    linkCategorySelect.innerHTML = '<option value="">选择分类</option>';
    navigationData.categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        linkCategorySelect.appendChild(option);
    });
}

// 渲染链接卡片
function renderLinks(filteredLinks = null) {
    const linksToRender = filteredLinks || navigationData.links;
    
    linksGrid.innerHTML = '';
    
    if (linksToRender.length === 0) {
        linksGrid.innerHTML = `
            <div class="no-links">
                <p>暂无链接，点击右下角 + 按钮添加</p>
            </div>
        `;
        return;
    }
    
    linksToRender.forEach(link => {
        const card = document.createElement('div');
        card.className = 'link-card';
        card.style.setProperty('--card-accent', link.color);
        
        card.innerHTML = `
            <div class="link-header">
                <div class="link-icon" style="background: ${link.color}">
                    ${link.name.charAt(0).toUpperCase()}
                </div>
                <div class="link-content">
                    <h3>${link.name}</h3>
                    <span class="category">${link.category}</span>
                </div>
            </div>
            <div class="link-url">${link.url}</div>
            <div class="link-actions">
                <a href="${link.url}" target="_blank" class="delete-btn" style="background: var(--primary-color); text-decoration: none;">
                    访问
                </a>
                <button class="delete-btn" onclick="deleteLink(${link.id})">
                    删除
                </button>
            </div>
        `;
        
        linksGrid.appendChild(card);
    });
}

// 过滤链接
function filterLinks(category) {
    // 更新活跃的分类按钮
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    if (category === 'all') {
        renderLinks();
    } else {
        const filteredLinks = navigationData.links.filter(link => link.category === category);
        renderLinks(filteredLinks);
    }
}

// 搜索功能
function setupSearch() {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        if (searchTerm === '') {
            renderLinks();
            return;
        }
        
        const filteredLinks = navigationData.links.filter(link => 
            link.name.toLowerCase().includes(searchTerm) || 
            link.url.toLowerCase().includes(searchTerm) ||
            link.category.toLowerCase().includes(searchTerm)
        );
        
        renderLinks(filteredLinks);
    });
}

// 添加新链接
function setupAddLink() {
    addBtn.addEventListener('click', () => {
        addModal.classList.add('show');
    });
    
    cancelBtn.addEventListener('click', () => {
        addModal.classList.remove('show');
        linkForm.reset();
    });
    
    linkForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('linkName').value;
        const url = document.getElementById('linkUrl').value;
        const category = document.getElementById('linkCategory').value;
        const color = document.getElementById('linkColor').value;
        
        // 验证URL格式
        if (!isValidUrl(url)) {
            alert('请输入有效的网址（以 http:// 或 https:// 开头）');
            return;
        }
        
        const newLink = {
            id: Date.now(), // 使用时间戳作为简单ID
            name,
            url: url.startsWith('http') ? url : `https://${url}`,
            category,
            color
        };
        
        navigationData.links.push(newLink);
        saveToLocalStorage();
        renderLinks();
        
        addModal.classList.remove('show');
        linkForm.reset();
    });
}

// URL验证
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

// 删除链接
function deleteLink(id) {
    if (confirm('确定要删除这个链接吗？')) {
        navigationData.links = navigationData.links.filter(link => link.id !== id);
        saveToLocalStorage();
        renderLinks();
    }
}

// 设置事件监听器
function setupEventListeners() {
    setupSearch();
    setupAddLink();
    
    // 点击模态框外部关闭
    addModal.addEventListener('click', (e) => {
        if (e.target === addModal) {
            addModal.classList.remove('show');
            linkForm.reset();
        }
    });
}

// 初始化应用
document.addEventListener('DOMContentLoaded', initApp);