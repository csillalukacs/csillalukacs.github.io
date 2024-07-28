import * as THREE from 'three';


export default class Cubie
{
    constructor(x, y, z, color)      
    {
        this.x = x;
        this.y = y;
        this.z = z;
        this.color = color;
        this.mesh = this.createMesh();
    }

    createMesh()
    {
        const geometry = new THREE.BoxGeometry(0.95, 0.95, 0.95);
        const material = new THREE.MeshStandardMaterial({ color: this.color, roughness: 0.3, metalness: 0.9 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(this.x, this.y, this.z);
        return mesh;
    }

}