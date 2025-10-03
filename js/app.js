// 图片画廊应用主要功能
class ImageGallery {
    constructor() {
        this.images = [];
        this.currentImageIndex = 0;
        this.currentZoom = 1;
        this.isDragging = false;
        this.dragStart = { x: 0, y: 0 };
        this.imageOffset = { x: 0, y: 0 };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadSampleImages();
    }

    setupEventListeners() {
        // 文件输入事件
        const fileInput = document.getElementById('fileInput');
        const uploadArea = document.getElementById('uploadArea');

        fileInput.addEventListener('change', (e) => this.handleFileSelect(e));

        // 拖拽上传
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            this.handleFileSelect(e);
        });

        // 模态框事件
        const modal = document.getElementById('imageModal');
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });

        // 键盘事件
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));

        // 鼠标滚轮缩放
        const modalImage = document.getElementById('modalImage');
        modalImage.addEventListener('wheel', (e) => {
            e.preventDefault();
            if (e.deltaY < 0) {
                this.zoomIn();
            } else {
                this.zoomOut();
            }
        });

        // 图片拖拽
        modalImage.addEventListener('mousedown', (e) => this.startDrag(e));
        modalImage.addEventListener('mousemove', (e) => this.drag(e));
        modalImage.addEventListener('mouseup', () => this.endDrag());
        modalImage.addEventListener('mouseleave', () => this.endDrag());

        // 触摸事件支持
        modalImage.addEventListener('touchstart', (e) => this.startDrag(e.touches[0]));
        modalImage.addEventListener('touchmove', (e) => {
            e.preventDefault();
            this.drag(e.touches[0]);
        });
        modalImage.addEventListener('touchend', () => this.endDrag());
    }

    handleFileSelect(e) {
        const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
        
        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) {
                this.addImageToGallery(file);
            }
        });
    }

    addImageToGallery(file) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const imageData = {
                id: Date.now() + Math.random(),
                name: file.name,
                src: e.target.result,
                size: this.formatFileSize(file.size),
                type: file.type,
                file: file
            };
            
            this.images.push(imageData);
            this.renderGallery();
        };
        
        reader.readAsDataURL(file);
    }

    renderGallery() {
        const galleryGrid = document.getElementById('galleryGrid');
        
        galleryGrid.innerHTML = this.images.map((image, index) => `
            <div class="image-card" onclick="gallery.openModal(${index})">
                <img src="${image.src}" alt="${image.name}" loading="lazy">
                <div class="card-info">
                    <div class="card-title">${image.name}</div>
                    <div class="card-details">
                        <span>${image.size}</span>
                        <span>${image.type.split('/')[1].toUpperCase()}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    openModal(index) {
        this.currentImageIndex = index;
        const image = this.images[index];
        
        if (!image) return;

        const modal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');
        const imageTitle = document.getElementById('imageTitle');
        const imageInfo = document.getElementById('imageInfo');

        modalImage.src = image.src;
        imageTitle.textContent = image.name;
        
        // 重置缩放和位置
        this.currentZoom = 1;
        this.imageOffset = { x: 0, y: 0 };
        this.updateImageTransform();
        
        // 更新图片信息
        this.updateImageInfo(image);
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        const modal = document.getElementById('imageModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    previousImage() {
        if (this.images.length === 0) return;
        
        this.currentImageIndex = this.currentImageIndex > 0 
            ? this.currentImageIndex - 1 
            : this.images.length - 1;
        
        this.openModal(this.currentImageIndex);
    }

    nextImage() {
        if (this.images.length === 0) return;
        
        this.currentImageIndex = this.currentImageIndex < this.images.length - 1 
            ? this.currentImageIndex + 1 
            : 0;
        
        this.openModal(this.currentImageIndex);
    }

    zoomIn() {
        this.currentZoom = Math.min(this.currentZoom * 1.2, 5);
        this.updateImageTransform();
    }

    zoomOut() {
        this.currentZoom = Math.max(this.currentZoom / 1.2, 0.1);
        this.updateImageTransform();
    }

    resetZoom() {
        this.currentZoom = 1;
        this.imageOffset = { x: 0, y: 0 };
        this.updateImageTransform();
    }

    updateImageTransform() {
        const modalImage = document.getElementById('modalImage');
        const zoomLevel = document.getElementById('zoomLevel');
        
        modalImage.style.transform = `
            translate(${this.imageOffset.x}px, ${this.imageOffset.y}px) 
            scale(${this.currentZoom})
        `;
        
        zoomLevel.textContent = `${Math.round(this.currentZoom * 100)}%`;
    }

    startDrag(e) {
        if (this.currentZoom <= 1) return;
        
        this.isDragging = true;
        this.dragStart = {
            x: e.clientX - this.imageOffset.x,
            y: e.clientY - this.imageOffset.y
        };
    }

    drag(e) {
        if (!this.isDragging) return;
        
        this.imageOffset = {
            x: e.clientX - this.dragStart.x,
            y: e.clientY - this.dragStart.y
        };
        
        this.updateImageTransform();
    }

    endDrag() {
        this.isDragging = false;
    }

    handleKeyPress(e) {
        const modal = document.getElementById('imageModal');
        if (!modal.classList.contains('active')) return;

        switch(e.key) {
            case 'Escape':
                this.closeModal();
                break;
            case 'ArrowLeft':
                this.previousImage();
                break;
            case 'ArrowRight':
                this.nextImage();
                break;
            case '+':
            case '=':
                this.zoomIn();
                break;
            case '-':
                this.zoomOut();
                break;
            case '0':
                this.resetZoom();
                break;
        }
    }

    updateImageInfo(image) {
        const imageInfo = document.getElementById('imageInfo');
        
        // 创建临时图片元素来获取实际尺寸
        const tempImg = new Image();
        tempImg.onload = () => {
            imageInfo.innerHTML = `
                <span class="image-size">${image.size}</span>
                <span class="image-dimensions">${tempImg.width} × ${tempImg.height}px</span>
            `;
        };
        tempImg.src = image.src;
    }

    changeViewMode() {
        const viewMode = document.getElementById('viewMode').value;
        const galleryGrid = document.getElementById('galleryGrid');
        
        if (viewMode === 'list') {
            galleryGrid.classList.add('list-view');
        } else {
            galleryGrid.classList.remove('list-view');
        }
    }

    clearGallery() {
        if (this.images.length === 0) return;
        
        if (confirm('确定要清空所有图片吗？')) {
            this.images = [];
            this.renderGallery();
            this.closeModal();
        }
    }

    downloadImage() {
        const image = this.images[this.currentImageIndex];
        if (!image) return;

        const link = document.createElement('a');
        link.href = image.src;
        link.download = image.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    loadSampleImages() {
        // 添加一些示例图片 URL（使用 Unsplash 的示例图片）
        const sampleImages = [
            {
                id: 'sample1',
                name: '示例图片1 - 自然风景.jpg',
                src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
                size: '1.2 MB',
                type: 'image/jpeg'
            },
            {
                id: 'sample2',
                name: '示例图片2 - 城市建筑.jpg',
                src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
                size: '980 KB',
                type: 'image/jpeg'
            },
            {
                id: 'sample3',
                name: '示例图片3 - 动物摄影.jpg',
                src: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop',
                size: '1.5 MB',
                type: 'image/jpeg'
            }
        ];

        this.images = [...sampleImages];
        this.renderGallery();
    }
}

// 全局函数（供 HTML 调用）
let gallery;

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    gallery = new ImageGallery();
});

// 供 HTML 调用的全局函数
function openModal(index) {
    gallery.openModal(index);
}

function closeModal() {
    gallery.closeModal();
}

function previousImage() {
    gallery.previousImage();
}

function nextImage() {
    gallery.nextImage();
}

function zoomIn() {
    gallery.zoomIn();
}

function zoomOut() {
    gallery.zoomOut();
}

function resetZoom() {
    gallery.resetZoom();
}

function downloadImage() {
    gallery.downloadImage();
}

function changeViewMode() {
    gallery.changeViewMode();
}

function clearGallery() {
    gallery.clearGallery();
}

// 性能优化：图片懒加载
const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px'
};

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        }
    });
}, observerOptions);

// 导出用于其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ImageGallery;
}