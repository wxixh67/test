// 图片配置：请将下面的路径替换为您自己的图片
const imageList = [
    { src: './images/photo1.jpg', alt: '图片描述 1' },
    { src: './images/photo2.jpg', alt: '图片描述 2' },
    { src: './images/photo3.jpg', alt: '图片描述 3' },
    { src: './images/photo4.jpg', alt: '图片描述 4' },
    { src: './images/photo5.jpg', alt: '图片描述 5' },
    { src: './images/photo6.jpg', alt: '图片描述 6' },
    // ... 请在此继续添加您的图片
];

// DOM 元素
const imageGrid = document.getElementById('imageGrid');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentImageIndex = 0;

// 初始化图片网格
function initGallery() {
    imageList.forEach((image, index) => {
        const gridItem = document.createElement('div');
        gridItem.className = 'grid-item';
        gridItem.innerHTML = `<img src="${image.src}" alt="${image.alt}" loading="lazy">`;
        
        gridItem.addEventListener('click', () => openLightbox(index));
        imageGrid.appendChild(gridItem);
    });
}

// 打开灯箱
function openLightbox(index) {
    currentImageIndex = index;
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // 禁止背景滚动
}

// 关闭灯箱
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto'; // 恢复背景滚动
}

// 更新灯箱中的图片
function updateLightboxImage() {
    const image = imageList[currentImageIndex];
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
}

// 导航到上一张
function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + imageList.length) % imageList.length;
    updateLightboxImage();
}

// 导航到下一张
function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % imageList.length;
    updateLightboxImage();
}

// 事件监听器
closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', showPrevImage);
nextBtn.addEventListener('click', showNextImage);

// 键盘导航
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    switch(e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            showPrevImage();
            break;
        case 'ArrowRight':
            showNextImage();
            break;
    }
});

// 点击灯箱背景关闭
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// 初始化画廊
initGallery();