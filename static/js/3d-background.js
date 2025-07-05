// Enhanced 3D Background Animation with Magenta/Purple Theme
class Background3D {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = [];
        this.lights = [];
        this.animationId = null;
        this.mouseX = 0;
        this.mouseY = 0;
        this.init();
    }

    init() {
        const canvas = document.getElementById('bg-canvas');
        if (!canvas) return;

        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0x000000, 1, 100);

        // Camera setup
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 5;

        // Renderer setup with enhanced settings
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: canvas, 
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 0);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // Create enhanced particles
        this.createParticles();
        
        // Create dynamic lights
        this.createLights();

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
        this.scene.add(ambientLight);

        // Start animation
        this.animate();

        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize());
        
        // Handle mouse movement for interactive effects
        document.addEventListener('mousemove', (e) => {
            this.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        });
    }

    createParticles() {
        const particleCount = 150;
        const geometry = new THREE.SphereGeometry(0.02, 8, 8);
        
        // Create different particle types with magenta/purple theme
        const materials = [
            new THREE.MeshPhongMaterial({
                color: 0xff00ff,
                transparent: true,
                opacity: 0.8,
                emissive: 0xff00ff,
                emissiveIntensity: 0.2
            }),
            new THREE.MeshPhongMaterial({
                color: 0x00ffff,
                transparent: true,
                opacity: 0.8,
                emissive: 0x00ffff,
                emissiveIntensity: 0.2
            }),
            new THREE.MeshPhongMaterial({
                color: 0xff69b4,
                transparent: true,
                opacity: 0.8,
                emissive: 0xff69b4,
                emissiveIntensity: 0.2
            })
        ];

        for (let i = 0; i < particleCount; i++) {
            const material = materials[Math.floor(Math.random() * materials.length)];
            const particle = new THREE.Mesh(geometry, material);
            
            // Random position
            particle.position.x = (Math.random() - 0.5) * 30;
            particle.position.y = (Math.random() - 0.5) * 30;
            particle.position.z = (Math.random() - 0.5) * 30;
            
            // Random velocity
            particle.velocity = {
                x: (Math.random() - 0.5) * 0.03,
                y: (Math.random() - 0.5) * 0.03,
                z: (Math.random() - 0.5) * 0.03
            };

            // Add rotation speed
            particle.rotationSpeed = {
                x: Math.random() * 0.02,
                y: Math.random() * 0.02,
                z: Math.random() * 0.02
            };

            this.particles.push(particle);
            this.scene.add(particle);
        }
    }

    createLights() {
        // Create multiple colored lights
        const lightColors = [0xff00ff, 0x00ffff, 0xff69b4, 0x9370db];
        
        lightColors.forEach((color, index) => {
            const light = new THREE.PointLight(color, 0.5, 20);
            light.position.set(
                Math.sin(index * Math.PI / 2) * 10,
                Math.cos(index * Math.PI / 2) * 10,
                5
            );
            this.lights.push(light);
            this.scene.add(light);
        });
    }

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());

        // Update particles with enhanced effects
        this.particles.forEach((particle, index) => {
            // Update position
            particle.position.x += particle.velocity.x;
            particle.position.y += particle.velocity.y;
            particle.position.z += particle.velocity.z;

            // Bounce off boundaries with enhanced physics
            if (Math.abs(particle.position.x) > 15) {
                particle.velocity.x *= -1;
                particle.position.x = Math.sign(particle.position.x) * 15;
            }
            if (Math.abs(particle.position.y) > 15) {
                particle.velocity.y *= -1;
                particle.position.y = Math.sign(particle.position.y) * 15;
            }
            if (Math.abs(particle.position.z) > 15) {
                particle.velocity.z *= -1;
                particle.position.z = Math.sign(particle.position.z) * 15;
            }

            // Enhanced rotation
            particle.rotation.x += particle.rotationSpeed.x;
            particle.rotation.y += particle.rotationSpeed.y;
            particle.rotation.z += particle.rotationSpeed.z;

            // Dynamic pulse effect
            const pulse = 1 + Math.sin(Date.now() * 0.001 + index * 0.1) * 0.3;
            particle.scale.set(pulse, pulse, pulse);

            // Mouse interaction
            const distanceToMouse = Math.sqrt(
                Math.pow(particle.position.x - this.mouseX * 10, 2) +
                Math.pow(particle.position.y - this.mouseY * 10, 2)
            );
            
            if (distanceToMouse < 5) {
                particle.material.emissiveIntensity = 0.5;
                particle.scale.multiplyScalar(1.5);
            } else {
                particle.material.emissiveIntensity = 0.2;
            }
        });

        // Animate lights
        this.lights.forEach((light, index) => {
            const time = Date.now() * 0.001;
            light.position.x = Math.sin(time + index) * 10;
            light.position.y = Math.cos(time + index) * 10;
            light.intensity = 0.3 + Math.sin(time * 2 + index) * 0.2;
        });

        // Enhanced camera movement
        const time = Date.now() * 0.0005;
        this.camera.position.x = Math.sin(time) * 4 + this.mouseX * 2;
        this.camera.position.z = 5 + Math.cos(time) * 3;
        this.camera.position.y = this.mouseY * 2;
        this.camera.lookAt(0, 0, 0);

        // Add subtle camera shake
        this.camera.position.x += (Math.random() - 0.5) * 0.1;
        this.camera.position.y += (Math.random() - 0.5) * 0.1;

        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Initialize 3D background when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Background3D();
}); 