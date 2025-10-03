import os

# 设置你的图片文件夹路径
folder_path = r'C:\Users\l\Documents\GitHub\test\images'

# 获取文件夹中的所有文件
files = os.listdir(folder_path)

# 过滤出所有图片文件（可以根据需要调整支持的格式）
image_extensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp']
images = [f for f in files if any(f.lower().endswith(ext) for ext in image_extensions)]

# 生成所需的格式
image_list = []
for i, image in enumerate(images, 1):
    # 获取文件扩展名并生成格式
    file_name, file_extension = os.path.splitext(image)
    image_list.append(f"{{ src: './images/{image}', alt: '图片描述 {i}' }}")

# 打印结果
for item in image_list:
    print(item)
