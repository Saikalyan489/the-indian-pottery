import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Flame,
  RotateCw,
  Sparkles,
  Volume2,
  CheckCircle2,
  Award,
  Play,
  Pause,
  RefreshCw,
  Thermometer,
  ShieldCheck,
  Eye,
  Radio,
  Plus,
  Minus,
  RotateCcw,
  Sliders,
  Hand,
  Shapes,
} from 'lucide-react';
import { ceramicAudio } from '../utils/audio';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useLanguage } from '../context/LanguageContext';

type GameStep = 'shaping' | 'firing' | 'finished';

type GlazeStyle = 'terracotta' | 'black-polished' | 'harappan-slip';

interface ShapeParams {
  rimWidth: number; // 0.6 to 1.8
  bellyWidth: number; // 0.6 to 1.9
  heightScale: number; // 0.7 to 1.6
  baseWidth: number; // 0.6 to 1.4
}

const SHAPE_PRESETS: Record<string, { label: string; desc: string; params: ShapeParams }> = {
  matka: {
    label: 'Village Matka',
    desc: 'Wide spherical belly for evaporative water cooling',
    params: { rimWidth: 1.05, bellyWidth: 1.6, heightScale: 1.0, baseWidth: 0.8 },
  },
  surahi: {
    label: 'Slender Surahi',
    desc: 'Graceful elongated neck and rounded reservoir',
    params: { rimWidth: 0.75, bellyWidth: 1.35, heightScale: 1.45, baseWidth: 0.7 },
  },
  handi: {
    label: 'Cooking Handi',
    desc: 'Stout, wide-mouthed clay vessel for slow woodfire curries',
    params: { rimWidth: 1.45, bellyWidth: 1.5, heightScale: 0.82, baseWidth: 1.1 },
  },
  harappan: {
    label: 'Ancient Harappan Urn',
    desc: 'High shoulders and tapered base inspired by Mohenjo-daro',
    params: { rimWidth: 1.15, bellyWidth: 1.4, heightScale: 1.3, baseWidth: 0.65 },
  },
};

