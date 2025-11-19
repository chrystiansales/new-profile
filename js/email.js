// ============================================
// SISTEMA DE ENVIO DE E-MAIL - EmailJS
// ============================================

document.addEventListener("DOMContentLoaded", function() {
    // Inicializar EmailJS
    emailjs.init("3DSagyWzbczF7-hIf");

    const form = document.getElementById("contactForm");
    const submitBtn = form.querySelector('.btn-submit');
    const statusElement = document.getElementById("status");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        // Captura dos valores
        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const mensagem = document.getElementById("mensagem").value.trim();

        // Validações
        if (nome.length < 3) {
            showStatus("Nome inválido (mínimo 3 letras)", "error");
            shakeInput(document.getElementById("nome"));
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showStatus("E-mail inválido", "error");
            shakeInput(document.getElementById("email"));
            return;
        }

        if (mensagem.length < 10) {
            showStatus("Mensagem muito curta (mínimo 10 caracteres)", "error");
            shakeInput(document.getElementById("mensagem"));
            return;
        }

        // Mostrar loading
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // Parâmetros para o template
        const templateParams = {
            nome: nome,
            email: email,
            mensagem: mensagem
        };

        // Envio do e-mail
        emailjs.send("service_wflw2hq", "template_equ98x7", templateParams)
            .then(() => {
                showStatus("Mensagem enviada com sucesso! Entrarei em contato em breve.", "success");
                form.reset();

                // Animação de sucesso
                submitBtn.innerHTML = `
                    <span class="btn-text">Enviado!</span>
                    <i class="fas fa-check btn-icon"></i>
                `;

                setTimeout(() => {
                    submitBtn.innerHTML = `
                        <span class="btn-text">Enviar mensagem</span>
                        <span class="btn-loading">
                            <i class="fas fa-spinner fa-spin"></i>
                        </span>
                        <i class="fas fa-paper-plane btn-icon"></i>
                    `;
                }, 3000);
            })
            .catch((error) => {
                console.error("Erro ao enviar:", error);
                showStatus("Falha no envio. Tente novamente ou entre em contato via WhatsApp.", "error");
            })
            .finally(() => {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            });
    });

    function showStatus(text, type) {
        statusElement.textContent = text;
        statusElement.className = `form-status ${type}`;

        // Auto-hide após 5 segundos
        setTimeout(() => {
            statusElement.textContent = "";
            statusElement.className = "form-status";
        }, 5000);
    }

    function shakeInput(input) {
        input.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            input.style.animation = '';
        }, 500);
    }

    // Adicionar animação de shake ao CSS dinamicamente
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);

    // Feedback visual em tempo real nos inputs
    const inputs = form.querySelectorAll('input, textarea');

    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.checkValidity() && this.value.trim() !== '') {
                this.style.borderColor = '#22c55e';
            } else if (this.value.trim() !== '') {
                this.style.borderColor = '#ef4444';
            } else {
                this.style.borderColor = '#e2e8f0';
            }
        });

        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.style.borderColor = '#e2e8f0';
            }
        });
    });
});
