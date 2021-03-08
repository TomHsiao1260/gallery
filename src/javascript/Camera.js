import * as THREE from 'three';

export default class Camera {
    constructor(_option) {
        this.time = _option.time;
        this.sizes = _option.sizes;
        this.renderer = _option.renderer;
        this.config = _option.config;
        this.debug = _option.debug;

        this.container = new THREE.Object3D();
        this.container.matrixAutoUpdate = false;

        if (this.debug) {
            this.debugFolder = this.debug.addFolder('camera');
            // this.debugFolder.open();
        }

        this.setInstance();
        this.setOrbitControls();
    }

    setInstance() {
        const { width, height } = this.sizes.viewport;
        this.instance = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
        this.instance.position.set(0, 0, 2);
        this.container.add(this.instance);

        this.sizes.on('resize', () => {
            const { width, height } = this.sizes.viewport;
            this.instance.aspect = width / height;
            this.instance.updateProjectionMatrix();
        });
    }

    setOrbitControls() {
        this.event = {};
        this.event.x = 0;
        this.event.deltaX = 0;
        this.event.touchX = 0;
        this.event.moveSpeed = 0.005;

        this.renderer.domElement.addEventListener('wheel', (_event) => {
            this.event.deltaX = (_event.wheelDeltaX * -1) || _event.deltaX;
            this.event.deltaX *= this.event.moveSpeed / 10;

            this.scroll();
        }, false);

        this.renderer.domElement.addEventListener('touchstart', (_event) => {
            const touch = (_event.targetTouches) ? _event.targetTouches[0] : _event;
            this.event.touchX = touch.pageX;
        }, false);

        this.renderer.domElement.addEventListener('touchmove', (_event) => {
            const touch = (_event.targetTouches) ? _event.targetTouches[0] : _event;
            this.event.deltaX = (this.event.touchX - touch.pageX) * this.event.moveSpeed;
            this.event.touchX = touch.pageX;

            this.scroll();
        }, false);
    }

    scroll() {
        const { numDrawing, distanceDrawing } = this.config;
        const maxDistance = distanceDrawing * (numDrawing - 1);

        if ((this.event.x + this.event.deltaX) < 0) {
          this.event.x = 0;
        } else if ((this.event.x + this.event.deltaX) >= maxDistance) {
          this.event.x = maxDistance;
        } else {
          this.event.x += this.event.deltaX;
          this.instance.position.x += this.event.deltaX;
          this.event.x = this.instance.position.x;
        }
    }
}
