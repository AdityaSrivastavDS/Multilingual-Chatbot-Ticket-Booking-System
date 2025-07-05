// Enhanced GSAP Animations with Dynamic Effects
class AnimationController {
    constructor() {
        this.init();
    }

    init() {
        // Initialize GSAP
        gsap.registerPlugin(ScrollTrigger);
        
        // Animate elements on page load
        this.animateOnLoad();
        
        // Setup scroll animations
        this.setupScrollAnimations();
        
        // Setup hover animations
        this.setupHoverAnimations();
        
        // Setup particle effects
        this.setupParticleEffects();
        
        // Setup 3D tilt effects
        this.setup3DTiltEffects();
    }

    animateOnLoad() {
        // Animate navigation with staggered entrance
        gsap.from('.nav-brand', {
            duration: 1.2,
            y: -50,
            opacity: 0,
            ease: 'power3.out',
            rotation: -5
        });

        gsap.from('.nav-link', {
            duration: 0.8,
            y: -30,
            opacity: 0,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 0.3,
            scale: 0.8
        });

        // Animate hero section with enhanced effects
        gsap.from('.hero-title', {
            duration: 1.5,
            y: 100,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.5,
            rotationX: 90
        });

        gsap.from('.hero-subtitle', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.8,
            scale: 0.8
        });

        gsap.from('.modern-btn', {
            duration: 0.8,
            scale: 0,
            opacity: 0,
            ease: 'back.out(1.7)',
            delay: 1.2,
            stagger: 0.2
        });

        // Animate floating elements
        gsap.from('.floating-element', {
            duration: 1.5,
            y: 100,
            opacity: 0,
            stagger: 0.3,
            ease: 'power3.out',
            delay: 1
        });

        // Animate cards with enhanced effects
        gsap.from('.modern-card', {
            duration: 1,
            y: 100,
            opacity: 0,
            stagger: 0.2,
            ease: 'power3.out',
            delay: 1,
            rotationY: 45
        });

        // Animate exhibit cards with 3D effects
        gsap.from('.exhibit-card', {
            duration: 1.2,
            y: 100,
            opacity: 0,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 1.2,
            rotationY: 90,
            scale: 0.5
        });
    }

    setupScrollAnimations() {
        // Enhanced scroll animations for cards
        gsap.utils.toArray('.modern-card').forEach((card, index) => {
            gsap.fromTo(card, 
                {
                    y: 100,
                    opacity: 0,
                    rotationY: 45,
                    scale: 0.8
                },
                {
                    y: 0,
                    opacity: 1,
                    rotationY: 0,
                    scale: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });

        // Enhanced exhibit card animations
        gsap.utils.toArray('.exhibit-card').forEach((card, index) => {
            gsap.fromTo(card, 
                {
                    y: 100,
                    opacity: 0,
                    rotationY: 90,
                    scale: 0.5
                },
                {
                    y: 0,
                    opacity: 1,
                    rotationY: 0,
                    scale: 1,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });

        // Parallax effect for hero section
        gsap.to('.hero-section', {
            yPercent: -50,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });

        // Floating elements parallax
        gsap.to('.floating-element', {
            y: -100,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    }

    setupHoverAnimations() {
        // Enhanced button hover animations
        gsap.utils.toArray('.modern-btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                gsap.to(btn, {
                    scale: 1.1,
                    duration: 0.3,
                    ease: 'power2.out',
                    boxShadow: '0 15px 35px rgba(255, 0, 255, 0.5)'
                });
            });

            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out',
                    boxShadow: '0 5px 15px rgba(255, 0, 255, 0.3)'
                });
            });
        });

        // Enhanced card hover animations
        gsap.utils.toArray('.modern-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -15,
                    scale: 1.03,
                    rotationX: 5,
                    duration: 0.4,
                    ease: 'power2.out',
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)'
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    scale: 1,
                    rotationX: 0,
                    duration: 0.4,
                    ease: 'power2.out',
                    boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)'
                });
            });
        });

        // Enhanced exhibit card 3D hover effect
        gsap.utils.toArray('.exhibit-card').forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / centerY * 15;
                const rotateY = (x - centerX) / centerX * 15;

                gsap.to(card, {
                    rotationX: -rotateX,
                    rotationY: rotateY,
                    scale: 1.05,
                    duration: 0.4,
                    ease: 'power2.out',
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)'
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotationX: 0,
                    rotationY: 0,
                    scale: 1,
                    duration: 0.4,
                    ease: 'power2.out',
                    boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)'
                });
            });
        });
    }

    setupParticleEffects() {
        // Create particle effects for hero section
        const particleCount = 50;
        const heroSection = document.querySelector('.hero-section');
        
        if (heroSection) {
            for (let i = 0; i < particleCount; i++) {
                this.createParticle(heroSection);
            }
        }
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: linear-gradient(45deg, #ff00ff, #00ffff);
            border-radius: 50%;
            pointer-events: none;
            opacity: 0.6;
        `;
        
        container.appendChild(particle);
        
        // Animate particle
        gsap.set(particle, {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight
        });
        
        gsap.to(particle, {
            y: -100,
            x: Math.random() * window.innerWidth,
            duration: Math.random() * 3 + 2,
            ease: 'none',
            repeat: -1,
            opacity: 0
        });
    }

    setup3DTiltEffects() {
        // Add 3D tilt effect to cards on mouse move
        gsap.utils.toArray('.modern-card, .exhibit-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / centerY * 5;
                const rotateY = (x - centerX) / centerX * 5;
                
                gsap.to(card, {
                    rotationX: -rotateX,
                    rotationY: rotateY,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotationX: 0,
                    rotationY: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
    }

    // Enhanced page transition animations
    pageTransition() {
        const tl = gsap.timeline();
        
        tl.to('.main-content', {
            opacity: 0,
            y: -50,
            duration: 0.3,
            ease: 'power2.in'
        })
        .to('.main-content', {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            delay: 0.2
        });

        return tl;
    }

    // Enhanced loading animation
    showLoading() {
        gsap.to('.loading', {
            opacity: 1,
            duration: 0.3,
            scale: 1.2
        });
    }

    hideLoading() {
        gsap.to('.loading', {
            opacity: 0,
            duration: 0.3,
            scale: 0.8
        });
    }

    // Enhanced success animation
    showSuccess(element) {
        gsap.to(element, {
            scale: 1.2,
            duration: 0.2,
            ease: 'power2.out',
            yoyo: true,
            repeat: 1,
            boxShadow: '0 0 30px rgba(255, 0, 255, 0.8)'
        });
    }

    // Enhanced error animation
    showError(element) {
        gsap.to(element, {
            x: [-10, 10, -10, 10, 0],
            duration: 0.5,
            ease: 'power2.out',
            boxShadow: '0 0 20px rgba(255, 0, 0, 0.5)'
        });
    }

    // Add magnetic effect to buttons
    setupMagneticEffect() {
        gsap.utils.toArray('.modern-btn').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                gsap.to(btn, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    x: 0,
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AnimationController();
});

// Export for use in other scripts
window.AnimationController = AnimationController; 