
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = document.querySelector('.login-btn');
            const originalText = btn.textContent;
            btn.textContent = 'Iniciando sesión...';
            btn.style.background = 'linear-gradient(135deg, #6366F1, #8B5CF6)';
            
            // Simular proceso de login
            setTimeout(() => {
                btn.textContent = '✓ Bienvenido';
                btn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
                
                setTimeout(() => {
                    alert('¡Inicio de sesión exitoso!\n\nRedirigiéndote a KarenFlix...');
                    // aquí va la redirección real
                    window.location.reload();
                }, 1000);
            }, 2000);
        });

        document.querySelectorAll('.form-input').forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.02)';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'scale(1)';
            });
        });
        generateMovieBackground();
        generateParticles();

        document.addEventListener('mousemove', (e) => {
            const container = document.querySelector('.login-container');
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            container.style.transform = `translate(-50%, -50%) rotateY(${(x - 0.5) * 5}deg) rotateX(${(y - 0.5) * -5}deg)`;
        });
