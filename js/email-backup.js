document.addEventListener("DOMContentLoaded", function() {
    // Inicializa o EmailJS com sua chave pública
    emailjs.init("3DSagyWzbczF7-hIf");
    console.log("EmailJS inicializado com sucesso"); // ✅ Log de inicialização

    document.getElementById("contactForm").addEventListener("submit", function(event) {
        event.preventDefault();
        console.log("Formulário submetido"); // ✅ Log de submit

        // =================================
        // CAPTURA DE VALORES
        // =================================
        const nomeBruto = document.getElementById("nome").value;
        const emailBruto = document.getElementById("email").value;
        const mensagemBruta = document.getElementById("mensagem").value;
        
        // Log dos valores brutos (antes do trim)
        console.log("Valores brutos:", {
            nome: nomeBruto,
            email: emailBruto,
            mensagem: mensagemBruta
        });

        // =================================
        // PROCESSAMENTO DOS DADOS
        // =================================
        const nome = nomeBruto.trim();
        const email = emailBruto.trim();
        const mensagem = mensagemBruta.trim();
        
        // Log dos valores após trim
        console.log("Valores após trim:", {
            nome: nome,
            email: email,
            mensagem: mensagem
        });

        // =================================
        // VALIDAÇÕES
        // =================================
        /*
        if (nome.length < 3) {
            console.warn("Validação falhou: Nome muito curto"); // ⚠️ Log de validação
            updateStatus("Nome inválido (mínimo 3 letras)", "red");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            console.warn("Validação falhou: Email inválido"); // ⚠️ Log de validação
            updateStatus("Email inválido.", "red");
            return;
        }

        if (mensagem.length < 10) {
            console.warn("Validação falhou: Mensagem muito curta"); // ⚠️ Log de validação
            updateStatus("Mensagem muito curta (mínimo 10 caracteres).", "red");
            return;
        }
        */

        console.log("Validações passaram com sucesso"); // ✅ Log de validação

        // =================================
        // PREPARAÇÃO DO E-MAIL
        // =================================
        /*
        const templateParams = {
            name: nome,
            email: email,
            message: mensagem
        };
        */
        const templateParams = {
            nome: nome.trim(),       // Deve ser {{nome}} no template
            email: email.trim(),     // Deve ser {{email}} no template
            mensagem: mensagem.trim() // Deve ser {{mensagem}} no template
        };
        

        // Log dos parâmetros que serão enviados
        console.log("Parâmetros preparados para envio:", templateParams); // 📤 Log de envio

        // =================================
        // ENVIO DO E-MAIL
        // =================================
        emailjs.send("service_wflw2hq", "template_equ98x7", templateParams)
        .then(() => {
            updateStatus("E-mail enviado!", "green");
            document.getElementById("contactForm").reset();
        })
        .catch((error) => {
            console.error("Erro:", error);
            updateStatus("Falha no envio.", "red");
        });
        /*
        emailjs.send("service_tqdeoqw", "template_equ98x7", templateParams)
            .then((response) => {
                // Log detalhado da resposta
                console.log("✅ ENVIO BEM-SUCEDIDO! Resposta completa:", {
                    status: response.status,
                    texto: response.text,
                    dados: templateParams // Mostra o que foi enviado
                });
                
                updateStatus("Email enviado com sucesso!", "green");
                document.getElementById("contactForm").reset();
            })
            .catch((error) => {
                // Log detalhado do erro
                console.error("❌ FALHA NO ENVIO! Erro completo:", {
                    código: error.status,
                    mensagem: error.text,
                    configuração: error.config // Mostra a configuração usada
                });
                
                updateStatus("Erro ao enviar. Tente novamente.", "red");
            });
            */
    });

    // =================================
    // FUNÇÃO DE ATUALIZAÇÃO DE STATUS
    // =================================
    function updateStatus(text, color) {
        const statusElement = document.getElementById("status");
        if (!statusElement) {
            console.error("Elemento de status não encontrado!"); // 🚨 Log crítico
            return;
        }
        
        statusElement.textContent = text;
        statusElement.style.color = color;
        setTimeout(() => {
            statusElement.textContent = "";
            console.log("Status resetado após timeout"); // 🔄 Log de reset
        }, 5000);
    }
});


