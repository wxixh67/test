import os
import glob

def generate_image_list():
    # 图片目录路径
    images_dir = r'C:\Users\l\Documents\GitHub\test\images'
    
    # 支持的图片格式
    image_extensions = ('*.png', '*.jpg', '*.jpeg', '*.gif', '*.webp', '*.svg', '*.bmp')
    
    # 获取所有图片文件
    image_files = []
    for ext in image_extensions:
        image_files.extend(glob.glob(os.path.join(images_dir, ext)))
    
    # 只获取文件名并排序
    image_files = [os.path.basename(f) for f in image_files]
    image_files.sort(reverse=True)  # 反向排序
    
    # 生成格式化的输出
    output = []
    for i, filename in enumerate(image_files, 1):
        output.append(f"    {{ src: './images/{filename}', alt: '图片描述 {i}' }}")
    
    formatted_output = ',\n'.join(output)
    
    print('生成的图片列表:')
    print(formatted_output)
    
    # 保存到文件
    with open('image-list.txt', 'w', encoding='utf-8') as f:
        f.write(formatted_output)
    
    print("\n已保存到 image-list.txt")
    return formatted_output

if __name__ == "__main__":
    generate_image_list()
