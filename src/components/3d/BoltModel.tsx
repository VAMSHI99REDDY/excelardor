"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function BoltModel() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0); // fully transparent
    // Optimization: limit pixel ratio to 2 for performance on high-DPI mobile devices
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // We'll let the canvas fill the container.
    const container = mountRef.current;
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.style.touchAction = "none";

    // Three.js colorspace
    renderer.outputColorSpace = THREE.SRGBColorSpace; 
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(38, container.clientWidth / container.clientHeight, 0.01, 200);

    // Enhanced Lightings to prevent high metalness from rendering purely black
    const key = new THREE.DirectionalLight(0xffffff, 2.5);
    key.position.set(-6, 12, 8);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xddeeff, 1.8);
    fill.position.set(10, 6, 4);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0xffffff, 1.5);
    rim.position.set(0, -5, -10);
    scene.add(rim);

    // Stronger ambient light helps lift the extremely high metalness shadows
    scene.add(new THREE.AmbientLight(0xffffff, 2.0));

    const topLight = new THREE.DirectionalLight(0xffffff, 1.5);
    topLight.position.set(0, 20, 0);
    scene.add(topLight);

    // Materials - Using #828B93 exactly as requested with 0.85-0.95 metalness
    const matSteel = new THREE.MeshStandardMaterial({
      color: 0x828B93, metalness: 0.85, roughness: 0.25
    });
    const matSteelDark = new THREE.MeshStandardMaterial({
      color: 0x767F87, metalness: 0.90, roughness: 0.30
    });
    const matThread = new THREE.MeshStandardMaterial({
      color: 0x727B83, metalness: 0.85, roughness: 0.35 // slightly darker
    });
    const matHole = new THREE.MeshStandardMaterial({
      color: 0x626A72, metalness: 0.95, roughness: 0.35 // darker for realism inside hole
    });

    const root = new THREE.Group();
    scene.add(root);
    
    const isMobile = window.innerWidth < 768;
    const modelScale = isMobile ? 0.85 : 1.05;
    root.scale.set(modelScale, modelScale, modelScale); 

    function makeHexPrism(outerR: number, height: number, mat: THREE.Material, bevel = 0) {
      const shape = new THREE.Shape();
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2 - Math.PI / 6;
        const x = Math.cos(a) * outerR;
        const y = Math.sin(a) * outerR;
        if (i === 0) shape.moveTo(x, y);
        else shape.lineTo(x, y);
      }
      shape.closePath();

      const geo = new THREE.ExtrudeGeometry(shape, {
        depth: height,
        bevelEnabled: bevel > 0,
        bevelThickness: bevel,
        bevelSize: bevel,
        bevelSegments: bevel > 0 ? 2 : 0
      });

      geo.center();
      geo.rotateX(Math.PI / 2);

      return new THREE.Mesh(geo, mat);
    }

    function makeThreadHelix(innerR: number, outerR: number, pitch: number, turns: number, yStart: number) {
      const group = new THREE.Group();
      // Reduced steps for better mobile performance
      const steps = Math.round(turns * (isMobile ? 16 : 24)); 
      const totalHeight = turns * pitch;

      // Re-using a single geometry for all thread segments
      const segGeo = new THREE.BoxGeometry((outerR - innerR) * 0.9, 0.03, pitch * 0.45);

      for (let i = 0; i < steps; i++) {
        const t = i / steps;
        const a = t * turns * Math.PI * 2;
        const y = yStart + t * totalHeight;

        const seg = new THREE.Mesh(segGeo, matThread);

        seg.position.set(
          Math.cos(a) * (innerR + (outerR - innerR) / 2),
          y,
          Math.sin(a) * (innerR + (outerR - innerR) / 2)
        );
        seg.rotation.y = -a;
        group.add(seg);
      }
      return group;
    }

    // Parameters
    const BOLT_HEAD_R = 1.05;
    const BOLT_HEAD_H = 0.80;
    const SHANK_R = 0.60;
    const THREAD_START = 0.5;
    const THREAD_L = 3.7;
    const PITCH = 0.175;
    const THREAD_TURNS = Math.floor(THREAD_L / PITCH);
    const THREAD_OUTER = SHANK_R;
    const THREAD_INNER = SHANK_R - 0.12;

    const NUT_OUTER_R = 1.02;
    const NUT_H = 0.72;
    const NUT_INNER_R = SHANK_R + 0.02;

    // Bolt
    const boltGroup = new THREE.Group();
    root.add(boltGroup);

    const boltHead = makeHexPrism(BOLT_HEAD_R, BOLT_HEAD_H, matSteel, 0.04);
    boltHead.position.y = 1.8;
    boltGroup.add(boltHead);

    const shank = new THREE.Mesh(
      new THREE.CylinderGeometry(SHANK_R, SHANK_R, THREAD_START, 32),
      matSteel
    );
    shank.position.y = 1.2;
    boltGroup.add(shank);

    const threadCore = new THREE.Mesh(
      new THREE.CylinderGeometry(THREAD_INNER, THREAD_INNER, THREAD_L, isMobile ? 16 : 32),
      matSteelDark
    );
    threadCore.position.y = -0.9;
    boltGroup.add(threadCore);

    const threadHelix = makeThreadHelix(THREAD_INNER, THREAD_OUTER, PITCH, THREAD_TURNS, -2.75);
    boltGroup.add(threadHelix);

    const tip = new THREE.Mesh(
      new THREE.CylinderGeometry(SHANK_R * 0.55, THREAD_INNER, 0.18, 24),
      matSteelDark
    );
    tip.position.y = -2.8;
    boltGroup.add(tip);

    boltGroup.rotation.z = Math.PI * 0.08;
    boltGroup.rotation.x = Math.PI * -0.05;
    boltGroup.position.set(1.2, 0.8, 0);

    // Nut
    const nutGroup = new THREE.Group();
    root.add(nutGroup);

    const nutOuter = makeHexPrism(NUT_OUTER_R, NUT_H, matSteel, 0.03);
    nutGroup.add(nutOuter);

    const nutHole = new THREE.Mesh(
      new THREE.CylinderGeometry(NUT_INNER_R, NUT_INNER_R, NUT_H + 0.1, 32),
      matHole
    );
    nutGroup.add(nutHole);

    for (let i = 0; i < 4; i++) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(NUT_INNER_R + 0.02, 0.02, 8, isMobile ? 24 : 48),
        matThread
      );
      ring.rotation.x = Math.PI / 2;
      ring.position.y = -0.25 + i * 0.18;
      nutGroup.add(ring);
    }

    nutGroup.rotation.y = Math.PI / 8;
    nutGroup.rotation.x = Math.PI * 0.04;
    nutGroup.position.set(-1.5, -1.2, 0.3);

    // Camera
    const sph = { theta: -0.45, phi: 0.78, r: isMobile ? 15 : 12 };
    const tgt = new THREE.Vector3(0, 0, 0);
    // Smooth interaction target variables
    const targetSph = { theta: -0.45, phi: 0.78, r: isMobile ? 15 : 12 };

    function applyCamera() {
      camera.position.set(
        tgt.x + sph.r * Math.sin(sph.phi) * Math.sin(sph.theta),
        tgt.y + sph.r * Math.cos(sph.phi),
        tgt.z + sph.r * Math.sin(sph.phi) * Math.cos(sph.theta)
      );
      camera.lookAt(tgt);
    }
    applyCamera();

    // Controls
    let drag = false, prev = { x: 0, y: 0 }, autoRot = true;
    const autoRotSpeed = 0.008;

    const startAction = (x: number, y: number) => {
      drag = true;
      prev = { x, y };
      autoRot = false;
    };

    const moveAction = (x: number, y: number) => {
      if (!drag) {
        const bounds = container.getBoundingClientRect();
        const rx = ((x - bounds.left) / bounds.width) * 2 - 1;
        const ry = ((y - bounds.top) / bounds.height) * 2 - 1;
        targetSph.theta = -0.45 + (rx * 0.2); 
        targetSph.phi = 0.78 + (ry * 0.2);
        return;
      }
      
      const dx = (x - prev.x) * 0.005;
      const dy = (y - prev.y) * 0.005;
      targetSph.theta -= dx;
      targetSph.phi = Math.max(0.05, Math.min(Math.PI - 0.05, targetSph.phi + dy));
      
      sph.theta = targetSph.theta;
      sph.phi = targetSph.phi;
      
      prev = { x, y };
      applyCamera();
    };

    const endAction = () => { drag = false; autoRot = true; };

    const onMouseDown = (e: MouseEvent) => startAction(e.clientX, e.clientY);
    const onMouseMove = (e: MouseEvent) => moveAction(e.clientX, e.clientY);
    const onMouseUp = () => endAction();

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) startAction(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) moveAction(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchEnd = () => endAction();

    container.addEventListener('mousedown', onMouseDown);
    container.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    const onResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;

      // Adjust camera distance for portrait
      if (width < height) {
        targetSph.r = 16;
      } else {
        targetSph.r = 12;
      }
      
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);
    onResize();

    let isVisible = true;
    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    }, { threshold: 0 });
    observer.observe(container);

    // Animation Loop
    let animationFrameId: number;
    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      if (autoRot) {
        root.rotation.y += autoRotSpeed;
      }

      if (!drag && autoRot) {
         sph.theta += (targetSph.theta - sph.theta) * 0.05;
         sph.phi += (targetSph.phi - sph.phi) * 0.05;
         sph.r += (targetSph.r - sph.r) * 0.05;
         applyCamera();
      }

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', onResize);
      container.removeEventListener('mousedown', onMouseDown);
      container.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      cancelAnimationFrame(animationFrameId);
      if(container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="relative w-full h-full z-20 pointer-events-auto cursor-grab active:cursor-grabbing"
    />
  );
}
