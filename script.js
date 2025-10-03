// 图片配置：请将下面的路径替换为您自己的图片
const imageList = [
    { src: './images/135151676_p0-霞沢ミユ.png', alt: '图片描述 1' },
    { src: './images/135151676_p1-霞沢ミユ.png', alt: '图片描述 2' },
    { src: './images/135151676_p2-霞沢ミユ.png', alt: '图片描述 3' },
    { src: './images/135187740_p0-下江コハル.png', alt: '图片描述 4' },
    { src: './images/135187740_p1-下江コハル.png', alt: '图片描述 5' },
    { src: './images/135187740_p2-下江コハル.png', alt: '图片描述 6' },
    { src: './images/135224541_p0-ナンジャモ.png', alt: '图片描述 7' },
    { src: './images/135224541_p1-ナンジャモ.png', alt: '图片描述 8' },
    { src: './images/135260379_p0-シトラリ／Citlali.png', alt: '图片描述 9' },
    { src: './images/135260379_p1-シトラリ／Citlali.png', alt: '图片描述 10' },
    { src: './images/135260379_p2-シトラリ／Citlali.png', alt: '图片描述 11' },
    { src: './images/135297203_p0-スズラン／suzuran.png', alt: '图片描述 12' },
    { src: './images/135297203_p1-スズラン／suzuran.png', alt: '图片描述 13' },
    { src: './images/135339786_p0-伊落マリー.png', alt: '图片描述 14' },
    { src: './images/135339786_p1-伊落マリー.png', alt: '图片描述 15' },
    { src: './images/135384753_p0-ケルシー+Mon3tr(アークナイツ).png', alt: '图片描述 16' },
    { src: './images/135384753_p1-ケルシー+Mon3tr(アークナイツ).png', alt: '图片描述 17' },
    { src: './images/135384753_p2-ケルシー+Mon3tr(アークナイツ).png', alt: '图片描述 18' },
    { src: './images/135384753_p3-ケルシー+Mon3tr(アークナイツ).png', alt: '图片描述 19' },
    { src: './images/135422454_p0-カルテジア／Cartethyia.png', alt: '图片描述 20' },
    { src: './images/135422454_p1-カルテジア／Cartethyia.png', alt: '图片描述 21' },
    { src: './images/135463521_p0-フォフォ.png', alt: '图片描述 22' },
    { src: './images/135463521_p1-フォフォ.png', alt: '图片描述 23' },
    { src: './images/135499218_p0-篠澤広.png', alt: '图片描述 24' },
    { src: './images/135499218_p1-篠澤広.png', alt: '图片描述 25' },
    { src: './images/135499218_p2-篠澤広.png', alt: '图片描述 26' },
    { src: './images/135535182_p0-ビビアン(ゼンゼロ).png', alt: '图片描述 27' },
    { src: './images/135535182_p1-ビビアン(ゼンゼロ).png', alt: '图片描述 28' },
    { src: './images/135535182_p2-ビビアン(ゼンゼロ).png', alt: '图片描述 29' },
    { src: './images/135571105_p0-ニヤニヤ教授.png', alt: '图片描述 30' },
    { src: './images/135571105_p1-ニヤニヤ教授.png', alt: '图片描述 31' },
    { src: './images/135612130_p0-百合園セイア.png', alt: '图片描述 32' },
    { src: './images/135612130_p1-百合園セイア.png', alt: '图片描述 33' },
    { src: './images/135612130_p2-百合園セイア.png', alt: '图片描述 34' },
    { src: './images/135656080_p0-マダム・ヘルタ.png', alt: '图片描述 35' },
    { src: './images/135656080_p1-マダム・ヘルタ.png', alt: '图片描述 36' },
    { src: './images/135693116_p0-白洲アズサ.png', alt: '图片描述 37' },
    { src: './images/135693116_p1-白洲アズサ.png', alt: '图片描述 38' },
    { src: './images/135693116_p2-白洲アズサ.png', alt: '图片描述 39' },
    { src: './images/135729888_p0-常闇トワ.png', alt: '图片描述 40' },
    { src: './images/135729888_p1-常闇トワ.png', alt: '图片描述 41' },
    { src: './images/135729888_p2-常闇トワ.png', alt: '图片描述 42' },
    { src: './images/135767248_p0-白露.png', alt: '图片描述 43' },
    { src: './images/135767248_p1-白露.png', alt: '图片描述 44' },
    { src: './images/135767248_p2-白露.png', alt: '图片描述 45' },
    { src: './images/135803017_p0-空崎ヒナ.png', alt: '图片描述 46' },
    { src: './images/135803017_p1-空崎ヒナ.png', alt: '图片描述 47' },
    { src: './images/135803017_p2-空崎ヒナ.png', alt: '图片描述 48' }
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