export const PottersWheelGame: React.FC = () => {
  const { ui } = useLanguage();
  const [currentStep, setCurrentStep] = useState<GameStep>('shaping');
  const [shape, setShape] = useState<ShapeParams>(SHAPE_PRESETS.matka.params);
  const [rpm, setRpm] = useState<number>(90);
  const [isWheelRunning, setIsWheelRunning] = useState<boolean>(true);
  const [selectedGlaze, setSelectedGlaze] = useState<GlazeStyle>('terracotta');
  const [kilnTemp, setKilnTemp] = useState<number>(30);
  const [isFiringActive, setIsFiringActive] = useState<boolean>(false);
  const [activePreset, setActivePreset] = useState<string>('matka');
  const [tapCount, setTapCount] = useState<number>(0);
  const [lastChimePitch, setLastChimePitch] = useState<number>(880);
  const [ringingActive, setRingingActive] = useState<boolean>(false);
  const [mobileTab, setMobileTab] = useState<'sliders' | 'presets' | 'gestures'>('sliders');

  const containerRef = useRef<HTMLDivElement>(null);
  const pinchDistRef = useRef<number | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const vesselMeshRef = useRef<THREE.Mesh | null>(null);
  const wheelMeshRef = useRef<THREE.Group | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const rotationRef = useRef<number>(0);
  const isWheelRunningRef = useRef<boolean>(true);
  const rpmRef = useRef<number>(90);
  const currentStepRef = useRef<GameStep>('shaping');
  const firingIntervalRef = useRef<any>(null);

  // Keep refs in sync with state
  useEffect(() => {
    isWheelRunningRef.current = isWheelRunning;
  }, [isWheelRunning]);

  useEffect(() => {
    rpmRef.current = rpm;
  }, [rpm]);

  useEffect(() => {
    currentStepRef.current = currentStep;
  }, [currentStep]);

  // Spherical camera orbit state
  const targetRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0.8, 0));
  const sphericalRef = useRef<{ radius: number; phi: number; theta: number }>({
    radius: 4.8,
    phi: 1.25,
    theta: 0.2,
  });
  const isDraggingRef = useRef<boolean>(false);
  const prevMouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const startMouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const shouldReduceMotion = usePrefersReducedMotion();

  // Create procedural bump map for tactile clay throwing rills & mineral grain
  const createClayThrowingBumpMap = useCallback((): THREE.CanvasTexture => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, 512, 512);

    for (let y = 0; y < 512; y += 8) {
      const val = Math.round(
        128 + Math.sin((y / 512) * Math.PI * 40) * 18 + (Math.random() - 0.5) * 8
      );
      ctx.fillStyle = `rgb(${val}, ${val}, ${val})`;
      ctx.fillRect(0, y, 512, 4);
    }

    const imgData = ctx.getImageData(0, 0, 512, 512);
    const d = imgData.data;
    for (let i = 0; i < d.length; i += 4) {
      const g = (Math.random() - 0.5) * 14;
      d[i] = Math.min(255, Math.max(0, d[i] + g));
      d[i + 1] = Math.min(255, Math.max(0, d[i + 1] + g));
      d[i + 2] = Math.min(255, Math.max(0, d[i + 2] + g));
    }
    ctx.putImageData(imgData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 6);
    return texture;
  }, []);

  // Create procedural lathe geometry with authentic uniform wall thickness & wide hollow depth (ZERO holes)
  const generateGeometry = useCallback((params: ShapeParams): THREE.BufferGeometry => {
    const points: THREE.Vector2[] = [];
    const segments = 56;
    const t = 0.12; // Uniform wall thickness

    const bWidth = Math.max(0.65, params.bellyWidth);
    const rWidth = Math.max(0.6, params.rimWidth);
    const hScale = Math.max(0.7, params.heightScale);
    const fWidth = Math.max(0.6, params.baseWidth);

    // 1. Base Footing (outer - completely sealed center at x=0)
    points.push(new THREE.Vector2(0, 0.0));
    points.push(new THREE.Vector2(0.12 * fWidth, 0.005));
    points.push(new THREE.Vector2(0.35 * fWidth, 0.02));
    points.push(new THREE.Vector2(0.48 * fWidth, 0.15 * hScale));

    // 2. Belly Expansion (outer)
    const bellyY = 0.85 * hScale;
    points.push(new THREE.Vector2(0.92 * bWidth, bellyY * 0.7));
    points.push(new THREE.Vector2(1.18 * bWidth, bellyY));
    points.push(new THREE.Vector2(0.88 * bWidth, bellyY * 1.3));

    // 3. Neck Constriction (outer)
    const neckY = 1.45 * hScale;
    points.push(new THREE.Vector2(0.52 * rWidth, neckY));

    // 4. Rim Lip Flare (outer top edge)
    const rimY = 1.75 * hScale;
    points.push(new THREE.Vector2(0.68 * rWidth, rimY * 0.95));
    points.push(new THREE.Vector2(0.74 * rWidth, rimY));
    points.push(new THREE.Vector2(0.66 * rWidth, rimY + 0.05));

    // 5. Inner Contour - Traces back downwards maintaining hollow cavernous depth (NO inverted funnel, NO holes!)
    points.push(new THREE.Vector2(Math.max(0.12, 0.54 * rWidth), rimY + 0.02));
    points.push(new THREE.Vector2(Math.max(0.1, 0.52 * rWidth - t), neckY));
    points.push(new THREE.Vector2(Math.max(0.18, 0.88 * bWidth - t), bellyY * 1.28));
    points.push(new THREE.Vector2(Math.max(0.24, 1.18 * bWidth - t), bellyY));
    points.push(new THREE.Vector2(Math.max(0.2, 0.92 * bWidth - t), bellyY * 0.72));
    points.push(new THREE.Vector2(Math.max(0.14, 0.48 * fWidth - t), 0.15 * hScale + t));
    points.push(new THREE.Vector2(Math.max(0.08, 0.35 * fWidth - t), 0.02 + t));
    points.push(new THREE.Vector2(0.06, 0.02 + t));
    points.push(new THREE.Vector2(0, 0.02 + t)); // 100% sealed center inner floor at x=0 (NO HOLE!)

    const geo = new THREE.LatheGeometry(points, segments);
    geo.computeVertexNormals();
    return geo;
  }, []);

  // Procedural diffuse clay texture map with authentic dark alluvial silt vs fired terracotta mottling
  const createClayTextureMap = useCallback(
    (glaze: GlazeStyle, step: GameStep): THREE.CanvasTexture => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d')!;

      // Default high-contrast fired terracotta
      let base = '#D04E1E';
      let darkSlip = '#8B2C0D';
      let lightSlip = '#F07538';

      if (step === 'shaping') {
        // Raw fresh wet river silt / alluvial mud on potter's wheel: dark, damp grey-brown loam
        base = '#3D332A';
        darkSlip = '#28211A';
        lightSlip = '#54463A';
      } else if (step === 'firing') {
        // Incandescent red-hot glowing clay inside 850°C woodfire kiln
        base = '#FF3E08';
        darkSlip = '#CC1E00';
        lightSlip = '#FFA033';
      } else if (glaze === 'black-polished') {
        // Northern Black Polished Ware (NBPW) mirror charcoal black
        base = '#141210';
        darkSlip = '#070605';
        lightSlip = '#26221E';
      } else if (glaze === 'harappan-slip') {
        // Harappan ochre & warm terracotta slip
        base = '#CB6C2C';
        darkSlip = '#8A3E12';
        lightSlip = '#E2924E';
      }

      ctx.fillStyle = base;
      ctx.fillRect(0, 0, 512, 512);

      // Fine concentric wheel throwing marks
      for (let y = 0; y < 512; y += 8) {
        const grad = ctx.createLinearGradient(0, y, 0, y + 8);
        const alpha = step === 'shaping' ? 0.14 : 0.09;
        grad.addColorStop(0, darkSlip);
        grad.addColorStop(0.5, 'transparent');
        grad.addColorStop(1, lightSlip);
        ctx.fillStyle = grad;
        ctx.globalAlpha = alpha;
        ctx.fillRect(0, y, 512, 8);
      }
      ctx.globalAlpha = 1.0;

      // Organic clay mottling & fine sand grain
      const imgData = ctx.getImageData(0, 0, 512, 512);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        const speckle = (Math.random() - 0.5) * 18;
        data[i] = Math.min(255, Math.max(0, data[i] + speckle));
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + speckle * 0.85));
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + speckle * 0.7));
      }
      ctx.putImageData(imgData, 0, 0);

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(3, 3);
      return texture;
    },
    []
  );

  // Material depending on step and glaze with realistic bump mapping, diffuse clay map, and DoubleSide support
  const getMaterial = useCallback(
    (step: GameStep, glaze: GlazeStyle): THREE.Material => {
      const bumpMap = createClayThrowingBumpMap();
      const diffuseMap = createClayTextureMap(glaze, step);

      if (step === 'shaping') {
        // Fresh wet river mud: dark alluvial loam with rich wet water gloss & finger throwing rills
        return new THREE.MeshStandardMaterial({
          map: diffuseMap,
          color: 0x44392f,
          roughness: 0.20, // Slick wet mud sheen
          metalness: 0.08,
          bumpMap,
          bumpScale: 0.045,
          side: THREE.DoubleSide,
        });
      }

      if (step === 'firing') {
        // Incandescent red-hot clay inside the fiery kiln (850°C glowing)
        return new THREE.MeshStandardMaterial({
          map: diffuseMap,
          color: 0xff3b08,
          emissive: 0xff2800,
          emissiveIntensity: 0.95,
          roughness: 0.40,
          metalness: 0.1,
          bumpMap,
          bumpScale: 0.035,
          side: THREE.DoubleSide,
        });
      }

      // Finished Fired Pot: Vibrant high-contrast fired earthenware
      switch (glaze) {
        case 'black-polished':
          return new THREE.MeshStandardMaterial({
            map: diffuseMap,
            color: 0x141210,
            roughness: 0.15,
            metalness: 0.55,
            bumpMap,
            bumpScale: 0.02,
            side: THREE.DoubleSide,
          });
        case 'harappan-slip':
          return new THREE.MeshStandardMaterial({
            map: diffuseMap,
            color: 0xcb6c2c,
            roughness: 0.38,
            metalness: 0.12,
            bumpMap,
            bumpScale: 0.032,
            side: THREE.DoubleSide,
          });
        case 'terracotta':
        default:
          return new THREE.MeshStandardMaterial({
            map: diffuseMap,
            color: 0xd35222, // Rich fired terracotta red/burnt orange
            roughness: 0.34,
            metalness: 0.12,
            bumpMap,
            bumpScale: 0.036,
            side: THREE.DoubleSide,
          });
      }
    },
    [createClayThrowingBumpMap, createClayTextureMap]
  );

  // Tap Ceramic Ring Test with acoustic ripple animation
  const testCeramicRing = useCallback(() => {
    const pitch = 850 + Math.floor(Math.random() * 80);
    setLastChimePitch(pitch);
    ceramicAudio.playPotTap(pitch);
    setTapCount((prev) => prev + 1);
    setRingingActive(true);
    setTimeout(() => {
      setRingingActive(false);
    }, 800);
  }, []);

  // Initialize Three.js scene with full spherical orbit camera controls and multi-tier flywheel
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 480;
    const height = container.clientHeight || 300;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const target = targetRef.current;
    const spherical = sphericalRef.current;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    cameraRef.current = camera;

    const sinPhiRadius = spherical.radius * Math.sin(spherical.phi);
    camera.position.x = target.x + sinPhiRadius * Math.sin(spherical.theta);
    camera.position.y = target.y + spherical.radius * Math.cos(spherical.phi);
    camera.position.z = target.z + sinPhiRadius * Math.cos(spherical.theta);
    camera.lookAt(target);

    let renderer: THREE.WebGLRenderer | null = null;

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'default',
        failIfMajorPerformanceCaveat: false,
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFShadowMap;
      renderer.setClearColor(0x000000, 0);
      rendererRef.current = renderer;

      const dom = renderer.domElement;
      dom.style.display = 'block';
      dom.style.width = '100%';
      dom.style.height = '100%';
      dom.style.borderRadius = '1rem';
      dom.style.backgroundColor = 'transparent';

      // Prevent Chrome context lost crash
      dom.addEventListener('webglcontextlost', (e) => {
        e.preventDefault();
      });
      dom.addEventListener('webglcontextrestored', () => {
        if (vesselMeshRef.current) {
          vesselMeshRef.current.geometry = generateGeometry(shape);
          vesselMeshRef.current.material = getMaterial(currentStep, selectedGlaze);
        }
      });

      container.innerHTML = '';
      container.appendChild(dom);
    } catch (e) {
      console.warn('WebGL init fallback:', e);
    }

    // Warm studio lighting (for 3D WebGL)
    if (renderer) {
      const ambientLight = new THREE.AmbientLight(0xfff7ed, 1.8);
      scene.add(ambientLight);

      const mainLight = new THREE.DirectionalLight(0xffecd2, 2.4);
      mainLight.position.set(4, 7, 3);
      mainLight.castShadow = true;
      scene.add(mainLight);

      const fillLight = new THREE.DirectionalLight(0xb8582b, 1.2);
      fillLight.position.set(-4, 3, -2);
      scene.add(fillLight);

      // Rim light from behind/above to create crisp contrast outline on dark mud pot
      const rimLight = new THREE.DirectionalLight(0xfff5ea, 1.6);
      rimLight.position.set(0, 6, -5);
      scene.add(rimLight);

      // Realistic Multi-Tier Potter's Wheel Turntable
      const wheelGroup = new THREE.Group();

      // Outer heavy stone flywheel with beveled rim
      const outerRimGeo = new THREE.CylinderGeometry(1.65, 1.72, 0.16, 48);
      const outerRimMat = new THREE.MeshStandardMaterial({
        color: 0x322822,
        roughness: 0.88,
        metalness: 0.12,
      });
      const outerRim = new THREE.Mesh(outerRimGeo, outerRimMat);
      outerRim.position.set(0, -0.16, 0);
      outerRim.receiveShadow = true;
      wheelGroup.add(outerRim);

      // Inset wooden platter
      const platterGeo = new THREE.CylinderGeometry(1.2, 1.25, 0.08, 48);
      const platterMat = new THREE.MeshStandardMaterial({
        color: 0x4a3a2d,
        roughness: 0.72,
        metalness: 0.08,
      });
      const platter = new THREE.Mesh(platterGeo, platterMat);
      platter.position.set(0, -0.06, 0);
      platter.receiveShadow = true;
      wheelGroup.add(platter);

      // Flush center wooden wheel head bat disc (flat surface - ZERO protrusion into vessel)
      const centerRingGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.015, 32);
      const centerRingMat = new THREE.MeshStandardMaterial({
        color: 0x241c16,
        roughness: 0.68,
        metalness: 0.25,
      });
      const centerRing = new THREE.Mesh(centerRingGeo, centerRingMat);
      centerRing.position.set(0, -0.019, 0);
      wheelGroup.add(centerRing);

      scene.add(wheelGroup);
      wheelMeshRef.current = wheelGroup;

      // Contact shadow beneath wheel
      const shadowGeo = new THREE.CircleGeometry(1.8, 32);
      const shadowMat = new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.45,
      });
      const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
      shadowMesh.rotation.x = -Math.PI / 2;
      shadowMesh.position.set(0, -0.24, 0);
      scene.add(shadowMesh);

      // Create initial vessel mesh
      const vesselGeo = generateGeometry(shape);
      const vesselMat = getMaterial(currentStep, selectedGlaze);
      const vesselMesh = new THREE.Mesh(vesselGeo, vesselMat);
      vesselMesh.castShadow = true;
      scene.add(vesselMesh);
      vesselMeshRef.current = vesselMesh;
    }

    // Mouse & Touch Orbit and Direct Pot Tap Event Handlers
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };
      startMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - prevMouseRef.current.x;
      const deltaY = e.clientY - prevMouseRef.current.y;

      sphericalRef.current.theta -= deltaX * 0.008;
      sphericalRef.current.phi -= deltaY * 0.008;
      sphericalRef.current.phi = THREE.MathUtils.clamp(sphericalRef.current.phi, 0.22, 1.48);

      prevMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = (e: MouseEvent) => {
      if (isDraggingRef.current) {
        const dragDist = Math.hypot(
          e.clientX - startMouseRef.current.x,
          e.clientY - startMouseRef.current.y
        );
        // If it was a quick click rather than a drag, and the pot is finished, tap ceramic ring!
        if (dragDist < 6 && currentStepRef.current === 'finished') {
          testCeramicRing();
        }
      }
      isDraggingRef.current = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        isDraggingRef.current = false;
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        pinchDistRef.current = Math.hypot(dx, dy);
      } else if (e.touches.length === 1) {
        pinchDistRef.current = null;
        isDraggingRef.current = true;
        prevMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        startMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      // Two-finger pinch to zoom
      if (e.touches.length === 2) {
        if (e.cancelable) e.preventDefault();
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const currentDist = Math.hypot(dx, dy);
        if (pinchDistRef.current !== null) {
          const diff = currentDist - pinchDistRef.current;
          sphericalRef.current.radius -= diff * 0.016;
          sphericalRef.current.radius = THREE.MathUtils.clamp(
            sphericalRef.current.radius,
            2.6,
            7.5
          );
        }
        pinchDistRef.current = currentDist;
        return;
      }

      // Single-finger 360 orbit
      if (e.touches.length === 1 && isDraggingRef.current) {
        if (e.cancelable) e.preventDefault();
        const deltaX = e.touches[0].clientX - prevMouseRef.current.x;
        const deltaY = e.touches[0].clientY - prevMouseRef.current.y;

        sphericalRef.current.theta -= deltaX * 0.009;
        sphericalRef.current.phi -= deltaY * 0.009;
        sphericalRef.current.phi = THREE.MathUtils.clamp(sphericalRef.current.phi, 0.22, 1.48);

        prevMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) {
        pinchDistRef.current = null;
      }
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        prevMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 0) {
        if (isDraggingRef.current && e.changedTouches.length > 0) {
          const dragDist = Math.hypot(
            e.changedTouches[0].clientX - startMouseRef.current.x,
            e.changedTouches[0].clientY - startMouseRef.current.y
          );
          if (dragDist < 10 && currentStepRef.current === 'finished') {
            testCeramicRing();
          }
        }
        isDraggingRef.current = false;
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      sphericalRef.current.radius += e.deltaY * 0.003;
      sphericalRef.current.radius = THREE.MathUtils.clamp(sphericalRef.current.radius, 3.0, 7.5);
    };

    const dom = renderer?.domElement;
    if (dom) {
      dom.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      dom.addEventListener('touchstart', onTouchStart, { passive: true });
      dom.addEventListener('touchmove', onTouchMove, { passive: false });
      dom.addEventListener('touchend', onTouchEnd);
      dom.addEventListener('wheel', onWheel, { passive: false });
    }

    // Animation Render Loop
    let clock = new THREE.Clock();
    const animate = () => {
      const delta = clock.getDelta();

      // Spin the wheel & pot synchronously based on RPM
      if (isWheelRunningRef.current) {
        const radPerSec = (rpmRef.current * 2 * Math.PI) / 60;
        rotationRef.current += radPerSec * delta;

        if (wheelMeshRef.current) {
          wheelMeshRef.current.rotation.y = rotationRef.current;
        }
        if (vesselMeshRef.current) {
          vesselMeshRef.current.rotation.y = rotationRef.current;
        }
      }

      // Smooth camera position from spherical coordinates
      const cam = cameraRef.current;
      const tgt = targetRef.current;
      const sp = sphericalRef.current;
      if (cam && tgt && sp) {
        const sinPhi = sp.radius * Math.sin(sp.phi);
        cam.position.x = tgt.x + sinPhi * Math.sin(sp.theta);
        cam.position.y = tgt.y + sp.radius * Math.cos(sp.phi);
        cam.position.z = tgt.z + sinPhi * Math.cos(sp.theta);
        cam.lookAt(tgt);
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth || 480;
      const h = container.clientHeight || 300;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (dom) {
        dom.removeEventListener('mousedown', onMouseDown);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
        dom.removeEventListener('touchstart', onTouchStart);
        dom.removeEventListener('touchmove', onTouchMove);
        dom.removeEventListener('touchend', onTouchEnd);
        dom.removeEventListener('wheel', onWheel);
      }

      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Update geometry when shape parameters change
  useEffect(() => {
    if (!vesselMeshRef.current) return;
    const newGeo = generateGeometry(shape);
    vesselMeshRef.current.geometry.dispose();
    vesselMeshRef.current.geometry = newGeo;
  }, [shape, generateGeometry]);

  // Update material when step or glaze finish changes
  useEffect(() => {
    if (!vesselMeshRef.current) return;
    const newMat = getMaterial(currentStep, selectedGlaze);
    vesselMeshRef.current.material = newMat;
  }, [currentStep, selectedGlaze, getMaterial]);

  // Interactive clay pull & sculpt actions
  const pullRim = (delta: number) => {
    setShape((prev) => ({
      ...prev,
      rimWidth: THREE.MathUtils.clamp(prev.rimWidth + delta, 0.6, 1.8),
    }));
    if (isWheelRunning) {
      ceramicAudio.playClaySquish();
    }
  };

  const expandBelly = (delta: number) => {
    setShape((prev) => ({
      ...prev,
      bellyWidth: THREE.MathUtils.clamp(prev.bellyWidth + delta, 0.6, 1.9),
    }));
    ceramicAudio.playClaySquish();
  };

  // Kiln firing sequence
  const startFiring = () => {
    setIsFiringActive(true);
    setCurrentStep('firing');
    ceramicAudio.playKilnFire();
    setKilnTemp(35);

    let temp = 35;
    const targetTemp = 860;
    if (firingIntervalRef.current) clearInterval(firingIntervalRef.current);

    firingIntervalRef.current = setInterval(() => {
      temp += 38;
      if (temp >= targetTemp) {
        temp = targetTemp;
        if (firingIntervalRef.current) clearInterval(firingIntervalRef.current);
        setTimeout(() => {
          setIsFiringActive(false);
          setCurrentStep('finished');
          setIsWheelRunning(false); // Stop wheel to admire finished creation
          ceramicAudio.playSuccessChime();
          try {
            confetti({
              particleCount: 80,
              spread: 75,
              origin: { y: 0.6 },
              colors: ['#B8582B', '#E5A344', '#D86D3D', '#FAF5F0'],
            });
          } catch (_) {
            // Safe fallback if confetti is unavailable
          }
        }, 800);
      }
      setKilnTemp(temp);
    }, 90);
  };

  // Apply traditional shape preset
  const applyPreset = (key: string) => {
    const preset = SHAPE_PRESETS[key];
    if (preset) {
      setShape(preset.params);
      setActivePreset(key);
      ceramicAudio.playClaySquish();
    }
  };

  // Reset to shape a new pot
  const restartGame = () => {
    if (firingIntervalRef.current) clearInterval(firingIntervalRef.current);
    setCurrentStep('shaping');
    setIsWheelRunning(true);
    setRpm(90);
    setTapCount(0);
    applyPreset('matka');
    ceramicAudio.playPotTap(700);
  };

  const updateShapeParam = (param: keyof ShapeParams, value: number) => {
    setShape((prev) => ({
      ...prev,
      [param]: value,
    }));
  };

  // Zoom helpers for touch / on-screen buttons
  const zoomIn = useCallback(() => {
    sphericalRef.current.radius = THREE.MathUtils.clamp(
      sphericalRef.current.radius - 0.6,
      2.6,
      7.5
    );
  }, []);

  const zoomOut = useCallback(() => {
    sphericalRef.current.radius = THREE.MathUtils.clamp(
      sphericalRef.current.radius + 0.6,
      2.6,
      7.5
    );
  }, []);

  const resetView = useCallback(() => {
    sphericalRef.current.radius = 4.8;
    sphericalRef.current.phi = 1.25;
    sphericalRef.current.theta = 0.2;
  }, []);

  return (
    <section
      id="potter-game"
      className="scroll-mt-24 border-b border-[#B8582B]/20 bg-gradient-to-b from-[#0d0a08] via-[#140f0c] to-[#0d0a08] text-[#FAF5F0] py-8 sm:py-10 lg:py-12"
      aria-labelledby="game-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E5A344]/35 bg-[#B8582B]/15 px-3.5 py-1 text-xs font-mono uppercase tracking-wider text-[#E5A344] shadow-inner">
            <Sparkles className="h-3.5 w-3.5 text-[#E5A344] animate-spin-slow" />
            <span>Interactive 3D Ceramic Game</span>
          </div>

          <h2
            id="game-title"
            className="mt-2 font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#FAF5F0]"
          >
            {ui.game.title}
          </h2>

          <p className="mt-1.5 font-sans text-xs sm:text-sm text-[#D8C7B8]">
            {ui.game.subtitle}
          </p>

          {/* Stepper Progress Indicator */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'shaping', label: `1. ${ui.game.step1Title}` },
              { id: 'firing', label: `2. ${ui.game.step2Title}` },
              { id: 'finished', label: `3. ${ui.game.step3Title}` },
            ].map((step, idx) => {
              const isActive = currentStep === step.id;
              const isPast =
                (currentStep === 'firing' && idx === 0) || (currentStep === 'finished' && idx < 2);
              return (
                <div key={step.id} className="flex items-center gap-2">
                  <div
                    className={`flex items-center gap-1.5 rounded-full px-3 py-0.5 text-xs font-mono font-bold transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-[#B8582B] to-[#E5A344] text-white shadow-lg'
                        : isPast
                        ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-500/30'
                        : 'bg-white/10 text-white/60 border border-white/10'
                    }`}
                  >
                    {isPast ? <CheckCircle2 className="h-3 w-3" /> : null}
                    <span>{step.label}</span>
                  </div>
                  {idx < 2 && <div className="hidden sm:block h-0.5 w-3 bg-white/20" />}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Game Workspace Grid */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mt-4 sm:mt-6 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-8"
        >
          {/* Left Column: 3D Canvas Viewport (7 cols) */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#B8582B]/35 bg-gradient-to-b from-[#181310] to-[#241A14] p-3 sm:p-4 shadow-2xl lg:col-span-7 min-h-[260px] sm:min-h-[340px] lg:min-h-[480px]">
            {/* Top Viewport Header */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3 py-1 text-xs font-mono text-white/90 backdrop-blur-md shadow-md">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="capitalize text-[11px] sm:text-xs">
                  {currentStep === 'shaping'
                    ? 'Potter’s Wheel • Wet River Silt'
                    : currentStep === 'firing'
                    ? 'Aawa Clamp Kiln • 850°C'
                    : 'Masterpiece Complete • Fired Earthenware'}
                </span>
              </div>

              {/* Wheel RPM Control */}
              {currentStep === 'shaping' && (
                <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 text-xs font-mono text-white/90 backdrop-blur-md shadow-md">
                  <button
                    onClick={() => {
                      setIsWheelRunning(!isWheelRunning);
                      ceramicAudio.playWheelSpin();
                    }}
                    className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200 transition-colors"
                    title={isWheelRunning ? 'Pause Wheel' : 'Start Wheel'}
                  >
                    {isWheelRunning ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                    <span>{isWheelRunning ? `${rpm} RPM` : 'Paused'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Three.js Container with High-Contrast Earthen Studio Wall Backdrop, Kiln Fire and Acoustic Ripple Overlays */}
            <div className="relative my-auto h-[220px] sm:h-[300px] md:h-[400px] lg:h-[440px] w-full rounded-2xl bg-[#241a14] overflow-hidden shadow-2xl border border-[#B8582B]/35 mt-1 sm:mt-2">
              {/* Warm Contrasting Earthen Studio Backdrop - Accentuates Wet Mud Silhouette and Flywheel */}
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
                <img
                  src="/images/game-backdrop.jpg"
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-cover object-center opacity-92 contrast-115 brightness-95 filter transition-opacity duration-500"
                />
                {/* Soft natural studio vignette to keep focus centered on the potter's wheel */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1b120c]/45 via-transparent to-[#1b120c]/45" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,200,120,0.08)_0%,transparent_65%)]" />
              </div>

              <div
                ref={containerRef}
                className="relative z-10 h-full w-full cursor-grab active:cursor-grabbing touch-none select-none flex items-center justify-center"
                title={
                  currentStep === 'finished'
                    ? 'Click directly on the pot or drag to orbit!'
                    : 'Drag up/down to tilt, drag left/right to rotate 360°, scroll to zoom'
                }
              />

              {/* On-screen Touch Zoom Controls (Pinch or Tap + / -) */}
              <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1 rounded-lg bg-black/70 p-1 backdrop-blur-md border border-white/15 shadow-md">
                <button
                  onClick={zoomIn}
                  className="flex h-6 w-6 items-center justify-center rounded bg-white/10 text-white hover:bg-[#B8582B] active:scale-90 transition-all"
                  title="Zoom In (or pinch with two fingers)"
                  aria-label="Zoom in"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={zoomOut}
                  className="flex h-6 w-6 items-center justify-center rounded bg-white/10 text-white hover:bg-[#B8582B] active:scale-90 transition-all"
                  title="Zoom Out (or pinch with two fingers)"
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

              {/* Animated Kiln Firing Flames and Embers Background */}
              {currentStep === 'firing' && (
                <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-2xl select-none">
                  {/* Fire base radiance */}
                  <div className="absolute inset-0 bg-gradient-to-t from-red-600/40 via-orange-500/25 to-transparent animate-fire-flicker mix-blend-screen" />
                  <div className="absolute -inset-x-10 bottom-0 h-44 bg-[radial-gradient(ellipse_at_bottom,rgba(255,80,0,0.65)_0%,rgba(220,38,38,0.38)_45%,transparent_80%)] animate-pulse" />
                  {/* Rising glowing heat embers */}
                  <div className="absolute inset-0 flex justify-around items-end overflow-hidden pb-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
                      <span
                        key={n}
                        className="h-1.5 w-1.5 rounded-full bg-amber-300 shadow-[0_0_10px_#F59E0B] animate-ping"
                        style={{
                          animationDuration: `${1.1 + (n % 4) * 0.3}s`,
                          animationDelay: `${n * 0.15}s`,
                          opacity: 0.85,
                        }}
                      />
                    ))}
                  </div>
                  {/* Temperature HUD */}
                  <div className="absolute top-3 left-3 flex items-center gap-2 rounded-full border border-orange-500/50 bg-black/80 px-3 py-1 text-xs font-mono font-bold text-orange-400 backdrop-blur-md shadow-lg">
                    <Flame className="h-4 w-4 text-red-500 animate-bounce" />
                    <span>{ui.game.firingAt}: {kilnTemp}°C</span>
                  </div>
                </div>
              )}

              {/* Ceramic Ring Acoustic Wave Ripple Overlay */}
              {ringingActive && (
                <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center select-none">
                  <div className="h-32 w-32 rounded-full border-2 border-amber-300/80 animate-ping shadow-[0_0_24px_#F59E0B]" />
                  <div className="absolute h-52 w-52 rounded-full border border-orange-400/50 animate-ping delay-150" />
                  <div className="absolute mt-28 rounded-full bg-black/85 border border-emerald-400/80 px-4 py-1.5 text-xs font-mono font-bold text-emerald-300 shadow-2xl backdrop-blur-md flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    <span>{ui.gameExtras.pureTone} • {lastChimePitch} Hz</span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Viewport Bar */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-2 text-xs font-mono text-[#D8C7B8]">
              <span className="flex items-center gap-1.5 text-[11px]">
                <Eye className="h-3 w-3 text-amber-400" />
                <span>{ui.gameExtras.orbitHint}</span>
              </span>

              {currentStep === 'finished' && (
                <button
                  onClick={testCeramicRing}
                  className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#B8582B] via-[#D86D3D] to-[#E5A344] px-3.5 py-1 text-xs font-bold text-white shadow-lg transition-all hover:scale-105 active:scale-95"
                >
                  <Volume2 className="h-3.5 w-3.5 animate-bounce" />
                  <span>{ui.game.tapRing} ({tapCount})</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Interactive Studio Controls (5 cols) */}
          <div className="flex flex-col justify-between rounded-3xl border border-[#B8582B]/30 bg-gradient-to-b from-[#1E1713]/95 to-[#16110D]/95 p-4 sm:p-5 shadow-2xl backdrop-blur-xl lg:col-span-5">
            <AnimatePresence mode="wait">
              {/* STEP 1: SHAPING ON THE WHEEL */}
              {currentStep === 'shaping' && (
                <motion.div
                  key="step-shaping"
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -12 }}
                  className="space-y-4"
                >
                  <div>
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#E5A344]">
                      {ui.gameExtras.step1Badge}
                    </span>
                    <h3 className="font-display text-xl font-bold text-[#FAF5F0] mt-0.5">
                      {ui.game.step1Title}
                    </h3>
                    <p className="mt-0.5 text-xs text-[#D8C7B8]">
                      {ui.game.step1Desc}
                    </p>
                  </div>

                  {/* Primary Action Button: Placed immediately after 3D Pot for effortless clarity on mobile */}
                  <button
                    onClick={() => {
                      ceramicAudio.playPotTap(750);
                      setCurrentStep('firing');
                    }}
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#B8582B] via-[#E5A344] to-[#B8582B] px-5 py-3 text-sm font-bold text-white shadow-[0_4px_22px_rgba(229,163,68,0.35)] transition-all hover:scale-102 active:scale-98 border border-amber-300/40"
                  >
                    <Flame className="h-4 w-4 animate-bounce text-amber-200" />
                    <span>{ui.game.proceedFiring} 🔥</span>
                  </button>

                  {/* Mobile Control Mode Switcher: Sliders vs Shapes vs Gestures */}
                  <div className="lg:hidden flex items-center gap-1 p-1 rounded-xl bg-black/60 border border-white/10">
                    <button
                      onClick={() => setMobileTab('sliders')}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-mono font-bold transition-all ${
                        mobileTab === 'sliders'
                          ? 'bg-[#B8582B] text-white shadow-md'
                          : 'text-[#D8C7B8] hover:text-white'
                      }`}
                    >
                      <Sliders className="h-3.5 w-3.5 text-amber-300" />
                      <span>{ui.game.modes.sliders}</span>
                    </button>
                    <button
                      onClick={() => setMobileTab('presets')}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-mono font-bold transition-all ${
                        mobileTab === 'presets'
                          ? 'bg-[#B8582B] text-white shadow-md'
                          : 'text-[#D8C7B8] hover:text-white'
                      }`}
                    >
                      <Shapes className="h-3.5 w-3.5 text-amber-300" />
                      <span>{ui.game.modes.shapes}</span>
                    </button>
                    <button
                      onClick={() => setMobileTab('gestures')}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-mono font-bold transition-all ${
                        mobileTab === 'gestures'
                          ? 'bg-[#B8582B] text-white shadow-md'
                          : 'text-[#D8C7B8] hover:text-white'
                      }`}
                    >
                      <Hand className="h-3.5 w-3.5 text-amber-300" />
                      <span>{ui.game.modes.gestures}</span>
                    </button>
                  </div>

                  {/* Preset Vessels (Visible on Desktop OR when Shapes tab is active on Mobile) */}
                  <div className={mobileTab === 'presets' ? 'block' : 'hidden lg:block'}>
                    <label className="block text-[11px] font-mono font-semibold text-[#E5A344] uppercase tracking-wider mb-1.5">
                      {ui.gameExtras.traditionalForm}
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {Object.entries(SHAPE_PRESETS).map(([key]) => {
                        const presetData = ui.gameExtras.presets[key as keyof typeof ui.gameExtras.presets] || SHAPE_PRESETS[key];
                        return (
                          <button
                            key={key}
                            onClick={() => applyPreset(key)}
                            className={`rounded-xl border p-2 text-left transition-all ${
                              activePreset === key
                                ? 'border-[#E5A344] bg-[#B8582B]/25 font-bold text-white shadow-inner'
                                : 'border-white/10 bg-black/30 text-[#D8C7B8] hover:border-white/20 hover:bg-black/40'
                            }`}
                          >
                            <p className="text-xs font-display font-bold text-[#FAF5F0]">{presetData.label}</p>
                            <p className="text-[10px] text-[#D8C7B8]/70 line-clamp-1">{presetData.desc}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Quick Fingertip Sculpt Buttons (Visible on Desktop OR when Gestures tab is active on Mobile) */}
                  <div className={mobileTab === 'gestures' ? 'block' : 'hidden lg:block'}>
                    <label className="block text-[11px] font-mono font-semibold text-[#E5A344] uppercase tracking-wider mb-1.5">
                      {ui.gameExtras.artisanGestures}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => expandBelly(0.12)}
                        className="rounded-xl border border-white/10 bg-black/30 p-2 text-center text-xs font-mono font-semibold text-[#FAF5F0] transition-all hover:border-[#E5A344] hover:bg-black/50 active:scale-95"
                      >
                        {ui.gameExtras.gestures.expandBelly}
                      </button>
                      <button
                        onClick={() => expandBelly(-0.12)}
                        className="rounded-xl border border-white/10 bg-black/30 p-2 text-center text-xs font-mono font-semibold text-[#FAF5F0] transition-all hover:border-[#E5A344] hover:bg-black/50 active:scale-95"
                      >
                        {ui.gameExtras.gestures.constrictWaist}
                      </button>
                      <button
                        onClick={() => pullRim(0.12)}
                        className="rounded-xl border border-white/10 bg-black/30 p-2 text-center text-xs font-mono font-semibold text-[#FAF5F0] transition-all hover:border-[#E5A344] hover:bg-black/50 active:scale-95"
                      >
                        {ui.gameExtras.gestures.flareRim}
                      </button>
                      <button
                        onClick={() => pullRim(-0.12)}
                        className="rounded-xl border border-white/10 bg-black/30 p-2 text-center text-xs font-mono font-semibold text-[#FAF5F0] transition-all hover:border-[#E5A344] hover:bg-black/50 active:scale-95"
                      >
                        {ui.gameExtras.gestures.tightenCollar}
                      </button>
                    </div>
                  </div>

                  {/* Fine Tuning Sliders (Visible on Desktop OR when Sliders tab is active on Mobile) */}
                  <div className={`space-y-2 rounded-2xl border border-white/10 bg-black/40 p-3 ${mobileTab === 'sliders' ? 'block' : 'hidden lg:block'}`}>
                    <div className="flex items-center justify-between text-xs font-mono font-semibold text-[#E8DFD7]">
                      <span>{ui.game.sliders.bellyWidth}</span>
                      <span className="text-[#E5A344] font-bold">
                        {Math.round(shape.bellyWidth * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.65"
                      max="1.9"
                      step="0.05"
                      value={shape.bellyWidth}
                      onChange={(e) => updateShapeParam('bellyWidth', parseFloat(e.target.value))}
                      className="w-full accent-[#E5A344]"
                    />

                    <div className="flex items-center justify-between text-xs font-mono font-semibold text-[#E8DFD7]">
                      <span>{ui.game.sliders.rimFlare}</span>
                      <span className="text-[#E5A344] font-bold">
                        {Math.round(shape.rimWidth * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.6"
                      max="1.8"
                      step="0.05"
                      value={shape.rimWidth}
                      onChange={(e) => updateShapeParam('rimWidth', parseFloat(e.target.value))}
                      className="w-full accent-[#E5A344]"
                    />

                    <div className="flex items-center justify-between text-xs font-mono font-semibold text-[#E8DFD7]">
                      <span>{ui.game.sliders.heightRatio}</span>
                      <span className="text-[#E5A344] font-bold">
                        {Math.round(shape.heightScale * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.7"
                      max="1.6"
                      step="0.05"
                      value={shape.heightScale}
                      onChange={(e) => updateShapeParam('heightScale', parseFloat(e.target.value))}
                      className="w-full accent-[#E5A344]"
                    />

                    <div className="flex items-center justify-between text-xs font-mono font-semibold text-[#E8DFD7]">
                      <span>{ui.game.sliders.baseFooting}</span>
                      <span className="text-[#E5A344] font-bold">
                        {Math.round(shape.baseWidth * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.6"
                      max="1.4"
                      step="0.05"
                      value={shape.baseWidth}
                      onChange={(e) => updateShapeParam('baseWidth', parseFloat(e.target.value))}
                      className="w-full accent-[#E5A344]"
                    />
                  </div>

                  {/* Secondary Convenient Action Button at bottom of sliders */}
                  <button
                    onClick={() => {
                      ceramicAudio.playPotTap(750);
                      setCurrentStep('firing');
                    }}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#B8582B] via-[#D86D3D] to-[#E5A344] px-5 py-2.5 text-xs font-bold text-white shadow-xl transition-all hover:scale-102 active:scale-98"
                  >
                    <Flame className="h-4 w-4" />
                    <span>{ui.game.proceedFiring} 🔥</span>
                  </button>
                </motion.div>
              )}

              {/* STEP 2: KILN FIRING */}
              {currentStep === 'firing' && (
                <motion.div
                  key="step-firing"
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -12 }}
                  className="space-y-3.5"
                >
                  <div>
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#E5A344]">
                      {ui.gameExtras.step2Badge}
                    </span>
                    <h3 className="font-display text-xl font-bold text-[#FAF5F0] mt-0.5">
                      {ui.game.step2Title}
                    </h3>
                    <p className="mt-0.5 text-xs text-[#D8C7B8]">
                      {ui.game.step2Desc}
                    </p>
                  </div>

                  {/* Slip Coating Selection */}
                  <div>
                    <label className="block text-[11px] font-mono font-semibold text-[#E5A344] uppercase tracking-wider mb-1.5">
                      {ui.gameExtras.chooseSlip}
                    </label>
                    <div className="space-y-1.5">
                      {[
                        {
                          id: 'terracotta',
                          name: ui.gameExtras.slips.terracotta.name,
                          desc: ui.gameExtras.slips.terracotta.desc,
                          color: '#B8582B',
                        },
                        {
                          id: 'black-polished',
                          name: ui.gameExtras.slips.nbpw.name,
                          desc: ui.gameExtras.slips.nbpw.desc,
                          color: '#1A1513',
                        },
                        {
                          id: 'harappan-slip',
                          name: ui.gameExtras.slips.harappan.name,
                          desc: ui.gameExtras.slips.harappan.desc,
                          color: '#C9753C',
                        },
                      ].map((item) => (
                        <button
                          key={item.id}
                          disabled={isFiringActive}
                          onClick={() => {
                            setSelectedGlaze(item.id as GlazeStyle);
                            ceramicAudio.playPotTap(700);
                          }}
                          className={`w-full flex items-center gap-2.5 rounded-xl border p-2 text-left transition-all ${
                            selectedGlaze === item.id
                              ? 'border-[#E5A344] bg-[#B8582B]/25 shadow-inner'
                              : 'border-white/10 bg-black/30 hover:border-white/20'
                          }`}
                        >
                          <div
                            className="h-6 w-6 shrink-0 rounded-full border border-white/20 shadow-inner"
                            style={{ backgroundColor: item.color }}
                          />
                          <div>
                            <p className="font-display text-xs font-bold text-[#FAF5F0]">
                              {item.name}
                            </p>
                            <p className="text-[10px] text-[#D8C7B8] line-clamp-1">{item.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Temperature Gauge */}
                  <div className="rounded-2xl border border-white/10 bg-black/40 p-3 text-center">
                    <div className="flex items-center justify-between text-xs font-mono text-[#E5A344]">
                      <span className="flex items-center gap-1">
                        <Thermometer className="h-3.5 w-3.5 text-[#F59E0B]" />
                        <span>{ui.gameExtras.kilnHeat}</span>
                      </span>
                      <span className="text-lg font-bold text-[#F59E0B]">{kilnTemp}°C</span>
                    </div>

                    <div className="mt-2 h-2 w-full rounded-full bg-white/15 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 transition-all duration-100"
                        style={{ width: `${Math.min((kilnTemp / 860) * 100, 100)}%` }}
                      />
                    </div>

                    <p className="mt-1.5 text-[10px] font-mono text-[#D8C7B8]">
                      {kilnTemp < 200
                        ? ui.gameExtras.tempStatus.ambient
                        : kilnTemp < 500
                        ? ui.gameExtras.tempStatus.steam
                        : kilnTemp < 750
                        ? ui.gameExtras.tempStatus.quartz
                        : ui.gameExtras.tempStatus.vitrified}
                    </p>
                  </div>

                  {/* Firing Trigger */}
                  {!isFiringActive ? (
                    <button
                      onClick={startFiring}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 via-orange-600 to-[#B8582B] px-5 py-2.5 text-xs font-bold text-white shadow-xl transition-all hover:scale-102 active:scale-98"
                    >
                      <Flame className="h-4 w-4 animate-bounce" />
                      <span>{ui.game.igniteKiln} 🔥</span>
                    </button>
                  ) : (
                    <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold text-orange-400 animate-pulse py-1">
                      <RotateCw className="h-3.5 w-3.5 animate-spin" />
                      <span>{ui.game.firingAt} {kilnTemp}°C...</span>
                    </div>
                  )}
                </motion.div>
              )}

              {/* STEP 3: MASTERPIECE FINISHED & CERAMIC RING TEST */}
              {currentStep === 'finished' && (
                <motion.div
                  key="step-finished"
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -12 }}
                  className="space-y-3"
                >
                  <div className="text-center">
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-1">
                      <Award className="h-4 w-4" />
                    </div>
                    <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                      {ui.gameExtras.step3Badge}
                    </span>
                    <h3 className="font-display text-lg font-bold text-[#FAF5F0]">
                      {ui.game.step3Title}
                    </h3>
                  </div>

                  {/* Interactive Acoustic Ring Strike Bar */}
                  <div className="rounded-2xl border border-[#E5A344]/40 bg-gradient-to-r from-[#B8582B]/20 via-[#E5A344]/15 to-[#B8582B]/20 p-3 text-center shadow-lg">
                    <div className="flex items-center justify-between text-xs font-mono mb-2">
                      <span className="flex items-center gap-1.5 text-amber-300 font-bold">
                        <Radio className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
                        <span>{ui.gameExtras.resonanceTitle}</span>
                      </span>
                      <span className="rounded-full bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                        {lastChimePitch} Hz • {ui.gameExtras.pureTone}
                      </span>
                    </div>

                    {/* Equalizer Bars Simulation */}
                    <div className="flex justify-center items-end gap-1.5 h-6 mb-2">
                      {[18, 24, 14, 22, 28, 16, 20].map((h, i) => (
                        <div
                          key={i}
                          className="w-1.5 rounded-full bg-gradient-to-t from-amber-500 to-[#E5A344] transition-all"
                          style={{
                            height: ringingActive ? `${h}px` : '6px',
                            transitionDuration: '150ms',
                          }}
                        />
                      ))}
                    </div>

                    <button
                      onClick={testCeramicRing}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#B8582B] via-[#D86D3D] to-[#E5A344] px-4 py-2.5 text-xs font-bold text-white shadow-xl hover:scale-102 active:scale-98"
                    >
                      <Volume2 className="h-4 w-4 animate-bounce" />
                      <span>{ui.game.tapRing} ({tapCount})</span>
                    </button>
                    <p className="mt-1 text-[10px] font-mono text-[#D8C7B8]/80">
                      {ui.gameExtras.tipClickPot}
                    </p>
                  </div>

                  {/* Vessel Appraisal Specs */}
                  <div className="space-y-1.5 rounded-xl border border-white/10 bg-black/40 p-2.5 text-xs font-mono">
                    <div className="flex justify-between border-b border-white/10 pb-1">
                      <span className="text-[#D8C7B8]">{ui.gameExtras.specs.profile}</span>
                      <span className="font-bold text-[#FAF5F0] uppercase">
                        {ui.gameExtras.presets[activePreset as keyof typeof ui.gameExtras.presets]?.label || SHAPE_PRESETS[activePreset]?.label || 'Custom'}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-1">
                      <span className="text-[#D8C7B8]">{ui.gameExtras.specs.slipGlaze}</span>
                      <span className="font-bold text-[#E5A344] uppercase">
                        {selectedGlaze === 'terracotta'
                          ? ui.gameExtras.slips.terracotta.name
                          : selectedGlaze === 'black-polished'
                          ? ui.gameExtras.slips.nbpw.name
                          : ui.gameExtras.slips.harappan.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#D8C7B8]">{ui.gameExtras.specs.kilnTempLabel}</span>
                      <span className="font-bold text-amber-300">{ui.gameExtras.specs.vitrifiedStatus}</span>
                    </div>
                  </div>

                  {/* Switch Finish Glaze Live */}
                  <div>
                    <label className="block text-[10px] font-mono font-semibold text-[#E5A344] uppercase tracking-wider mb-1">
                      {ui.gameExtras.changeSlip}
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { id: 'terracotta', label: ui.gameExtras.slips.terracotta.name.split(' ')[0] },
                        { id: 'black-polished', label: 'Black NBPW' },
                        { id: 'harappan-slip', label: 'Harappan' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setSelectedGlaze(item.id as GlazeStyle);
                            ceramicAudio.playPotTap(800);
                          }}
                          className={`rounded-lg py-1 text-xs font-mono transition-all ${
                            selectedGlaze === item.id
                              ? 'bg-gradient-to-r from-[#B8582B] to-[#E5A344] text-white font-bold shadow-md'
                              : 'bg-black/30 text-[#D8C7B8] hover:bg-black/50 border border-white/10'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Restart / Shape Another */}
                  <button
                    onClick={restartGame}
                    className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-[#E5A344]/40 bg-black/40 px-4 py-2 text-xs font-semibold text-[#E5A344] shadow-md transition-all hover:bg-black/60 hover:border-[#E5A344] active:scale-98"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>{ui.game.createAnother}</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
