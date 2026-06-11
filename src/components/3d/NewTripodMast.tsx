"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/**
 * NewTripodMast Component
 * Renders a high-detail 3D telescopic mast with bronze/gold and black materials
 * and a smooth extending/retracting infinite loop animation.
 */
export default function NewTripodMast() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;

    // --- 1. Scene Setup ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const camera = new THREE.PerspectiveCamera(35, container.clientWidth / container.clientHeight, 1, 5000);
    camera.position.set(500, 400, 800);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance"
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    container.style.touchAction = "pan-y";

    // --- 2. Environment & Lighting ---
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    scene.environment = pmremGenerator.fromScene(roomEnv, 0.04).texture;
    roomEnv.dispose();

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 150, 0);
    controls.maxDistance = 2500;
    controls.minDistance = 200;
    controls.maxPolarAngle = Math.PI / 2 - 0.05;
    
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      controls.enableRotate = false;
      controls.enablePan = false;
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(200, 500, 300);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 100;
    keyLight.shadow.camera.far = 1500;
    keyLight.shadow.camera.left = -300;
    keyLight.shadow.camera.right = 300;
    keyLight.shadow.camera.top = 300;
    keyLight.shadow.camera.bottom = -300;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.8);
    fillLight.position.set(-200, 300, -200);
    scene.add(fillLight);

    // --- 3. Materials ---
    const matBronze = new THREE.MeshPhysicalMaterial({
      color: 0xa88147,
      metalness: 0.85,
      roughness: 0.25,
      clearcoat: 0.3,
    });
    
    const matBlackMetal = new THREE.MeshPhysicalMaterial({
      color: 0x111111,
      metalness: 0.8,
      roughness: 0.35,
      clearcoat: 0.1,
    });
    
    const matDarkRubber = new THREE.MeshStandardMaterial({
      color: 0x050505,
      roughness: 0.9,
      metalness: 0.1,
    });

    const matGoldAccents = new THREE.MeshPhysicalMaterial({
      color: 0xd4af37,
      metalness: 0.9,
      roughness: 0.15,
    });

    // --- 4. Model Building ---
    const hoverGroup = new THREE.Group();
    scene.add(hoverGroup);

    const modelGroup = new THREE.Group();
    hoverGroup.add(modelGroup);

    const baseScale = isMobile ? 1.0 : 1.35;
    const scaleFactor = baseScale * (container.clientHeight / 500);

    const mastSections: THREE.Group[] = [];
    const internalMastGroup = new THREE.Group();
    modelGroup.add(internalMastGroup);

    // --- Tripod Legs ---
    const legLength = 100 * scaleFactor;
    
    for (let i = 0; i < 3; i++) {
      const angle = (i * Math.PI * 2) / 3;
      const legGroup = new THREE.Group();
      
      // Main leg profile (squared/rectangular tube)
      const legGeom = new THREE.BoxGeometry(6 * scaleFactor, legLength, 6 * scaleFactor);
      legGeom.translate(0, -legLength / 2, 0);
      const legMesh = new THREE.Mesh(legGeom, matBlackMetal);
      
      // Slant the leg outwards
      legMesh.rotation.z = Math.PI / 6;
      legMesh.position.set(12 * scaleFactor, 40 * scaleFactor, 0);
      legMesh.castShadow = true;
      legMesh.receiveShadow = true;
      legGroup.add(legMesh);
      
      // Connecting strut
      const strutGeom = new THREE.CylinderGeometry(2 * scaleFactor, 2 * scaleFactor, 45 * scaleFactor, 16);
      strutGeom.translate(0, 22.5 * scaleFactor, 0);
      const strut = new THREE.Mesh(strutGeom, matBlackMetal);
      strut.rotation.z = Math.PI / 3.5;
      strut.position.set(6 * scaleFactor, 10 * scaleFactor, 0);
      strut.castShadow = true;
      legGroup.add(strut);
      
      // Foot pad
      const foot = new THREE.Mesh(new THREE.CylinderGeometry(8 * scaleFactor, 8 * scaleFactor, 3 * scaleFactor, 32), matDarkRubber);
      foot.position.set(legLength * Math.sin(Math.PI / 6) + 12 * scaleFactor, 40 * scaleFactor - legLength * Math.cos(Math.PI / 6) - 1.5 * scaleFactor, 0);
      foot.castShadow = true;
      legGroup.add(foot);

      legGroup.rotation.y = angle;
      modelGroup.add(legGroup);
    }

    // --- Base Center Cylinder ---
    const baseCylinderHeight = 50 * scaleFactor;
    const baseCylinder = new THREE.Mesh(new THREE.CylinderGeometry(14 * scaleFactor, 14 * scaleFactor, baseCylinderHeight, 32), matBronze);
    baseCylinder.position.y = baseCylinderHeight / 2;
    baseCylinder.castShadow = true;
    baseCylinder.receiveShadow = true;
    modelGroup.add(baseCylinder);

    // Base bottom collar
    const bottomCollar = new THREE.Mesh(new THREE.CylinderGeometry(16 * scaleFactor, 16 * scaleFactor, 10 * scaleFactor, 32), matBlackMetal);
    bottomCollar.position.y = 5 * scaleFactor;
    modelGroup.add(bottomCollar);
    
    // Middle collar where legs attach
    const midCollar = new THREE.Mesh(new THREE.CylinderGeometry(16 * scaleFactor, 16 * scaleFactor, 15 * scaleFactor, 32), matBlackMetal);
    midCollar.position.y = 35 * scaleFactor;
    modelGroup.add(midCollar);

    // --- Crank Mechanism ---
    const crankGroup = new THREE.Group();
    crankGroup.position.set(16 * scaleFactor, 35 * scaleFactor, 0);
    
    const crankHousing = new THREE.Mesh(new THREE.BoxGeometry(10 * scaleFactor, 16 * scaleFactor, 12 * scaleFactor), matBlackMetal);
    crankHousing.castShadow = true;
    crankGroup.add(crankHousing);
    
    const crankShaft = new THREE.Mesh(new THREE.CylinderGeometry(2 * scaleFactor, 2 * scaleFactor, 14 * scaleFactor, 16), matBlackMetal);
    crankShaft.rotation.z = Math.PI / 2;
    crankGroup.add(crankShaft);

    const crankHandleGrp = new THREE.Group();
    crankHandleGrp.position.set(7 * scaleFactor, 0, 0);
    
    const crankArm = new THREE.Mesh(new THREE.BoxGeometry(1.5 * scaleFactor, 20 * scaleFactor, 3 * scaleFactor), matBlackMetal);
    crankArm.position.y = 8 * scaleFactor;
    crankHandleGrp.add(crankArm);
    
    const crankKnob = new THREE.Mesh(new THREE.CylinderGeometry(2.5 * scaleFactor, 2.5 * scaleFactor, 10 * scaleFactor, 16), matDarkRubber);
    crankKnob.rotation.z = Math.PI / 2;
    crankKnob.position.set(5 * scaleFactor, 18 * scaleFactor, 0);
    crankHandleGrp.add(crankKnob);
    
    crankGroup.add(crankHandleGrp);
    modelGroup.add(crankGroup);

    // --- Telescopic Mast Sections ---
    const numSections = 6;
    const sectionHeight = 45 * scaleFactor;
    const overlap = 10 * scaleFactor;
    let currentRadius = 12 * scaleFactor;
    
    internalMastGroup.position.y = baseCylinderHeight;

    for (let i = 0; i < numSections; i++) {
      const sectionGrp = new THREE.Group();

      const tubeGeom = new THREE.CylinderGeometry(currentRadius, currentRadius, sectionHeight, 32);
      tubeGeom.translate(0, sectionHeight / 2, 0);
      const tube = new THREE.Mesh(tubeGeom, matBronze);
      tube.castShadow = true;
      tube.receiveShadow = true;
      sectionGrp.add(tube);

      const collarRadius = currentRadius + 1.5 * scaleFactor;
      const collarHeight = 5 * scaleFactor;
      const collar = new THREE.Mesh(new THREE.CylinderGeometry(collarRadius, collarRadius, collarHeight, 32), matBlackMetal);
      collar.position.y = sectionHeight - collarHeight / 2;
      sectionGrp.add(collar);
      
      // Small gold details on collars
      const goldDetail = new THREE.Mesh(new THREE.CylinderGeometry(collarRadius + 0.2 * scaleFactor, collarRadius + 0.2 * scaleFactor, 0.5 * scaleFactor, 32), matGoldAccents);
      goldDetail.position.y = sectionHeight - collarHeight;
      sectionGrp.add(goldDetail);

      // Top mounting plate
      if (i === numSections - 1) {
        const topPlate = new THREE.Mesh(new THREE.CylinderGeometry(10 * scaleFactor, 10 * scaleFactor, 3 * scaleFactor, 32), matBlackMetal);
        topPlate.position.y = sectionHeight + 1.5 * scaleFactor;
        sectionGrp.add(topPlate);
      }

      sectionGrp.position.y = 0;
      mastSections.push(sectionGrp);
      
      if (i === 0) internalMastGroup.add(sectionGrp);
      else mastSections[i - 1].add(sectionGrp);

      currentRadius -= 1.5 * scaleFactor;
    }

    // Floor (Shadow catcher)
    const floorGeo = new THREE.PlaneGeometry(2000, 2000);
    // Use shadow material to only show shadows on the white background
    const floorMat = new THREE.ShadowMaterial({ opacity: 0.1 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 40 * scaleFactor - legLength * Math.cos(Math.PI / 6) - 3 * scaleFactor; // align with feet
    floor.receiveShadow = true;
    scene.add(floor);

    // --- 5. Interaction Logic ---
    let autoRotate = true;
    let targetRotX = 0;
    let targetRotY = 0;

    const onMove = (x: number, y: number) => {
      targetRotY = x * 0.25;
      targetRotX = y * 0.15;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      const rect = container.getBoundingClientRect();
      onMove(((e.clientX - rect.left) / rect.width) * 2 - 1, ((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isMobile) return;
      if (e.touches.length > 0) {
        const rect = container.getBoundingClientRect();
        const touch = e.touches[0];
        onMove(((touch.clientX - rect.left) / rect.width) * 2 - 1, ((touch.clientY - rect.top) / rect.height) * 2 - 1);
      }
    };

    if (!isMobile) {
      container.addEventListener("mousemove", onMouseMove);
      container.addEventListener("touchmove", onTouchMove, { passive: true });
    }

    controls.addEventListener("start", () => { autoRotate = false; });
    controls.addEventListener("end", () => { autoRotate = true; });

    // --- 6. Animation Loop ---
    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(container);

    const clock = new THREE.Clock();
    let frameId: number;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();
      
      // Eased animation using sine wave for extension
      // (Math.sin(...) + 1) / 2 creates a smooth 0 to 1 to 0 oscillation
      const extension = (Math.sin(elapsed * 1.2 - Math.PI / 2) + 1) / 2;

      // Animate Sections (skip first one as it's the base of the telescopic part)
      for (let i = 1; i < numSections; i++) {
        mastSections[i].position.y = extension * (sectionHeight - overlap);
      }

      // Animate Crank (rotate as mast extends/retracts)
      // Derivative of extension dictates direction of crank rotation
      const crankSpeed = Math.cos(elapsed * 1.2 - Math.PI / 2);
      crankHandleGrp.rotation.x += crankSpeed * 0.2;

      // Rotation blend
      if (autoRotate) {
        modelGroup.rotation.y += 0.003;
      }

      // Hover Group smoothly follows mouse target
      hoverGroup.rotation.y += (targetRotY - hoverGroup.rotation.y) * 0.05;
      hoverGroup.rotation.x += (targetRotX - hoverGroup.rotation.x) * 0.05;

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // --- 7. Resize & Cleanup ---
    const handleResize = () => {
      if (!container) return;

      const width = container.clientWidth;
      const height = container.clientHeight;
      const aspect = width / height;

      if (aspect < 1) {
        camera.fov = 45; 
      } else {
        camera.fov = 35;
      }

      camera.aspect = aspect;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("touchmove", onTouchMove);
      observer.disconnect();
      renderer.dispose();
      pmremGenerator.dispose();
      roomEnv.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full relative z-20"
      style={{ backgroundColor: '#ffffff' }}
    />
  );
}
