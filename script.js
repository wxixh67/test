// 图片配置：请将下面的路径替换为您自己的图片
const imageList = [
        { src: './images/135803017_p2-空崎ヒナ.png', alt: '图片描述 1' },
    { src: './images/135803017_p1-空崎ヒナ.png', alt: '图片描述 2' },
    { src: './images/135803017_p0-空崎ヒナ.png', alt: '图片描述 3' },
    { src: './images/135767248_p2-白露.png', alt: '图片描述 4' },
    { src: './images/135767248_p1-白露.png', alt: '图片描述 5' },
    { src: './images/135767248_p0-白露.png', alt: '图片描述 6' },
    { src: './images/135729888_p2-常闇トワ.png', alt: '图片描述 7' },
    { src: './images/135729888_p1-常闇トワ.png', alt: '图片描述 8' },
    { src: './images/135729888_p0-常闇トワ.png', alt: '图片描述 9' },
    { src: './images/135693116_p2-白洲アズサ.png', alt: '图片描述 10' },
    { src: './images/135693116_p1-白洲アズサ.png', alt: '图片描述 11' },
    { src: './images/135693116_p0-白洲アズサ.png', alt: '图片描述 12' },
    { src: './images/135656080_p1-マダム・ヘルタ.png', alt: '图片描述 13' },
    { src: './images/135656080_p0-マダム・ヘルタ.png', alt: '图片描述 14' },
    { src: './images/135612130_p2-百合園セイア.png', alt: '图片描述 15' },
    { src: './images/135612130_p1-百合園セイア.png', alt: '图片描述 16' },
    { src: './images/135612130_p0-百合園セイア.png', alt: '图片描述 17' },
    { src: './images/135571105_p1-ニヤニヤ教授.png', alt: '图片描述 18' },
    { src: './images/135571105_p0-ニヤニヤ教授.png', alt: '图片描述 19' },
    { src: './images/135535182_p2-ビビアン(ゼンゼロ).png', alt: '图片描述 20' },
    { src: './images/135535182_p1-ビビアン(ゼンゼロ).png', alt: '图片描述 21' },
    { src: './images/135535182_p0-ビビアン(ゼンゼロ).png', alt: '图片描述 22' },
    { src: './images/135499218_p2-篠澤広.png', alt: '图片描述 23' },
    { src: './images/135499218_p1-篠澤広.png', alt: '图片描述 24' },
    { src: './images/135499218_p0-篠澤広.png', alt: '图片描述 25' },
    { src: './images/135463521_p1-フォフォ.png', alt: '图片描述 26' },
    { src: './images/135463521_p0-フォフォ.png', alt: '图片描述 27' },
    { src: './images/135422454_p1-カルテジア／Cartethyia.png', alt: '图片描述 28' },
    { src: './images/135422454_p0-カルテジア／Cartethyia.png', alt: '图片描述 29' },
    { src: './images/135384753_p3-ケルシー+Mon3tr(アークナイツ).png', alt: '图片描述 30' },
    { src: './images/135384753_p2-ケルシー+Mon3tr(アークナイツ).png', alt: '图片描述 31' },
    { src: './images/135384753_p1-ケルシー+Mon3tr(アークナイツ).png', alt: '图片描述 32' },
    { src: './images/135384753_p0-ケルシー+Mon3tr(アークナイツ).png', alt: '图片描述 33' },
    { src: './images/135339786_p1-伊落マリー.png', alt: '图片描述 34' },
    { src: './images/135339786_p0-伊落マリー.png', alt: '图片描述 35' },
    { src: './images/135297203_p1-スズラン／suzuran.png', alt: '图片描述 36' },
    { src: './images/135297203_p0-スズラン／suzuran.png', alt: '图片描述 37' },
    { src: './images/135260379_p2-シトラリ／Citlali.png', alt: '图片描述 38' },
    { src: './images/135260379_p1-シトラリ／Citlali.png', alt: '图片描述 39' },
    { src: './images/135260379_p0-シトラリ／Citlali.png', alt: '图片描述 40' },
    { src: './images/135224541_p1-ナンジャモ.png', alt: '图片描述 41' },
    { src: './images/135224541_p0-ナンジャモ.png', alt: '图片描述 42' },
    { src: './images/135187740_p2-下江コハル.png', alt: '图片描述 43' },
    { src: './images/135187740_p1-下江コハル.png', alt: '图片描述 44' },
    { src: './images/135187740_p0-下江コハル.png', alt: '图片描述 45' },
    { src: './images/135151676_p2-霞沢ミユ.png', alt: '图片描述 46' },
    { src: './images/135151676_p1-霞沢ミユ.png', alt: '图片描述 47' },
    { src: './images/135151676_p0-霞沢ミユ.png', alt: '图片描述 48' },
    { src: './images/135107386_p2-プラナ(ブルーアーカイブ).png', alt: '图片描述 49' },
    { src: './images/135107386_p1-プラナ(ブルーアーカイブ).png', alt: '图片描述 50' },
    { src: './images/135107386_p0-プラナ(ブルーアーカイブ).png', alt: '图片描述 51' },
    { src: './images/135063317_p2-橘ヒカリ+ 橘ノゾミ.png', alt: '图片描述 52' },
    { src: './images/135063317_p1-橘ヒカリ+ 橘ノゾミ.png', alt: '图片描述 53' },
    { src: './images/135063317_p0-橘ヒカリ+ 橘ノゾミ.png', alt: '图片描述 54' },
    { src: './images/135022062_p1-小鳥遊ホシノ.png', alt: '图片描述 55' },
    { src: './images/135022062_p0-小鳥遊ホシノ.png', alt: '图片描述 56' },
    { src: './images/134985302_p2-ロスモンティス.png', alt: '图片描述 57' },
    { src: './images/134985302_p1-ロスモンティス.png', alt: '图片描述 58' },
    { src: './images/134985302_p0-ロスモンティス.png', alt: '图片描述 59' },
    { src: './images/134950080_p3-フィービー.png', alt: '图片描述 60' },
    { src: './images/134950080_p2-フィービー.png', alt: '图片描述 61' },
    { src: './images/134950080_p1-フィービー.png', alt: '图片描述 62' },
    { src: './images/134950080_p0-フィービー.png', alt: '图片描述 63' },
    { src: './images/134913655_p2-聖園ミカ.png', alt: '图片描述 64' },
    { src: './images/134913655_p1-聖園ミカ.png', alt: '图片描述 65' },
    { src: './images/134913655_p0-聖園ミカ.png', alt: '图片描述 66' },
    { src: './images/134876506_p2-久田イズナ.png', alt: '图片描述 67' },
    { src: './images/134876506_p1-久田イズナ.png', alt: '图片描述 68' },
    { src: './images/134876506_p0-久田イズナ.png', alt: '图片描述 69' },
    { src: './images/134839499_p2-エイヤフィヤトラ.png', alt: '图片描述 70' },
    { src: './images/134839499_p1-エイヤフィヤトラ.png', alt: '图片描述 71' },
    { src: './images/134839499_p0-エイヤフィヤトラ.png', alt: '图片描述 72' },
    { src: './images/134794835_p1-春原ココナ.png', alt: '图片描述 73' },
    { src: './images/134794835_p0-春原ココナ.png', alt: '图片描述 74' },
    { src: './images/134753384_p2-Happy Birthday！！.png', alt: '图片描述 75' },
    { src: './images/134753384_p1-Happy Birthday！！.png', alt: '图片描述 76' },
    { src: './images/134753384_p0-Happy Birthday！！.png', alt: '图片描述 77' },
    { src: './images/134717019_p1-スズラン／suzuran(アークナイツ).png', alt: '图片描述 78' },
    { src: './images/134717019_p0-スズラン／suzuran(アークナイツ).png', alt: '图片描述 79' },
    { src: './images/134681752_p1-丹花イブキ／Ibuki.png', alt: '图片描述 80' },
    { src: './images/134681752_p0-丹花イブキ／Ibuki.png', alt: '图片描述 81' },
    { src: './images/134645190_p3-フリーナ／Furina(原神).png', alt: '图片描述 82' },
    { src: './images/134645190_p2-フリーナ／Furina(原神).png', alt: '图片描述 83' },
    { src: './images/134645190_p1-フリーナ／Furina(原神).png', alt: '图片描述 84' },
    { src: './images/134645190_p0-フリーナ／Furina(原神).png', alt: '图片描述 85' },
    { src: './images/134608321_p1-伊落マリー／mari(ブルーアーカイブ).png', alt: '图片描述 86' },
    { src: './images/134608321_p0-伊落マリー／mari(ブルーアーカイブ).png', alt: '图片描述 87' },
    { src: './images/134568975_p1-キャストリス／Castorice.png', alt: '图片描述 88' },
    { src: './images/134568975_p0-キャストリス／Castorice.png', alt: '图片描述 89' },
    { src: './images/134520289_p2-ナヒーダ／nahida.png', alt: '图片描述 90' },
    { src: './images/134520289_p1-ナヒーダ／nahida.png', alt: '图片描述 91' },
    { src: './images/134520289_p0-ナヒーダ／nahida.png', alt: '图片描述 92' },
    { src: './images/134477541_p2-橘ノゾミ+橘ヒカリ.png', alt: '图片描述 93' },
    { src: './images/134477541_p1-橘ノゾミ+橘ヒカリ.png', alt: '图片描述 94' },
    { src: './images/134477541_p0-橘ノゾミ+橘ヒカリ.png', alt: '图片描述 95' },
    { src: './images/134439732_p2-百合園セイア／seia(ブルーアーカイブ).png', alt: '图片描述 96' },
    { src: './images/134439732_p1-百合園セイア／seia(ブルーアーカイブ).png', alt: '图片描述 97' },
    { src: './images/134439732_p0-百合園セイア／seia(ブルーアーカイブ).png', alt: '图片描述 98' }

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