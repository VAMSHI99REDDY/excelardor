import React from 'react';
import fs from 'fs';
import path from 'path';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import GalleryGrid, { GalleryImage } from '@/components/sections/GalleryGrid';

// Helper function to recursively find images in a directory
function getImagesRecursively(dir: string, baseDir: string): GalleryImage[] {
  let results: GalleryImage[] = [];
  
  if (!fs.existsSync(dir)) {
    return results;
  }
  
  const list = fs.readdirSync(dir);
  
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat && stat.isDirectory()) {
      results = results.concat(getImagesRecursively(fullPath, baseDir));
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp', '.avif'].includes(ext)) {
        // Convert the absolute file path to a public URL path
        const relativePath = path.relative(baseDir, fullPath);
        // Replace Windows backslashes with forward slashes for URLs
        const urlPath = `/AllProjects/${relativePath.replace(/\\/g, '/')}`;
        
        // Generate a clean title from the filename
        const filenameWithoutExt = path.basename(file, ext);
        // Remove trailing numbers, common prefixes, dashes, underscores, and make it readable
        const cleanTitle = filenameWithoutExt
          .replace(/[-_]/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
        
        results.push({
          src: urlPath,
          title: cleanTitle
        });
      }
    }
  });
  
  return results;
}

export default function GalleryPage() {
  const publicDir = path.join(process.cwd(), 'public', 'AllProjects');
  let images: GalleryImage[] = [];
  
  try {
    images = getImagesRecursively(publicDir, publicDir);

    // Filter out unwanted images
    images = images.filter(img => {
      const lower = img.src.toLowerCase();
      if (lower.includes('contact us bg.png')) return false;
      if (lower.includes('5m_telescopic_mast_app_1.png')) return false;
      if (lower.endsWith('telescopic mast/5m_telescopic_mast.png')) return false;
      return true;
    });

    // Sort by requested category order
    const getCategoryIndex = (src: string) => {
      const lowerSrc = src.toLowerCase();
      if (lowerSrc.includes('telescopic mast')) return 1;
      if (lowerSrc.includes('drdoproducts')) return 2; // Aerospace and Defence
      if (lowerSrc.includes('industrial hydraulics')) return 3; // Industrial Hydraulics & SPM
      if (lowerSrc.includes('3dourexpertise') || lowerSrc.includes('3d cad')) return 4; // 3D Modeling
      return 5; // Others
    };

    images.sort((a, b) => {
      const catA = getCategoryIndex(a.src);
      const catB = getCategoryIndex(b.src);
      if (catA !== catB) return catA - catB;
      return a.title.localeCompare(b.title);
    });

  } catch (error) {
    console.error("Error reading AllProjects directory:", error);
  }

  return (
    <main className="min-h-screen bg-[#F9F9F9] flex flex-col font-sans">
      <Navbar />

      <section className="flex-grow pt-32 pb-24 px-6 md:px-12 w-full flex justify-center">
        <div className="container mx-auto w-full max-w-[1400px]">
          
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <span className="text-blue-600 font-bold text-[11px] md:text-[13px] tracking-[0.25em] uppercase mb-4 inline-block">
              Our Portfolio
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black leading-tight mb-6">
              Project <span className="text-black/40 italic font-light tracking-tighter">Gallery</span>
            </h1>
            <p className="text-black/60 font-medium text-[15px] md:text-[17px] leading-relaxed">
              Explore our comprehensive portfolio of advanced hydraulic systems, precision-engineered mechanical components, and mission-critical solutions delivered across the defense, aerospace, and industrial sectors.
            </p>
          </div>

          <GalleryGrid images={images} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
