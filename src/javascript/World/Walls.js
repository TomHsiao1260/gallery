import * as THREE from 'three';

export default class Walls {
    constructor(_option) {
        this.config = _option.config;
        this.debug = _option.debug;

        this.container = new THREE.Object3D();
        this.container.matrixAutoUpdate = false;

        if (this.debug) {
            this.debugFolder = this.debug.addFolder('walls');
            this.debugFolder.open();
        }

        this.setWalls();
    }

    setWalls() {
        const { numDrawing, distanceDrawing } = this.config;
        const geometry = new THREE.PlaneGeometry(1.5, 1.5, 32, 32);
        const material = new THREE.MeshBasicMaterial();

        for (let i = 0; i < numDrawing; i += 1) {
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(i * distanceDrawing, 0, 0);
            this.container.add(mesh);
        }

        if (this.debug) {
            console.log('walls');
        }

        // add in only one container?
        // sizes, numbers, material should be sent from outside
        // add dat.GUI
        // see performance
        // event listeners suitable place
    }
}
