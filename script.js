function loadModule(moduleName) {
    const display = document.getElementById('module-display');
    
    // Buttons active state update
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');

    if(moduleName === 'ai') {
        display.innerHTML = `
            <h2>🤖 Nawab AI Assistant</h2>
            <div class="chat-box" style="background:#111; padding:20px; border-radius:10px; height:300px; border:1px solid #333;">
                <p style="color:#888;">AI is ready to help the world...</p>
            </div>
            <input type="text" placeholder="Ask anything..." style="width:100%; padding:15px; margin-top:10px; background:#222; border:none; color:#fff;">
        `;
    } else if(moduleName === 'safety') {
        display.innerHTML = `
            <h2>🛡️ Device Safety Hub</h2>
            <p>Enter your mobile model to get a security audit:</p>
            <input type="text" id="phoneModel" placeholder="e.g. Vivo V20, Samsung S23..." style="padding:15px; width:80%; background:#222; border:none; color:#fff;">
            <button onclick="checkSafety()" style="padding:15px; background:var(--primary); border:none; cursor:pointer;">CHECK</button>
            <div id="safetyResult" style="margin-top:20px;"></div>
        `;
    }
}

function checkSafety() {
    const model = document.getElementById('phoneModel').value;
    const result = document.getElementById('safetyResult');
    result.innerHTML = `<div style="padding:20px; background:#1a1a1a; border-left:5px solid #00ff88;">
        <h4>Safety Report for ${model}</h4>
        <p>1. Always keep 'Play Protect' enabled.</p>
        <p>2. Disable 'Install from Unknown Sources' after using Termux.</p>
        <p>3. Use Biometric lock for sensitive apps.</p>
    </div>`;
}
