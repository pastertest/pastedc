// Basic syntax highlighting for the editor
document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.getElementById('paste-content');
    const syntaxSelect = document.getElementById('syntax');
    
    if (textarea && syntaxSelect) {
        // Simple syntax highlighting toggle
        syntaxSelect.addEventListener('change', () => {
            const syntax = syntaxSelect.value;
            
            // In a real app, you would use a proper syntax highlighting library
            if (syntax !== 'none') {
                textarea.classList.add('syntax-' + syntax);
            } else {
                // Remove all syntax classes
                textarea.className = textarea.className.replace(/\bsyntax-\S+/g, '');
            }
        });
        
        // Tab key support
        textarea.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = this.selectionStart;
                const end = this.selectionEnd;
                
                // Insert tab character
                this.value = this.value.substring(0, start) + '\t' + this.value.substring(end);
                
                // Move cursor position
                this.selectionStart = this.selectionEnd = start + 1;
            }
        });
    }
});
