"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/**
 * TelescopicMast Component
 * Renders a high-detail 3D pneumatic telescopic mast with interactive controls
 * and smooth animations. Optimized for performance with IntersectionObserver.
 */
export default function TelescopicMast() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;

    // --- 1. Scene Setup ---
    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(35, container.clientWidth / container.clientHeight, 1, 5000);
    // Position camera far enough to see the whole mast
    camera.position.set(500, 400, 800);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    // Optimization: limit pixel ratio to 2 for performance on high-DPI mobile devices
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Ensure touch interactions don't scroll the page
    container.style.touchAction = "pan-y";

    // --- 2. Environment & Lighting ---
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    scene.environment = pmremGenerator.fromScene(roomEnv, 0.04).texture;
    roomEnv.dispose();

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    // Set target to the middle of the mast
    controls.target.set(0, 240, 0);
    controls.maxDistance = 2500;
    controls.minDistance = 200;
    controls.maxPolarAngle = Math.PI / 2 - 0.05;
    controls.enableZoom = false; // Keep it focused on rotation
    
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      controls.enableRotate = false;
      controls.enablePan = false;
    }

    // Smooth interaction on touch
    controls.rotateSpeed = 0.7;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
    keyLight.position.set(200, 400, 200);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x77abff, 2.5);
    rimLight.position.set(-300, 200, -300);
    scene.add(rimLight);

    // --- 3. Materials ---
    // Optimization: Reuse materials and simplify for mobil if needed, but these are okay.
    const matSilver = new THREE.MeshPhysicalMaterial({
      color: 0xcccccc, metalness: 1.0, roughness: 0.15, clearcoat: 0.2
    });
    const matDarkMetal = new THREE.MeshPhysicalMaterial({
      color: 0x222222, metalness: 0.8, roughness: 0.35
    });
    const matGlossyBlack = new THREE.MeshPhysicalMaterial({
      color: 0x0a0a0a, metalness: 0.7, roughness: 0.1, clearcoat: 0.5
    });
    const matRubber = new THREE.MeshStandardMaterial({
      color: 0x111111, roughness: 0.9, metalness: 0.0
    });
    const matBlueMetal = new THREE.MeshPhysicalMaterial({
      color: 0x0f2a5c, metalness: 0.6, roughness: 0.4, clearcoat: 0.3
    });
    const matYellow = new THREE.MeshPhysicalMaterial({
      color: 0xffa200, metalness: 0.1, roughness: 0.4, clearcoat: 0.3
    });

    // --- 4. Model Building ---
    const hoverGroup = new THREE.Group();
    scene.add(hoverGroup);

    const modelGroup = new THREE.Group();
    hoverGroup.add(modelGroup);

    // Scale factor to fit the container
    const baseScale = isMobile ? 1.0 : 1.35;
    const scaleFactor = baseScale * (container.clientHeight / 500);

    const mastSections: THREE.Group[] = [];
    const internalMastGroup = new THREE.Group();
    modelGroup.add(internalMastGroup);

    // Outrigger Legs
    const legLength = 65 * scaleFactor;
    const legWidth = 8 * scaleFactor;
    const legHeight = 7 * scaleFactor;
    const handles: THREE.Group[] = [];

    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI / 2) + Math.PI / 4;
      const legGroup = new THREE.Group();
      const legMesh = new THREE.Mesh(new RoundedBoxGeometry(legLength, legHeight, legWidth, 4, 1), matDarkMetal);
      legMesh.position.set(legLength / 2 + 10 * scaleFactor, 3 * scaleFactor + 4, 0);
      legMesh.castShadow = true;
      legMesh.receiveShadow = true;
      legGroup.add(legMesh);

      const innerLeg = new THREE.Mesh(new THREE.BoxGeometry(legLength * 0.7, legHeight * 0.7, legWidth * 0.7), matSilver);
      innerLeg.position.set(legLength + 5 * scaleFactor, 3 * scaleFactor + 4, 0);
      legGroup.add(innerLeg);

      for (let s = 0; s < 4; s++) {
        const stripe = new THREE.Mesh(new THREE.BoxGeometry(3 * scaleFactor, legHeight + 0.5, legWidth + 0.5), (s % 2 == 0 ? matYellow : matGlossyBlack));
        stripe.position.set(legLength + 15 * scaleFactor + (s * 4 * scaleFactor), 3 * scaleFactor + 4, 0);
        stripe.rotation.z = Math.PI / 12;
        legGroup.add(stripe);
      }

      const hydr = new THREE.Mesh(new THREE.CylinderGeometry(1.5 * scaleFactor, 1.5 * scaleFactor, legLength * 0.8, 16), matBlueMetal);
      hydr.rotation.z = Math.PI / 2;
      hydr.position.set(legLength / 2 + 20 * scaleFactor, 3 * scaleFactor + 4 + legHeight / 2 + 2, 0);
      legGroup.add(hydr);

      const endX = legLength * 1.35;
      const bracket = new THREE.Mesh(new THREE.BoxGeometry(8 * scaleFactor, 14 * scaleFactor, 10 * scaleFactor), matDarkMetal);
      bracket.position.set(endX, 6 * scaleFactor, 0);
      legGroup.add(bracket);

      const handleGrp = new THREE.Group();
      handleGrp.position.set(endX, 15 * scaleFactor, 0);
      const crankCenter = new THREE.Mesh(new THREE.CylinderGeometry(3 * scaleFactor, 3 * scaleFactor, 2 * scaleFactor, 16), matBlueMetal);
      handleGrp.add(crankCenter);
      handleGrp.add(new THREE.Mesh(new THREE.BoxGeometry(16 * scaleFactor, 1.5 * scaleFactor, 1.5 * scaleFactor), matSilver));
      const handleKnob = new THREE.Mesh(new THREE.CylinderGeometry(1.5 * scaleFactor, 1.5 * scaleFactor, 5 * scaleFactor, 16), matRubber);
      handleKnob.rotation.x = Math.PI / 2;
      handleKnob.position.set(7 * scaleFactor, 2.5 * scaleFactor, 0);
      handleGrp.add(handleKnob);
      legGroup.add(handleGrp);
      handles.push(handleGrp);

      const footD = new THREE.Mesh(new THREE.CylinderGeometry(6 * scaleFactor, 6.5 * scaleFactor, 1.5 * scaleFactor, 32), matSilver);
      footD.position.set(endX, -3.5 * scaleFactor, 0);
      footD.castShadow = true;
      legGroup.add(footD);

      legGroup.rotation.y = -angle;
      modelGroup.add(legGroup);
    }

    // Equipment Payload
    const pumpGroup = new THREE.Group();
    pumpGroup.position.set(12 * scaleFactor, 12 * scaleFactor, 14 * scaleFactor);
    pumpGroup.add(new THREE.Mesh(new RoundedBoxGeometry(16, 10, 16, 3, 1.5), matBlueMetal));
    modelGroup.add(pumpGroup);

    // The Pneumatic Telescopic Mast
    const numSections = 8;
    const sectionHeight = 40 * scaleFactor;
    const overlap = 4 * scaleFactor;
    let currentRadius = 14 * scaleFactor;

    for (let i = 0; i < numSections; i++) {
      const sectionGrp = new THREE.Group();

      // Slightly reduced segments for mobile performance
      const tubeGeom = new THREE.CylinderGeometry(currentRadius, currentRadius, sectionHeight, isMobile ? 32 : 64);
      tubeGeom.translate(0, sectionHeight / 2, 0);
      const tube = new THREE.Mesh(tubeGeom, matSilver);
      tube.castShadow = true;
      tube.receiveShadow = true;
      sectionGrp.add(tube);

      const collarRadius = currentRadius + 1.8 * scaleFactor;
      const collar = new THREE.Mesh(new THREE.CylinderGeometry(collarRadius, collarRadius, 4 * scaleFactor, isMobile ? 32 : 64), i === 0 ? matDarkMetal : matGlossyBlack);
      collar.position.y = sectionHeight;
      sectionGrp.add(collar);

      if (i === numSections - 1) {
        const topPlate = new THREE.Mesh(new THREE.CylinderGeometry(8 * scaleFactor, 8 * scaleFactor, 1.5 * scaleFactor, 32), matGlossyBlack);
        topPlate.position.y = sectionHeight + 1 * scaleFactor;
        sectionGrp.add(topPlate);

        const sensorBox = new THREE.Mesh(new RoundedBoxGeometry(6 * scaleFactor, 4 * scaleFactor, 6 * scaleFactor, 2, 1), matSilver);
        sensorBox.position.y = sectionHeight + 4 * scaleFactor;
        sectionGrp.add(sensorBox);
      }

      sectionGrp.position.y = i === 0 ? 15 : 0;
      mastSections.push(sectionGrp);
      if (i === 0) internalMastGroup.add(sectionGrp);
      else mastSections[i - 1].add(sectionGrp);

      currentRadius -= 1.2 * scaleFactor;
    }

    // Dynamic Cables
    interface Cable {
      mesh: THREE.Mesh<THREE.TubeGeometry, THREE.Material>;
      points: THREE.Vector3[];
      curve: THREE.CatmullRomCurve3;
      offsetRot: number;
      radius: number;
    }
    const cables: Cable[] = [];
    const createCable = (color: THREE.Material, radius: number, offsetRot: number) => {
      const points: THREE.Vector3[] = [];
      // Reduced cable segments for performance
      const segments = isMobile ? 12 : 20;
      for (let i = 0; i < segments; i++) points.push(new THREE.Vector3());
      const curve = new THREE.CatmullRomCurve3(points);
      // Reduced tube segments for performance
      const geom = new THREE.TubeGeometry(curve, isMobile ? 32 : 64, radius, isMobile ? 4 : 8, false);
      const mesh = new THREE.Mesh(geom, color);
      mesh.castShadow = true;
      modelGroup.add(mesh);
      return { mesh, points, curve, offsetRot, radius };
    };

    const cable1 = createCable(matRubber, 1.2 * scaleFactor, 0);
    const cable2 = createCable(matYellow, 0.8 * scaleFactor, 0.3);
    const cable3 = createCable(matBlueMetal, 0.6 * scaleFactor, 0.6);
    cables.push(cable1, cable2, cable3);

    function updateCables(extension: number) {
      const topSection = mastSections[numSections - 1];
      const topPos = new THREE.Vector3();
      topSection.getWorldPosition(topPos);
      topPos.y += sectionHeight;

      cables.forEach((c, index) => {
        const startPos = index === 0 ? new THREE.Vector3(12 * scaleFactor, 22 * scaleFactor, 14 * scaleFactor) :
          index === 1 ? new THREE.Vector3(-16 * scaleFactor, 25 * scaleFactor, 16 * scaleFactor) :
            new THREE.Vector3(0, 15 * scaleFactor, 0);

        for (let i = 0; i < c.points.length; i++) {
          const t = i / (c.points.length - 1);
          const y = THREE.MathUtils.lerp(startPos.y, topPos.y, t);
          const r = 20 + Math.sin(t * Math.PI) * 40 * (1 - extension * 0.5);
          const rot = t * Math.PI * 3 + c.offsetRot;

          c.points[i].set(
            Math.cos(rot) * r,
            y,
            Math.sin(rot) * r
          );
        }
        c.curve.points = c.points;
        c.mesh.geometry.dispose();
        c.mesh.geometry = new THREE.TubeGeometry(c.curve, isMobile ? 32 : 64, c.radius, isMobile ? 4 : 8, false);
      });
    }

    // Diagonal Struts
    const strutGeom = new THREE.CylinderGeometry(1.5 * scaleFactor, 1.5 * scaleFactor, 30 * scaleFactor);
    const strutPositions = [
      { x: 10, z: 10, rx: -Math.PI / 5, ry: Math.PI / 4 },
      { x: -10, z: 10, rx: -Math.PI / 5, ry: -Math.PI / 4 },
      { x: 10, z: -10, rx: Math.PI / 5, ry: -Math.PI / 4 },
      { x: -10, z: -10, rx: Math.PI / 5, ry: Math.PI / 4 }
    ];
    strutPositions.forEach(pos => {
      const strut = new THREE.Mesh(strutGeom, matDarkMetal);
      strut.position.set(pos.x * scaleFactor, 18 * scaleFactor, pos.z * scaleFactor);
      strut.rotation.set(pos.rx, pos.ry, 0);
      modelGroup.add(strut);
    });

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
      const extension = (Math.sin(elapsed * 0.5) + 1) / 2;

      // Animate Sections
      for (let i = 1; i < numSections; i++) {
        mastSections[i].position.y = extension * (sectionHeight - overlap);
      }

      // Animate Handles
      handles.forEach((h, i) => {
        h.rotation.y = elapsed * 2 * (i % 2 === 0 ? 1 : -1);
      });

      // Update Cables
      updateCables(extension);

      // Rotation blend
      if (autoRotate) {
        modelGroup.rotation.y += 0.002;
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

      // Responsive Camera Adjustment: for narrow screens, zoom out or increase FOV
      if (aspect < 1) {
        camera.fov = 45; // Wider field of view for vertical screens
      } else {
        camera.fov = 35;
      }

      camera.aspect = aspect;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);
    // Call once to set initial state correctly
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
    />
  );
}
