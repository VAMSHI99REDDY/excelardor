import os
import sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance

# Make sure rembg is imported successfully
try:
    from rembg import remove
except ImportError:
    print("rembg not installed, please ensure it is installed before running.")
    sys.exit(1)

INPUT_DIR = r"C:\Users\daran\OneDrive\Desktop\excelardor-master\public\AllProjects\Industrial Hydraulics & SPM Division"
OUTPUT_DIR = INPUT_DIR  # Overwrite or save directly in-place as requested

TARGET_W = 1080
TARGET_H = 960

def create_premium_background(width, height):
    # Create the background with a soft, clean industrial studio look
    bg = Image.new("RGBA", (width, height), (255, 255, 255, 255))
    draw = ImageDraw.Draw(bg)
    
    # Horizon line at 68% height (creating a realistic ground plane)
    horizon = int(height * 0.68)
    
    # Wall gradient (soft light blue-gray studio wall)
    for y in range(horizon):
        t = y / horizon
        r = int(235 - (235 - 222) * t)
        g = int(238 - (238 - 226) * t)
        b = int(242 - (242 - 231) * t)
        draw.line([(0, y), (width, y)], fill=(r, g, b, 255))
        
    # Floor gradient (clean light gray workshop floor)
    for y in range(horizon, height):
        t = (y - horizon) / (height - horizon)
        r = int(218 - (218 - 195) * t)
        g = int(222 - (222 - 200) * t)
        b = int(227 - (227 - 208) * t)
        draw.line([(0, y), (width, y)], fill=(r, g, b, 255))
        
    # Apply a light Gaussian blur to the background to smooth the transition and gradients
    bg = bg.filter(ImageFilter.GaussianBlur(radius=3))
    return bg

def generate_soft_shadow(mask, w, h):
    # Create a realistic squashed shadow base
    shadow_w = int(w * 1.05)
    shadow_h = max(12, int(h * 0.08))
    
    alpha = mask.split()[-1]
    # Squash the product silhouette vertically to form a shadow floor footprint
    squashed_mask = alpha.resize((shadow_w, shadow_h), Image.Resampling.LANCZOS)
    
    # Dark shadow layer
    shadow = Image.new("RGBA", (shadow_w, shadow_h), (40, 45, 50, 0))
    # Render shadow color into the mask area with a soft alpha
    shadow_color = Image.new("RGBA", (shadow_w, shadow_h), (25, 27, 30, 110))
    shadow = Image.composite(shadow_color, shadow, squashed_mask)
    
    # Apply heavy blur to simulate soft ambient occlusion/diffuse shadow
    blur_radius = max(8, int(shadow_h * 0.5))
    shadow = shadow.filter(ImageFilter.GaussianBlur(radius=blur_radius))
    return shadow

def process_image(filepath):
    filename = os.path.basename(filepath)
    print(f"Processing: {filename}...")
    
    # 1. Load image
    img = Image.open(filepath)
    
    # 2. Extract foreground (background removal)
    # Using rembg to isolate the product cleanly
    no_bg = remove(img)
    
    # 3. Locate bounding box of the product
    # Find non-zero alpha pixels to crop the product closely
    alpha = no_bg.split()[-1]
    bbox = alpha.getbbox()
    if not bbox:
        print(f"  Warning: No foreground detected for {filename}, skipping custom processing.")
        return
        
    product_crop = no_bg.crop(bbox)
    p_w, p_h = product_crop.size
    
    # 4. Proportional Scaling
    # We want the product to fit within a safe area (max width 840, max height 620)
    # to maintain clean and consistent composition across catalog items.
    max_w, max_h = 840, 620
    scale = min(max_w / p_w, max_h / p_h)
    
    # Maintain original size if it already fits and is small, but upscale if extremely small
    if scale > 1.0 and max(p_w, p_h) < 200:
        # Don't upscale small items too much to avoid pixelation, limit scaling
        scale = min(scale, 2.5)
    elif scale > 1.0:
        scale = 1.0 # Keep original size if it fits
        
    new_w = int(p_w * scale)
    new_h = int(p_h * scale)
    product_resized = product_crop.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    # 5. Enhancements (Contrast & Sharpness/Clarity)
    # Slightly reduce contrast for a softer, realistic professional studio look
    contrast_enhancer = ImageEnhance.Contrast(product_resized)
    product_enhanced = contrast_enhancer.enhance(0.92)
    
    # Enhance clarity and details
    sharpness_enhancer = ImageEnhance.Sharpness(product_enhanced)
    product_enhanced = sharpness_enhancer.enhance(1.25)
    
    # Add a mild unsharp mask for HD finish
    product_enhanced = product_enhanced.filter(ImageFilter.UnsharpMask(radius=1.5, percent=120, threshold=2))
    
    # 6. Background and Shadow Compositing
    canvas = create_premium_background(TARGET_W, TARGET_H)
    
    # Create shadow
    shadow = generate_soft_shadow(product_resized, new_w, new_h)
    
    # Position product and shadow
    # Center horizontally
    px = (TARGET_W - new_w) // 2
    
    # Position vertically: Place the base of the product on the floor plane.
    # The floor starts at horizon (652 pixels). Let's set the base of the product
    # slightly below the horizon to ground it well, e.g. at y = 720.
    # If the product is very tall, we adjust it so it doesn't clip the top.
    py = (TARGET_H - new_h) // 2 + 30 # standard centering offset to ground it slightly lower
    # Let's ensure it doesn't go above top margin (e.g. 50px)
    py = max(50, py)
    
    # Shadow placement (centered under the product base)
    shadow_w, shadow_h = shadow.size
    sx = px + (new_w - shadow_w) // 2
    sy = py + new_h - int(shadow_h * 0.6)
    
    # Paste shadow onto canvas
    canvas.alpha_composite(shadow, (sx, sy))
    
    # Paste product onto canvas
    canvas.alpha_composite(product_enhanced, (px, py))
    
    # Save back to output path in correct format
    final_img = canvas.convert("RGB")
    ext = os.path.splitext(filepath)[1].lower()
    if ext in ('.jpg', '.jpeg'):
        final_img.save(filepath, "JPEG", quality=95)
    else:
        final_img.save(filepath, "PNG")
    print(f"  Successfully saved {filename} to 1080x960 format.")

def main():
    if not os.path.exists(INPUT_DIR):
        print(f"Directory {INPUT_DIR} does not exist.")
        return
        
    valid_extensions = ('.png', '.jpg', '.jpeg')
    files = [os.path.join(INPUT_DIR, f) for f in os.listdir(INPUT_DIR) if f.lower().endswith(valid_extensions)]
    print(f"Found {len(files)} images to process.")
    
    for f in files:
        try:
            process_image(f)
        except Exception as e:
            print(f"  Error processing {os.path.basename(f)}: {e}")

if __name__ == "__main__":
    main()
