import * as THREE from 'three';
import Cubie from './Cubie.js';

export default class Cube
{
    constructor(scene, camera) 
    {
        this.scene = scene;
        this.camera = camera;
        this.group = new THREE.Group();
        this.animating = -1;
        this.cubies = [];
        this.raycaster = new THREE.Raycaster()
        this.mouse = new THREE.Vector2()

        
        this.sides = [];
        // 0 top, 1 bottom, 2 left, 3 right, 4 front, 5 back
        for (let i = 0; i < 6; i++)
        {
            const side = new THREE.Group();
            this.sides.push(side);
            this.group.add(side);
        }

        this.theRest = new THREE.Group();
        this.group.add(this.theRest);
    }

    getRelativePosition(cubie)
    {
        let position = new THREE.Vector3();
        cubie.mesh.getWorldPosition(position);
        const mat = this.group.matrix.clone();
        mat.invert();
        position.applyMatrix4(mat);
        return position;
    }

    isOnSide(cubie, sideIndex)
    {
        let position = this.getRelativePosition(cubie);
        switch (sideIndex)
        {
            case 0:
                return Math.abs(position.y - 1) < 0.01;
            case 1:
                return Math.abs(position.y + 1) < 0.01;
            case 2:
                return Math.abs(position.x - 1) < 0.01;
            case 3:
                return Math.abs(position.x + 1) < 0.01;
            case 4:
                return Math.abs(position.z - 1) < 0.01;
            case 5:
                return Math.abs(position.z + 1) < 0.01;
        }
    }

    updateSide(sideIndex)
    {
        this.cubies.forEach(cubie => 
        {
            const parent = this.isOnSide(cubie, sideIndex) ? this.sides[sideIndex] : this.theRest;
            parent.attach(cubie.mesh);
        });
    }
  
    createCubie(x, y, z, color) 
    {
        const cubie = new Cubie(x, y, z, color);
        this.cubies.push(cubie);
        return cubie;
    }

    addtoScene() 
    {
        for (let i = -1; i < 2; i++) 
        {
            for (let j = -1; j < 2; j++) 
            {
                for (let k = -1; k < 2; k++) 
                {
                    let color = i === 0 ? 0xdd88dd : i===1 ? 0x23eedd : 0x3344aa;
                    const cubie = this.createCubie(i, j, k, color);
                    this.theRest.add(cubie.mesh);
                }
            }
        }
        this.scene.add(this.group);
    }

    animateSide(sideIndex)
    {
        let rotation = 0;
        const l = Math.PI / 2;
        const axis = (sideIndex === 0 || sideIndex === 1) ? "y" : 
            (sideIndex === 2 || sideIndex === 3) ? "x" : "z";

        this.sides[sideIndex].rotation[axis]+= 0.08;
        rotation = this.sides[sideIndex].rotation[axis];
        if (rotation % l  < 0.05)
        {
            this.sides[sideIndex].rotation[axis]= Math.floor(rotation / l) * l;
            this.animating = -1;
        }
    }

    update() 
    {
        this.group.rotation.x += 0.002;
        this.group.rotation.y += 0.002;
        if (this.animating > -1) this.animateSide(this.animating);

        this.raycaster.setFromCamera(this.mouse, this.camera)
    
        const objectsToTest = this.cubies.map(cubie => cubie.mesh);
        const intersects = this.raycaster.intersectObjects(objectsToTest)
        for (const cubie of this.cubies)
        {
            if (intersects[0] && cubie.mesh === intersects[0].object) 
            {
                //set the color to a slightly brighter version of the original color
                const original = cubie.mesh.material.color
                cubie.mesh.material.color.set(original.r*1.1,original.g*1.1,original.b*1.1);
            }
            else 
            {
                cubie.mesh.material.color.set(cubie.color);
            }
        }
    }
}