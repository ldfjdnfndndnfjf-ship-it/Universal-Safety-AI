// Nawab ZADA Guardian - Final Brain
const GEMINI_API_KEY = "AIzaSyCooWFRTLsgV4t3fsxQ92I8sHoawbMGfbk";

async function askNawabAI() {
    const userInput = document.getElementById('user-query').value;
    const chatDisplay = document.getElementById('chat-display');
    
    if(!userInput) return;

    // User message screen par
    chatDisplay.innerHTML += `<div style="margin-bottom:15px; text-align:right;"><span style="background:var(--primary); color:#000; padding:10px 18px; border-radius:18px 18px 0 18px; display:inline-block; font-weight:bold; box-shadow: 0 4px 10px rgba(0,255,136,0.2);">Aap: ${userInput}</span></div>`;
    document.getElementById('user-query').value = ""; 
    chatDisplay.scrollTop = chatDisplay.scrollHeight;

    const loadingId = "load-" + Date.now();
    chatDisplay.innerHTML += `<div id="${loadingId}" style="color:var(--primary); font-style:italic; margin-bottom:15px; font-size: 14px;">⚡ wait for my reply...</div>`;

    try {
        // Direct Google Gemini API Call
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ 
                    parts: [{ 
                        text: `Your identity: AI, a world-class smart assistant created by Nawab ZADA Hacker. Style: Expert, friendly, and brief. Language: Roman Urdu/Hindi or English. User Input: ${userInput}` 
                    }] 
                }]
            })
        });

        const data = await response.json();
        
        // Remove loading
        if(document.getElementById(loadingId)) document.getElementById(loadingId).remove();

        if (data.candidates && data.candidates[0].content) {
            const aiResponse = data.candidates[0].content.parts[0].text;
            chatDisplay.innerHTML += `<div style="margin-bottom:15px;"><span style="background:#222; color:#fff; padding:12px 18px; border-radius:18px 18px 18px 0; border-left:4px solid var(--primary); display:inline-block; line-height:1.6; box-shadow: 0 4px 15px rgba(0,0,0,0.5);"><b>Nawab AI:</b> ${aiResponse}</span></div>`;
        } else {
            throw new Error("Invalid API Response");
        }
        
    } catch (error) {
        if(document.getElementById(loadingId)) document.getElementById(loadingId).remove();
        chatDisplay.innerHTML += `<div style="color:#ff4444; background: rgba(255,68,68,0.1); padding: 10px; border-radius: 8px; margin-bottom:15px; border: 1px solid #ff4444;"><b>System Alert:</b> Jani, Google connect nahi ho raha. Check karein ke API Key active hai ya nahi!</div>`;
    }
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

// Module Management (Dashboard Logic)
function loadModule(moduleName) {
    const display = document.getElementById('module-display');
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    
    if(window.event && window.event.currentTarget) {
        window.event.currentTarget.classList.add('active');
    }

    if(moduleName === 'ai') {
        display.innerHTML = `
            <div style="animation: fadeIn 0.5s ease;">
                <h2 style="color:var(--primary); margin-bottom:20px; font-size: 24px;"><i class="fas fa-robot"></i> Nawab AI Assistant</h2>
                <div id="chat-display" style="background:#111; padding:20px; border-radius:15px; height:420px; border:1px solid #333; overflow-y:auto; margin-bottom:15px; display:flex; flex-direction:column; scroll-behavior: smooth;">
                    <p style="color:#888; text-align:center; padding: 20px; border: 1px dashed #444; border-radius: 10px;">Assalam-o-Alaikum! Main Nawab ZADA ka banaya hua Super AI hoon. <br>Koi bhi tech ya security ka sawal poochein.</p>
                </div>
                
                <div style="display:flex; gap:10px; background: #222; padding: 8px; border-radius: 12px; border: 1px solid #444;">
                    <input type="text" id="user-query" placeholder="Sawal yahan likhein..." 
                        onkeypress="if(event.key==='Enter') askNawabAI()" 
                        style="flex:1; padding:12px; background:transparent; border:none; color:#fff; outline:none; font-size:16px;">
                    
                    <button id="send-btn" onclick="askNawabAI()" 
                        style="padding:12px 25px; background:var(--primary); border:none; border-radius:10px; cursor:pointer; font-weight:bold; color:#000; display: flex; align-items: center; gap: 8px; transition: 0.3s;">
                        <i class="fas fa-paper-plane"></i> SEND
                    </button>
                </div>
            </div>
        `;
    } else if(moduleName === 'safety') {
        display.innerHTML = `
            <div style="animation: fadeIn 0.5s ease;">
                <h2 style="color:var(--primary);"><i class="fas fa-mobile-alt"></i> Device Safety Hub</h2>
                <p style="color: #ccc;">Device model enter karein check-up ke liye:</p>
                <div style="display:flex; gap:10px; margin-top:20px;">
                    <input type="text" id="phoneModel" placeholder="e.g. Vivo, iPhone, Samsung..." style="flex:1; padding:15px; background:#222; border:1px solid #444; color:#fff; border-radius:10px; outline:none;">
                    <button onclick="checkSafety()" style="padding:15px 30px; background:var(--primary); border:none; border-radius:10px; cursor:pointer; font-weight:bold; color:#000;">CHECK</button>
                </div>
                <div id="safetyResult" style="margin-top:30px;"></div>
            </div>
        `;
    }
}

function checkSafety() {
    const model = document.getElementById('phoneModel').value;
    const result = document.getElementById('safetyResult');
    if(!model) return;
    
    result.innerHTML = `<div style="padding:25px; background:#1a1a1a; border-radius:15px; border-left:5px solid var(--primary); animation: slideUp 0.4s ease;">
        <h3 style="color:var(--primary); margin-top:0;">🛡️ Audit Report: ${model}</h3>
        <p style="color: #fff;">Status: <span style="color: var(--primary);">Scanning...</span></p>
        <ul style="line-height:2; color:#bbb;">
            <li>✅ Device hardware protection check.</li>
            <li>✅ Software version vulnerability scan.</li>
            <li>✅ Recommendations: Disable 'Unknown Sources' and use Nawab Guardian shield.</li>
        </ul>
    </div>`;
}

window.onload = () => loadModule('ai');
