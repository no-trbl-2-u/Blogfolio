import * as THREE from 'three';

export interface PlanetDescription {
    description: string;
    diameter: string;
    distance: string;
    composition: string;
    funFact: string;
}

export interface PlanetInfoProps {
    isOpen: boolean;
    planet: THREE.Group | null;
    onClose: () => void;
}

export interface PlanetData {
    name: string;
    orbital: number;
    speed: number;
    radius: number;
    color: number;
    size: number;
}

export interface PlanetGroupInfo extends THREE.Group {
    userData: {
        name: string;
        [key: string]: any;
    };
}

export interface PlanetGroup extends THREE.Group {
    userData: PlanetData & {
        angle: number;
        sphere: THREE.Mesh;
        index: number;
        textMesh: THREE.Mesh;
    };
}

export interface SunRef {
    setScale: (scale: number) => void;
}

export interface PlanetsRef {
    setPlanetScale: (planet: PlanetGroup, scale: number) => void;
}

export interface PlanetsProps {
    scene: THREE.Scene | null;
    onPlanetsReady: (planets: PlanetGroup[]) => void;
    onHoverChange: (handler: (planet: PlanetGroup, isHovered: boolean) => void) => void;
}

export interface Scene3DProps {
    onSceneReady: (sceneData: { scene: THREE.Scene; camera: THREE.Camera; renderer: THREE.WebGLRenderer }) => void;
    onPlanetClick?: (planet: THREE.Object3D) => void;
    onHoverChange?: (hoverData: any) => void;
}

export interface SceneData {
    scene: THREE.Scene;
    camera: THREE.Camera;
    renderer: THREE.WebGLRenderer;
}

export interface SunProps {
    scene: THREE.Scene | null;
    onSunReady: (sun: THREE.Mesh) => void;
}
