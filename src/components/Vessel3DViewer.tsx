import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RotateCw, Volume2, Layers, Eye, Plus, Minus, RotateCcw } from 'lucide-react';
import { ceramicAudio } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';

export type VesselType = 'matka' | 'surahi' | 'handi' | 'harappan' | 'diya';
export type GlazeFinish = 'terracotta' | 'black-polished' | 'ochre-etched' | 'raw-clay';

interface Vessel3DViewerProps {
  initialVessel?: VesselType;
  showControls?: boolean;
  className?: string;
  height?: string;
}

export const Vessel3DViewer: React.FC<Vessel3DViewerProps> = ({
  initialVessel = 'matka',
  showControls = true,
  className = '',
  height = 'h-[200px] sm:h-[240px] md:h-[270px]',
}) => {
  const { ui, language } = useLanguage();
  const mountRef = useRef<HTMLDivElement>(null);
  const pinchDistRef = useRef<number | null>(null);
  const [selectedVessel, setSelectedVessel] = useState<VesselType>(initialVessel);
  const [selectedFinish, setSelectedFinish] = useState<GlazeFinish>('terracotta');
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);

  // Three.js instances ref
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    vesselMesh: THREE.Mesh | null;
    diyaFlameGroup: THREE.Group | null;
    potGroup: THREE.Group;
    target: THREE.Vector3;
    spherical: { radius: number; phi: number; theta: number };
    isDragging: boolean;
    prevMouseX: number;
    prevMouseY: number;
    animFrameId: number | null;
  } | null>(null);

  // Generate 2D vector points for LatheGeometry with sealed base & floor (x=0 at start and end) to prevent ANY holes
  // Generate 2D vector points for LatheGeometry with sealed base & floor (x=0 at start and end) to prevent ANY holes
  const generateProfilePoints = useCallback((type: VesselType): THREE.Vector2[] => {
    const points: THREE.Vector2[] = [];

    if (type === 'matka') {
      // Classic spherical water cooling vessel with sealed base & floor (ZERO holes!)
      points.push(new THREE.Vector2(0, -1.44)); // center base bottom on wheel
      points.push(new THREE.Vector2(0.1, -1.44));
      points.push(new THREE.Vector2(0.5, -1.40));
      points.push(new THREE.Vector2(1.22, -1.05));
      points.push(new THREE.Vector2(1.88, -0.25));
      points.push(new THREE.Vector2(2.08, 0.45)); // widest belly
      points.push(new THREE.Vector2(1.76, 1.05)); // shoulder
      points.push(new THREE.Vector2(1.15, 1.50)); // neck
      points.push(new THREE.Vector2(1.3, 1.70));
      points.push(new THREE.Vector2(1.5, 1.85)); // flared rim
      points.push(new THREE.Vector2(1.4, 1.92)); // rim lip top

      // Inner wall contour
      points.push(new THREE.Vector2(1.16, 1.86));
      points.push(new THREE.Vector2(1.02, 1.66));
      points.push(new THREE.Vector2(0.96, 1.50));
      points.push(new THREE.Vector2(1.56, 1.02));
      points.push(new THREE.Vector2(1.88, 0.45)); // inner wide belly
      points.push(new THREE.Vector2(1.68, -0.25));
      points.push(new THREE.Vector2(1.04, -1.00));
      points.push(new THREE.Vector2(0.4, -1.26));
      points.push(new THREE.Vector2(0.1, -1.30));
      points.push(new THREE.Vector2(0, -1.30)); // 100% sealed center inner floor (NO HOLE!)
    } else if (type === 'surahi') {
      // Slender neck cooling flask with sealed base & floor
      points.push(new THREE.Vector2(0, -1.44));
      points.push(new THREE.Vector2(0.1, -1.44));
      points.push(new THREE.Vector2(0.65, -1.40));
      points.push(new THREE.Vector2(1.45, -0.85));
      points.push(new THREE.Vector2(1.75, -0.05));
      points.push(new THREE.Vector2(1.45, 0.65));
      points.push(new THREE.Vector2(0.7, 1.10)); // neck base
      points.push(new THREE.Vector2(0.52, 1.55));
      points.push(new THREE.Vector2(0.55, 1.95));
      points.push(new THREE.Vector2(0.78, 2.25)); // flared lip
      points.push(new THREE.Vector2(0.68, 2.31));

      // Inner wall contour
      points.push(new THREE.Vector2(0.54, 2.25));
      points.push(new THREE.Vector2(0.40, 1.95));
      points.push(new THREE.Vector2(0.36, 1.55));
      points.push(new THREE.Vector2(0.52, 1.10));
      points.push(new THREE.Vector2(1.25, 0.62));
      points.push(new THREE.Vector2(1.54, -0.05));
      points.push(new THREE.Vector2(1.24, -0.80));
      points.push(new THREE.Vector2(0.50, -1.26));
      points.push(new THREE.Vector2(0.10, -1.30));
      points.push(new THREE.Vector2(0, -1.30)); // 100% sealed center inner floor (NO HOLE!)
    } else if (type === 'handi') {
      // Wide-mouth cooking vessel with broad rounded base
      points.push(new THREE.Vector2(0, -1.44));
      points.push(new THREE.Vector2(0.1, -1.44));
      points.push(new THREE.Vector2(0.9, -1.40));
      points.push(new THREE.Vector2(1.68, -0.95));
      points.push(new THREE.Vector2(2.18, -0.25));
      points.push(new THREE.Vector2(1.95, 0.45));
      points.push(new THREE.Vector2(1.55, 0.90));
      points.push(new THREE.Vector2(1.95, 1.20)); // collar rim
      points.push(new THREE.Vector2(1.8, 1.27));

      // Inner wall contour
      points.push(new THREE.Vector2(1.56, 1.19));
      points.push(new THREE.Vector2(1.36, 0.90));
      points.push(new THREE.Vector2(1.75, 0.42));
      points.push(new THREE.Vector2(1.98, -0.25));
      points.push(new THREE.Vector2(1.48, -0.90));
      points.push(new THREE.Vector2(0.72, -1.24));
      points.push(new THREE.Vector2(0.10, -1.28));
      points.push(new THREE.Vector2(0, -1.28)); // 100% sealed center inner floor (NO HOLE!)
    } else if (type === 'harappan') {
      // Harappan Indus Storage Jar with tall shoulders and beaded rim
      points.push(new THREE.Vector2(0, -1.44));
      points.push(new THREE.Vector2(0.1, -1.44));
      points.push(new THREE.Vector2(0.6, -1.40));
      points.push(new THREE.Vector2(1.08, -0.65));
      points.push(new THREE.Vector2(1.58, 0.35));
      points.push(new THREE.Vector2(1.78, 1.15)); // high shoulder
      points.push(new THREE.Vector2(1.35, 1.75));
      points.push(new THREE.Vector2(1.15, 2.05));
      points.push(new THREE.Vector2(1.45, 2.25)); // beaded rim
      points.push(new THREE.Vector2(1.3, 2.31));

      // Inner wall contour
      points.push(new THREE.Vector2(1.12, 2.25));
      points.push(new THREE.Vector2(0.96, 2.03));
      points.push(new THREE.Vector2(1.15, 1.72));
      points.push(new THREE.Vector2(1.58, 1.12));
      points.push(new THREE.Vector2(1.38, 0.35));
      points.push(new THREE.Vector2(0.88, -0.62));
      points.push(new THREE.Vector2(0.42, -1.24));
      points.push(new THREE.Vector2(0.10, -1.28));
      points.push(new THREE.Vector2(0, -1.28)); // 100% sealed center inner floor (NO HOLE!)
    } else {
      // Small Diya (Traditional Earthen Oil Lamp - Smooth bowl with ZERO holes)
      points.push(new THREE.Vector2(0, -1.44));
      points.push(new THREE.Vector2(0.1, -1.44));
      points.push(new THREE.Vector2(0.75, -1.42)); // base footing
      points.push(new THREE.Vector2(1.45, -1.26)); // upward curved belly
      points.push(new THREE.Vector2(2.05, -0.95)); // flared waist
      points.push(new THREE.Vector2(2.35, -0.65)); // outer rim lip
      points.push(new THREE.Vector2(2.20, -0.55)); // rim top edge

      // Inner reservoir dish (continuous smooth bowl)
      points.push(new THREE.Vector2(1.95, -0.60));
      points.push(new THREE.Vector2(1.55, -0.88));
      points.push(new THREE.Vector2(1.05, -1.12));
      points.push(new THREE.Vector2(0.55, -1.24));
      points.push(new THREE.Vector2(0.10, -1.28));
      points.push(new THREE.Vector2(0, -1.28)); // 100% sealed smooth inner floor (NO HOLE!)
    }

    return points;
  }, []);

  // Procedural diffuse clay texture map with authentic earthy terracotta mottling and fine sand grain
  const createClayTextureMap = useCallback((finish: GlazeFinish): THREE.CanvasTexture => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    let base = '#C2592C';
    let darkSlip = '#8B3814';
    let lightSlip = '#D97945';

    if (finish === 'black-polished') {
      base = '#181412';
      darkSlip = '#0C0A09';
      lightSlip = '#2C2622';
    } else if (finish === 'raw-clay') {
      base = '#8A725B';
      darkSlip = '#6E5843';
      lightSlip = '#A68D74';
    }

    ctx.fillStyle = base;
    ctx.fillRect(0, 0, 512, 512);

    // Subtle horizontal clay slip gradients (throwing marks from damp artisan hands)
    for (let y = 0; y < 512; y += 10) {
      const grad = ctx.createLinearGradient(0, y, 0, y + 10);
      const alpha = 0.09 + Math.sin((y / 512) * Math.PI * 16) * 0.05;
      grad.addColorStop(0, darkSlip);
      grad.addColorStop(0.5, 'transparent');
      grad.addColorStop(1, lightSlip);
      ctx.fillStyle = grad;
      ctx.globalAlpha = alpha;
      ctx.fillRect(0, y, 512, 10);
    }
    ctx.globalAlpha = 1.0;

    // Organic clay mottling & iron oxide speckles
    const imgData = ctx.getImageData(0, 0, 512, 512);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const speckle = (Math.random() - 0.5) * 22;
      data[i] = Math.min(255, Math.max(0, data[i] + speckle));
      data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + speckle * 0.8));
      data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + speckle * 0.6));
    }
    ctx.putImageData(imgData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(3, 3);
    return texture;
  }, []);

  // Procedural bump map creating subtle horizontal throwing rills/ribs from potter's fingers
  const createThrowingRillsBumpMap = useCallback((): THREE.CanvasTexture => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // Baseline mid-grey
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, 512, 512);

    // Fine concentric horizontal throwing grooves
    for (let y = 0; y < 512; y += 8) {
      const intensity = Math.round(
        128 + Math.sin((y / 512) * Math.PI * 40) * 20 + (Math.random() - 0.5) * 8
      );
      ctx.fillStyle = `rgb(${intensity}, ${intensity}, ${intensity})`;
      ctx.fillRect(0, y, 512, 4);
    }

    // Micro clay grain noise
    const imgData = ctx.getImageData(0, 0, 512, 512);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const grain = (Math.random() - 0.5) * 16;
      data[i] = Math.min(255, Math.max(0, data[i] + grain));
      data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + grain));
      data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + grain));
    }
    ctx.putImageData(imgData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 8);
    return texture;
  }, []);

  // Procedural texture for incised chevron motifs
  const createEtchedTexture = useCallback((): THREE.CanvasTexture => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // Warm terracotta background
    ctx.fillStyle = '#C85A32';
    ctx.fillRect(0, 0, 512, 512);

    // Dark slip bands
    ctx.strokeStyle = '#5A2613';
    ctx.lineWidth = 6;

    // Horizontal bands
    for (let y = 140; y <= 360; y += 70) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(512, y);
      ctx.stroke();

      // Chevrons between lines
      ctx.beginPath();
      for (let x = 0; x < 512; x += 32) {
        ctx.moveTo(x, y);
        ctx.lineTo(x + 16, y - 25);
        ctx.lineTo(x + 32, y);
      }
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(3, 1);
    return texture;
  }, []);

  // Material builder based on finish with DoubleSide rendering, organic diffuse texture, and realistic throwing rill bump map
  const getVesselMaterial = useCallback(
    (finish: GlazeFinish, isWireframe: boolean): THREE.Material => {
      if (isWireframe) {
        return new THREE.MeshBasicMaterial({
          color: 0xff6b35,
          wireframe: true,
          side: THREE.DoubleSide,
        });
      }

      const bumpMap = createThrowingRillsBumpMap();
      const diffuseMap =
        finish === 'ochre-etched' ? createEtchedTexture() : createClayTextureMap(finish);

      switch (finish) {
        case 'black-polished':
          // Northern Black Polished Ware: Mirror-like metallic dark luster
          return new THREE.MeshStandardMaterial({
            map: diffuseMap,
            roughness: 0.16,
            metalness: 0.52,
            bumpMap,
            bumpScale: 0.02,
            side: THREE.DoubleSide,
          });

        case 'ochre-etched':
          return new THREE.MeshStandardMaterial({
            map: diffuseMap,
            roughness: 0.42,
            metalness: 0.08,
            bumpMap,
            bumpScale: 0.035,
            side: THREE.DoubleSide,
          });

        case 'raw-clay':
          // Unfired natural silt
          return new THREE.MeshStandardMaterial({
            map: diffuseMap,
            roughness: 0.82,
            metalness: 0.03,
            bumpMap,
            bumpScale: 0.045,
            side: THREE.DoubleSide,
          });

        case 'terracotta':
        default:
          // Low-fire terracotta with fine mineral slip and rich clay texture
          return new THREE.MeshStandardMaterial({
            map: diffuseMap,
            roughness: 0.36,
            metalness: 0.12,
            bumpMap,
            bumpScale: 0.038,
            side: THREE.DoubleSide,
          });
      }
    },
    [createEtchedTexture, createClayTextureMap, createThrowingRillsBumpMap]
  );

  // Update mesh geometry, Diya flame, and material
  const updateVesselMesh = useCallback(() => {
    if (!sceneRef.current) return;
    const { potGroup } = sceneRef.current;

    // Remove old vessel mesh
    if (sceneRef.current.vesselMesh) {
      potGroup.remove(sceneRef.current.vesselMesh);
      sceneRef.current.vesselMesh.geometry.dispose();
      sceneRef.current.vesselMesh = null;
    }

    // Remove old Diya flame group if any
    if (sceneRef.current.diyaFlameGroup) {
      potGroup.remove(sceneRef.current.diyaFlameGroup);
      sceneRef.current.diyaFlameGroup = null;
    }

    const points = generateProfilePoints(selectedVessel);
    const geometry = new THREE.LatheGeometry(points, 52);
    geometry.computeVertexNormals();

    const material = getVesselMaterial(selectedFinish, wireframe);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.position.y = 0.0;

    potGroup.add(mesh);
    sceneRef.current.vesselMesh = mesh;

    // Add Diya Flame and Wick if Diya is selected
    if (selectedVessel === 'diya' && !wireframe) {
      const diyaGroup = new THREE.Group();

      // Cotton Wick positioned firmly on inner reservoir floor (y = -1.28)
      const wickGeo = new THREE.CylinderGeometry(0.04, 0.05, 0.18, 12);
      const wickMat = new THREE.MeshStandardMaterial({ color: 0x2e2015, roughness: 0.9 });
      const wickMesh = new THREE.Mesh(wickGeo, wickMat);
      wickMesh.position.set(0, -1.19, 0);
      diyaGroup.add(wickMesh);

      // Flickering Golden Flame
      const flameGeo = new THREE.ConeGeometry(0.12, 0.38, 16);
      const flameMat = new THREE.MeshBasicMaterial({
        color: 0xffb703,
      });
      const flameMesh = new THREE.Mesh(flameGeo, flameMat);
      flameMesh.position.set(0, -0.96, 0);
      diyaGroup.add(flameMesh);

      // Warm Point Light radiating from the flame
      const flameLight = new THREE.PointLight(0xff9e00, 2.8, 6);
      flameLight.position.set(0, -0.90, 0);
      diyaGroup.add(flameLight);

      potGroup.add(diyaGroup);
      sceneRef.current.diyaFlameGroup = diyaGroup;
    }
  }, [selectedVessel, selectedFinish, wireframe, generateProfilePoints, getVesselMaterial]);

  // Initial Three.js Scene Setup with Spherical Orbit Camera & Multi-Tier Wheel
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 400;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.background = null;

    const target = new THREE.Vector3(0, 0.1, 0);
    const spherical = { radius: 5.6, phi: 1.25, theta: 0.4 };

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.x = target.x + spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta);
    camera.position.y = target.y + spherical.radius * Math.cos(spherical.phi);
    camera.position.z = target.z + spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta);
    camera.lookAt(target);

    // Renderer with transparency so the dark minimal studio wall shines through
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'default',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.setClearColor(0x000000, 0);

    const dom = renderer.domElement;
    dom.style.display = 'block';
    dom.style.width = '100%';
    dom.style.height = '100%';

    // Prevent Chrome / Edge WebGL context lost white screen crash
    dom.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
    });
    dom.addEventListener('webglcontextrestored', () => {
      updateVesselMesh();
    });

    container.innerHTML = '';
    container.appendChild(dom);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 1.6);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffecd2, 2.4);
    sunLight.position.set(4, 7, 3);
    sunLight.castShadow = true;
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0xff8844, 1.6);
    rimLight.position.set(-5, 3, -4);
    scene.add(rimLight);

    const softFill = new THREE.PointLight(0xffc299, 1.2, 10);
    softFill.position.set(0, -1, 3);
    scene.add(softFill);

    // Pot Group
    const potGroup = new THREE.Group();
    scene.add(potGroup);

    // Realistic Multi-Tier Potter's Wheel Base
    const wheelGroup = new THREE.Group();

    // 1. Heavy stone flywheel outer rim
    const outerRimGeo = new THREE.CylinderGeometry(2.45, 2.5, 0.18, 54);
    const outerRimMat = new THREE.MeshStandardMaterial({
      color: 0x2e2520,
      roughness: 0.88,
      metalness: 0.15,
    });
    const outerRim = new THREE.Mesh(outerRimGeo, outerRimMat);
    outerRim.position.y = -1.6;
    outerRim.receiveShadow = true;
    wheelGroup.add(outerRim);

    // 2. Inset wooden wheel platter
    const platterGeo = new THREE.CylinderGeometry(1.7, 1.75, 0.08, 48);
    const platterMat = new THREE.MeshStandardMaterial({
      color: 0x483628,
      roughness: 0.72,
      metalness: 0.08,
    });
    const platter = new THREE.Mesh(platterGeo, platterMat);
    platter.position.y = -1.48;
    platter.receiveShadow = true;
    wheelGroup.add(platter);

    // 3. Flush center wooden wheel bat disc (flat - ZERO protrusion into vessel floor)
    const centerBatGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.015, 32);
    const centerBatMat = new THREE.MeshStandardMaterial({
      color: 0x241d18,
      roughness: 0.72,
      metalness: 0.2,
    });
    const centerBat = new THREE.Mesh(centerBatGeo, centerBatMat);
    centerBat.position.y = -1.439;
    wheelGroup.add(centerBat);

    potGroup.add(wheelGroup);

    // Contact shadow floor disc
    const floorGeo = new THREE.CircleGeometry(3.2, 32);
    const floorMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.38,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -1.72;
    scene.add(floorMesh);

    // Store state in ref
    sceneRef.current = {
      renderer,
      scene,
      camera,
      vesselMesh: null,
      diyaFlameGroup: null,
      potGroup,
      target,
      spherical,
      isDragging: false,
      prevMouseX: 0,
      prevMouseY: 0,
      animFrameId: null,
    };

    updateVesselMesh();

    // Mouse drag handlers with full spherical camera orbit
    const onMouseDown = (e: MouseEvent) => {
      if (!sceneRef.current) return;
      sceneRef.current.isDragging = true;
      sceneRef.current.prevMouseX = e.clientX;
      sceneRef.current.prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!sceneRef.current || !sceneRef.current.isDragging) return;
      const deltaX = e.clientX - sceneRef.current.prevMouseX;
      const deltaY = e.clientY - sceneRef.current.prevMouseY;

      sceneRef.current.spherical.theta -= deltaX * 0.008;
      sceneRef.current.spherical.phi -= deltaY * 0.008;

      // Allow dragging up to look deeply inside rim
      sceneRef.current.spherical.phi = THREE.MathUtils.clamp(
        sceneRef.current.spherical.phi,
        0.18,
        Math.PI / 2 - 0.02
      );

      sceneRef.current.prevMouseX = e.clientX;
      sceneRef.current.prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      if (!sceneRef.current) return;
      sceneRef.current.isDragging = false;
    };

    // Touch event handlers for mobile with 2-finger pinch-to-zoom support
    const onTouchStart = (e: TouchEvent) => {
      if (!sceneRef.current) return;
      if (e.touches.length === 2) {
        sceneRef.current.isDragging = false;
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        pinchDistRef.current = Math.hypot(dx, dy);
      } else if (e.touches.length === 1) {
        pinchDistRef.current = null;
        sceneRef.current.isDragging = true;
        sceneRef.current.prevMouseX = e.touches[0].clientX;
        sceneRef.current.prevMouseY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!sceneRef.current) return;

      // Two-finger pinch to zoom in / zoom out
      if (e.touches.length === 2) {
        if (e.cancelable) e.preventDefault();
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const currentDist = Math.hypot(dx, dy);

        if (pinchDistRef.current !== null) {
          const diff = currentDist - pinchDistRef.current;
          sceneRef.current.spherical.radius -= diff * 0.016;
          sceneRef.current.spherical.radius = THREE.MathUtils.clamp(
            sceneRef.current.spherical.radius,
            3.0,
            8.5
          );
        }
        pinchDistRef.current = currentDist;
        return;
      }

      // Single-finger 360 degree orbit
      if (e.touches.length === 1 && sceneRef.current.isDragging) {
        if (e.cancelable) e.preventDefault();
        const deltaX = e.touches[0].clientX - sceneRef.current.prevMouseX;
        const deltaY = e.touches[0].clientY - sceneRef.current.prevMouseY;

        sceneRef.current.spherical.theta -= deltaX * 0.009;
        sceneRef.current.spherical.phi -= deltaY * 0.009;

        sceneRef.current.spherical.phi = THREE.MathUtils.clamp(
          sceneRef.current.spherical.phi,
          0.18,
          Math.PI / 2 - 0.02
        );

        sceneRef.current.prevMouseX = e.touches[0].clientX;
        sceneRef.current.prevMouseY = e.touches[0].clientY;
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!sceneRef.current) return;
      if (e.touches.length < 2) {
        pinchDistRef.current = null;
      }
      if (e.touches.length === 1) {
        sceneRef.current.isDragging = true;
        sceneRef.current.prevMouseX = e.touches[0].clientX;
        sceneRef.current.prevMouseY = e.touches[0].clientY;
      } else if (e.touches.length === 0) {
        sceneRef.current.isDragging = false;
      }
    };

    // Scroll to zoom
    const onWheel = (e: WheelEvent) => {
      if (!sceneRef.current) return;
      e.preventDefault();
      sceneRef.current.spherical.radius += e.deltaY * 0.004;
      sceneRef.current.spherical.radius = THREE.MathUtils.clamp(
        sceneRef.current.spherical.radius,
        3.2,
        9.0
      );
    };

    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    dom.addEventListener('touchstart', onTouchStart, { passive: true });
    dom.addEventListener('touchmove', onTouchMove, { passive: false });
    dom.addEventListener('touchend', onTouchEnd);
    dom.addEventListener('wheel', onWheel, { passive: false });

    // Handle container resize
    const handleResize = () => {
      if (!container || !sceneRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 400;
      sceneRef.current.camera.aspect = w / h;
      sceneRef.current.camera.updateProjectionMatrix();
      sceneRef.current.renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Continuous Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      if (!sceneRef.current) return;
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Slow gentle background turntable drift
      sceneRef.current.potGroup.rotation.y += delta * 0.25;

      // Diya flame flicker
      if (sceneRef.current.diyaFlameGroup) {
        const flameMesh = sceneRef.current.diyaFlameGroup.children[1];
        if (flameMesh) {
          flameMesh.scale.y = 1 + Math.sin(time * 12) * 0.12;
          flameMesh.scale.x = 1 + Math.cos(time * 14) * 0.08;
        }
      }

      // Update camera position from spherical coordinates
      const { camera, target, spherical, renderer, scene } = sceneRef.current;
      const sinPhiRadius = spherical.radius * Math.sin(spherical.phi);
      camera.position.x = target.x + sinPhiRadius * Math.sin(spherical.theta);
      camera.position.y = target.y + spherical.radius * Math.cos(spherical.phi);
      camera.position.z = target.z + sinPhiRadius * Math.cos(spherical.theta);
      camera.lookAt(target);

      renderer.render(scene, camera);
      sceneRef.current.animFrameId = requestAnimationFrame(animate);
    };

    sceneRef.current.animFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('mousedown', onMouseDown);
      dom.removeEventListener('touchstart', onTouchStart);
      dom.removeEventListener('touchmove', onTouchMove);
      dom.removeEventListener('touchend', onTouchEnd);
      dom.removeEventListener('wheel', onWheel);

      if (sceneRef.current?.animFrameId) {
        cancelAnimationFrame(sceneRef.current.animFrameId);
      }
      renderer.dispose();
      sceneRef.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Update mesh whenever vessel, finish, or wireframe changes
  useEffect(() => {
    updateVesselMesh();
  }, [updateVesselMesh]);

  // Fast Spin interaction
  const triggerWheelSpin = () => {
    if (!sceneRef.current) return;
    setIsSpinning(true);
    ceramicAudio.playWheelSpin();
    let count = 0;
    const spinInterval = setInterval(() => {
      if (!sceneRef.current) return;
      sceneRef.current.spherical.theta += 0.08;
      count++;
      if (count > 30) {
        clearInterval(spinInterval);
        setIsSpinning(false);
      }
    }, 30);
  };

  // Ceramic chime tap
  const triggerChime = () => {
    const pitch =
      selectedVessel === 'diya'
        ? 1040
        : selectedVessel === 'surahi'
        ? 980
        : selectedVessel === 'handi'
        ? 880
        : 820;
    ceramicAudio.playPotTap(pitch);
  };

  // Zoom in / zoom out controls for single-touch mobile accessibility
  const zoomIn = useCallback(() => {
    if (!sceneRef.current) return;
    sceneRef.current.spherical.radius = THREE.MathUtils.clamp(
      sceneRef.current.spherical.radius - 0.7,
      3.0,
      8.5
    );
  }, []);

  const zoomOut = useCallback(() => {
    if (!sceneRef.current) return;
    sceneRef.current.spherical.radius = THREE.MathUtils.clamp(
      sceneRef.current.spherical.radius + 0.7,
      3.0,
      8.5
    );
  }, []);

  const resetView = useCallback(() => {
    if (!sceneRef.current) return;
    sceneRef.current.spherical.radius = 5.2;
    sceneRef.current.spherical.phi = 1.25;
    sceneRef.current.spherical.theta = 0.2;
  }, []);

  return (
    <div
      className={`relative flex flex-col justify-between rounded-3xl border border-[#B8582B]/30 bg-gradient-to-b from-[#251D18] to-[#1A1410] p-4 sm:p-6 shadow-2xl text-[#FAF5F0] overflow-hidden ${className}`}
    >
      {/* 3D Header Bar */}
      <div className="z-10 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3.5">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-[#E5A344] animate-pulse" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#E5A344]">
            {ui.studio?.badge || 'Interactive 3D Vessel Studio'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Audio Tap Button */}
          <button
            onClick={triggerChime}
            className="group flex items-center gap-1.5 rounded-lg border border-[#E5A344]/30 bg-black/40 px-3 py-1.5 text-xs font-mono font-semibold text-[#FAF5F0] transition-all hover:bg-[#B8582B] active:scale-95 shadow-2xs"
            title="Tap to hear authentic ceramic chime resonance"
          >
            <Volume2 className="h-3.5 w-3.5 text-[#E5A344] group-hover:text-white" />
            <span>{ui.studio?.tapSound || 'Tap for the sound'}</span>
          </button>

          {/* Spin Wheel Button */}
          <button
            onClick={triggerWheelSpin}
            className={`flex items-center gap-1.5 rounded-lg border border-white/20 px-3 py-1.5 text-xs font-mono font-semibold transition-all active:scale-95 shadow-2xs ${
              isSpinning ? 'bg-[#B8582B] text-white' : 'bg-black/30 text-[#E8DFD7] hover:bg-black/50'
            }`}
            title="Spin the potter's wheel"
          >
            <RotateCw className={`h-3.5 w-3.5 ${isSpinning ? 'animate-spin' : ''}`} />
            <span>{ui.makingExtras?.spinWheel || 'Spin Wheel'}</span>
          </button>
        </div>
      </div>

      {/* Main 3D WebGL Canvas with Plain Dark Wall Background */}
      <div className="relative w-full flex-1 rounded-2xl overflow-hidden mt-1.5 bg-[#171310] border border-[#B8582B]/25 shadow-2xl">
        {/* Visible Plain Dark Wall Texture */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <img
            src="/images/studio-wall.jpg"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-center opacity-85 contrast-125 brightness-95 filter transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#140f0c]/50 via-transparent to-[#140f0c]/60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,230,200,0.06)_0%,transparent_60%)]" />
        </div>

        <div
          ref={mountRef}
          className={`relative z-10 w-full ${height} cursor-grab active:cursor-grabbing touch-none select-none`}
          title="Drag up/down to tilt, drag left/right to rotate 360°, scroll to zoom"
        />

        {/* On-screen Touch Zoom Controls */}
        <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1 rounded-lg bg-black/70 p-1 backdrop-blur-md border border-white/15 shadow-md">
          <button
            onClick={zoomIn}
            className="flex h-6 w-6 items-center justify-center rounded bg-white/10 text-white hover:bg-[#B8582B] active:scale-90 transition-all"
            title="Zoom In"
            aria-label="Zoom in"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={zoomOut}
            className="flex h-6 w-6 items-center justify-center rounded bg-white/10 text-white hover:bg-[#B8582B] active:scale-90 transition-all"
            title="Zoom Out"
            aria-label="Zoom out"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={resetView}
            className="flex h-6 w-6 items-center justify-center rounded bg-white/10 text-[#D8C7B8] hover:bg-white/20 hover:text-white active:scale-90 transition-all"
            title="Reset View"
            aria-label="Reset 3D camera"
          >
            <RotateCcw className="h-3 w-3" />
          </button>
        </div>

        {/* Drag Hint Overlay */}
        <div className="pointer-events-none absolute bottom-2.5 left-2.5 z-20 flex items-center gap-1.5 rounded-full bg-black/80 px-3 py-1 font-mono text-[10px] text-[#FAF5F0] backdrop-blur-md border border-white/10">
          <Eye className="h-3 w-3 text-[#E5A344]" />
          <span>{ui.gameExtras?.orbitHint || 'Orbit 360° • Pinch to zoom • Drag rim'}</span>
        </div>

        {/* Wireframe Toggle Badge */}
        <button
          onClick={() => setWireframe(!wireframe)}
          className={`absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5 rounded-lg px-2 py-0.5 text-[11px] font-mono font-semibold transition-all shadow-md ${
            wireframe
              ? 'bg-[#E5A344] text-[#140E0B]'
              : 'bg-black/60 text-[#E8DFD7] border border-white/20 hover:bg-black/80'
          }`}
        >
          <Layers className="h-3 w-3" />
          <span>{wireframe ? 'Mesh: ON' : (language === 'te' ? 'వైర్‌ఫ్రేమ్' : language === 'hi' ? 'वायरफ्रेम' : 'Wireframe')}</span>
        </button>
      </div>

      {/* Interactive Controls Bar - Sleek & Compact */}
      {showControls && (
        <div className="z-10 mt-2 space-y-2 border-t border-white/10 pt-2">
          {/* Vessel Form Selector */}
          <div className="flex flex-wrap items-center justify-between gap-1.5">
            <span className="font-mono text-[11px] font-semibold text-[#E5A344] uppercase tracking-wider">
              {language === 'te'
                ? 'పాత్ర రూపం:'
                : language === 'hi'
                ? 'पात्र का रूप:'
                : language === 'ta'
                ? 'பாண்ட வடிவம்:'
                : language === 'ml'
                ? 'പാത്ര രൂപം:'
                : language === 'kn'
                ? 'ಪಾತ್ರೆಯ ರೂಪ:'
                : 'Vessel Form:'}
            </span>
            <div className="flex flex-wrap gap-1">
              {[
                { id: 'matka', label: ui.gameExtras?.presets?.matka?.label || 'Matka' },
                { id: 'surahi', label: ui.gameExtras?.presets?.surahi?.label || 'Surahi' },
                { id: 'handi', label: ui.gameExtras?.presets?.handi?.label || 'Handi' },
                { id: 'harappan', label: ui.gameExtras?.presets?.harappan?.label || 'Harappan Urn' },
                {
                  id: 'diya',
                  label:
                    language === 'te'
                      ? 'చిన్న ప్రమిద (దివ్య)'
                      : language === 'hi'
                      ? 'छोटा दीया'
                      : language === 'ta'
                      ? 'சிறு அகல் விளக்கு'
                      : language === 'ml'
                      ? 'മൺചിരാത്'
                      : language === 'kn'
                      ? 'ಸಣ್ಣ ಹಣತೆ'
                      : 'Small Diya',
                },
              ].map((v) => (
                <button
                  key={v.id}
                  onClick={() => {
                    setSelectedVessel(v.id as VesselType);
                    ceramicAudio.playPotTap(v.id === 'diya' ? 1040 : 750);
                  }}
                  className={`rounded-lg px-2.5 py-1 text-[11px] font-mono transition-all ${
                    selectedVessel === v.id
                      ? 'bg-[#B8582B] text-white font-bold shadow-md scale-102'
                      : 'bg-black/40 text-[#E8DFD7] hover:bg-black/60 border border-white/10'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          {/* Clay Glaze / Finish Selector */}
          <div className="flex flex-wrap items-center justify-between gap-1.5">
            <span className="font-mono text-[11px] font-semibold text-[#E5A344] uppercase tracking-wider">
              {language === 'te'
                ? 'లేపనం / మెరుపు:'
                : language === 'hi'
                ? 'लेप / पॉलिश:'
                : language === 'ta'
                ? 'பூச்சு:'
                : language === 'ml'
                ? 'ലേപനം:'
                : language === 'kn'
                ? 'ಲೇಪನ:'
                : 'Finish:'}
            </span>
            <div className="flex flex-wrap gap-1">
              {[
                { id: 'terracotta', label: ui.gameExtras?.slips?.terracotta?.name || 'Terracotta Red', color: '#C85A32' },
                { id: 'black-polished', label: ui.gameExtras?.slips?.nbpw?.name || 'Black Polished', color: '#25201C' },
                { id: 'ochre-etched', label: ui.gameExtras?.slips?.harappan?.name || 'Harappan Slip', color: '#D99B26' },
                {
                  id: 'raw-clay',
                  label:
                    language === 'te'
                      ? 'పచ్చి మట్టి'
                      : language === 'hi'
                      ? 'कच्ची मिट्टी'
                      : language === 'ta'
                      ? 'பச்சை மண்'
                      : language === 'ml'
                      ? 'പച്ച മണ്ണ്'
                      : language === 'kn'
                      ? 'ಹಸಿ ಮಣ್ಣು'
                      : 'Unfired Clay',
                  color: '#8A725B',
                },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFinish(f.id as GlazeFinish)}
                  className={`flex items-center gap-1.5 rounded-lg px-2 py-1 text-[11px] font-mono transition-all ${
                    selectedFinish === f.id
                      ? 'border border-[#E5A344] bg-[#B8582B]/35 text-white font-bold shadow-xs'
                      : 'bg-black/40 text-[#E8DFD7] hover:bg-black/60 border border-white/10'
                  }`}
                >
                  <span
                    className="h-2 w-2 rounded-full border border-white/40 shadow-inner"
                    style={{ backgroundColor: f.color }}
                  />
                  <span>{f.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
