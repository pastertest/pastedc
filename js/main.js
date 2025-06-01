// DOM Elements
const pasteForm = document.getElementById('paste-form');
const pasteContent = document.getElementById('paste-content');
const copyBtn = document.getElementById('copy-btn');

// Handle form submission
if (pasteForm) {
    pasteForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const title = document.getElementById('paste-title').value || 'Untitled Paste';
        const content = pasteContent.value;
        const syntax = document.getElementById('syntax').value;
        const expiry = document.getElementById('expiry').value;
        const isPrivate = document.getElementById('private').checked;
        const burnAfter = document.getElementById('burn-after').checked;
        
        // In a real app, you would send this to your backend API
        const pasteData = {
            title,
            content,
            syntax,
            expiry,
            isPrivate,
            burnAfter
        };
        
        console.log('Creating paste:', pasteData);
        
        // Simulate API call
        try {
            // Generate a random ID for demo purposes
            const pasteId = Math.random().toString(36).substring(2, 10);
            
            // Store in localStorage for demo
            const pastes = JSON.parse(localStorage.getItem('pastes') || []);
            pastes.push({
                id: pasteId,
                ...pasteData,
                createdAt: new Date().toISOString(),
                views: 0
            });
            localStorage.setItem('pastes', JSON.stringify(pastes));
            
            // Redirect to view page
            window.location.href = `view.html?id=${pasteId}`;
        } catch (error) {
            console.error('Error creating paste:', error);
            alert('Failed to create paste. Please try again.');
        }
    });
}

// Handle copy button
if (copyBtn) {
    copyBtn.addEventListener('click', () => {
        const content = document.getElementById('paste-content').textContent;
        navigator.clipboard.writeText(content)
            .then(() => {
                copyBtn.textContent = 'Copied!';
                setTimeout(() => {
                    copyBtn.textContent = 'Copy';
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy:', err);
            });
    });
}

// Load paste for view.html
if (window.location.pathname.includes('view.html')) {
    const urlParams = new URLSearchParams(window.location.search);
    const pasteId = urlParams.get('id');
    
    if (pasteId) {
        // In a real app, you would fetch from your API
        const pastes = JSON.parse(localStorage.getItem('pastes') || []);
        const paste = pastes.find(p => p.id === pasteId);
        
        if (paste) {
            // Update view count
            paste.views = (paste.views || 0) + 1;
            localStorage.setItem('pastes', JSON.stringify(pastes));
            
            // Display paste
            document.getElementById('paste-view-title').textContent = paste.title;
            document.getElementById('paste-content').textContent = paste.content;
            document.getElementById('paste-date').textContent = new Date(paste.createdAt).toLocaleString();
            document.getElementById('paste-syntax').textContent = paste.syntax === 'none' ? 'Plain text' : paste.syntax;
            document.getElementById('paste-views').textContent = `${paste.views} view${paste.views !== 1 ? 's' : ''}`;
        } else {
            document.getElementById('paste-content').textContent = 'Paste not found or has expired.';
        }
    }
}

// Load recent pastes for index.html
if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
    const pasteList = document.querySelector('.paste-list');
    
    if (pasteList) {
        const pastes = JSON.parse(localStorage.getItem('pastes') || []);
        
        if (pastes.length > 0) {
            pasteList.innerHTML = '';
            
            // Sort by most recent
            pastes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            
            // Display first 10
            pastes.slice(0, 10).forEach(paste => {
                const card = document.createElement('div');
                card.className = 'paste-card';
                card.innerHTML = `
                    <h3>${paste.title}</h3>
                    <div class="meta">
                        <span>${new Date(paste.createdAt).toLocaleDateString()}</span>
                        <span>${paste.syntax === 'none' ? 'Plain text' : paste.syntax}</span>
                    </div>
                    <div class="content-preview">${paste.content.substring(0, 100)}${paste.content.length > 100 ? '...' : ''}</div>
                    <a href="view.html?id=${paste.id}" class="btn secondary">View</a>
                `;
                pasteList.appendChild(card);
            });
        }
    }
                                           }
