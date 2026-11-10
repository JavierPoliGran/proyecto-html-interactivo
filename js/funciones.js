document.addEventListener('DOMContentLoaded', () => {
    
    /* --- 1. Lógica del Formulario de Registro Mínimo (en index.html) --- */
    const registroForm = document.getElementById('registro-form');
    const saludoUsuario = document.getElementById('saludo-usuario');

    if (registroForm) {
        // Cargar nombre guardado previamente si existe
        const nombreGuardado = localStorage.getItem('estudiante_html');
        if (nombreGuardado) {
            document.getElementById('nombre').value = nombreGuardado;
            saludoUsuario.textContent = `¡Hola de nuevo, ${nombreGuardado}! Tu progreso está guardado.`;
        }

        registroForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nombreInput = document.getElementById('nombre').value.trim();
            if (nombreInput) {
                localStorage.setItem('estudiante_html', nombreInput);
                saludoUsuario.textContent = `¡Excelente, ${nombreInput}! Ya puedes avanzar al editor.`;
            }
        });
    }

    /* --- 2. Lógica del Editor en Tiempo Real / Pantalla Dividida (en editor.html) --- */
    const codeInput = document.getElementById('code-input');
    const previewOutput = document.getElementById('preview-output');

    if (codeInput && previewOutput) {
        function actualizarVistaPrevia() {
            const codigo = codeInput.value;
            const iframeDoc = previewOutput.contentDocument || previewOutput.contentWindow.document;
            
            iframeDoc.open();
            iframeDoc.write(codigo);
            iframeDoc.close();
        }

        // Actualizar la vista previa mientras el usuario escribe
        codeInput.addEventListener('input', actualizarVistaPrevia);

        // Cargar la vista previa inicial al abrir la página
        actualizarVistaPrevia();
    }
});