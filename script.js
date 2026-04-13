// Nawab ZADA Guardian - Brain Logic
const GEMINI_API_KEY = "AIzaSyCooWFRTLsgV4t3fsxQ92I8sHoawbMGfbk";

async function askNawabAI() {
    const userInput = document.getElementById('user-query').value;
    const chatDisplay = document.getElementById('chat-display');
    const sendBtn = document.getElementById('send-btn');
    
    if(!userInput) return;

    // User ka message screen par dikhana
    chatDisplay.innerHTML += `<div style="margin-bottom:15px; text-align:right;"><span style="background:var(--primary); color:#000; padding:8px 15px; border-radius:15px; display:inline-block; font-weight:bold;">Aap: ${userInput}</span></div>`;
    document.getElementById('user-query').value = ""; 
    chatDisplay.scrollTop = chatDisplay.scrollHeight;

    // Loading indicator
    const loadingId = "loading-" + Date.now();
    chatDisplay.innerHTML += `<div id="${loadingId}" style="color:#888; font-style:italic; margin-bottom:15px;">Nawab AI soch raha hai...</div>`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ 
                    parts: [{ 
                        text: `Context: You are Nawab AI, a world-class AI assistant created by Nawab ZADA Hacker. You are helpful, friendly, and expert in tech and safety. Always address the user respectfully. Question: ${userInput}` 
                    }] 
                }]
            })
        });

        const data = await response.json();
        const aiResponse = data.candidates[0].content.parts[0].text;
        
        // Remove loading and show AI response
        document.getElementById(loadingId).remove();
        chatDisplay.innerHTML += `<div style="margin-bottom:15px;"><span style="background:#222; color:#fff; padding:10px 15px; border-radius:15px; border-left:4px solid var(--primary); display:inline-block; line-height:1.5;"><b>Nawab AI:</b> ${aiResponse}</span></div>`;
        
    } catch (error) {
        document.getElementById(loadingId).innerHTML = `<span style="color:red;">Error: Jani connection nahi ban raha! Key check karein.</span>`;
    }
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

// Module Management
function loadModule(moduleName) {
    const display = document.getElementById('module-display');
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    
    // Set active button
    if(event) event.currentTarget.classList.add('active');

    if(moduleName === 'ai') {
        display.innerHTML = `
            <div style="animation: fadeIn 0.5s ease;">
                <h2 style="color:var(--primary); margin-bottom:20px;"><i class="fas fa-robot"></i> Nawab AI Assistant</h2>
                <div id="chat-display" style="background:#111; padding:20px; border-radius:12px; height:400px; border:1px solid #333; overflow-y:auto; margin-bottom:15px; display:flex; flex-direction:column;">
                    <p style="color:#888; text-align:center;">Assalam-o-Alaikum! Main Nawab ZADA ka banaya hua AI hoon. Main aapki kya madad kar sakta hoon?</p>
                </div>
                <div style="display:flex; gap:10px;">
                    <input type="text" id="user-query" placeholder="Sawal poochein..." onkeypress="if(event.key==='Enter') askNawabAI()" style="flex:1; padding:15px; background:#222; border:1px solid #444; color:#fff; border-radius:8px; outline:none;">
                    <button id="send-btn" onclick="askNawabAI()" style="padding:15px 30px; background:var(--primary); border:none; border-radius:8px; cursor:pointer; font-weight:bold; color:#000;">SEND</button>
                </div>
            </div>
        `;
    } else if(moduleName === 'safety') {
        display.innerHTML = `
            <div style="animation: fadeIn 0.5s ease;">
                <h2 style="color:var(--primary);"><i class="fas fa-mobile-alt"></i> Device Safety Hub</h2>
                <p>Apne mobile ka model likhein taake hum uski security check kar saken:</p>
                <div style="display:flex; gap:10px; margin-top:20px;">
                    <input type="text" id="phoneModel" placeholder="e.g. Vivo V20, Samsung S23..." style="flex:1; padding:15px; background:#222; border:none; color:#fff; border-radius:8px;">
                    <button onclick="checkSafety()" style="padding:15px 25px; background:var(--primary); border:none; border-radius:8px; cursor:pointer; font-weight:bold; color:#000;">CHECK</button>
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
    
    result.innerHTML = `<div style="padding:25px; background:#1a1a1a; border-radius:12px; border-left:5px solid var(--primary); animation: slideUp 0.4s ease;">
        <h3 style="color:var(--primary); margin-top:0;">🛡️ Security Report for ${model}</h3>
        <ul style="line-height:1.8; color:#ddd;">
            <li><b>Play Protect:</b> Isay hamesha On rakhein.</li>
            <li><b>Permissions:</b> Faltu apps ko Camera aur Location ki access na dein.</li>
            <li><b>System Update:</b> Check karein ke aapka phone latest security patch par hai ya nahi.</li>
            <li><b>Hacker Tip:</b> Nawab ZADA mashwara dete hain ke public Wi-Fi par VPN lazmi use karein.</li>
        </ul>
    </div>`;
}

// Initialize
window.onload = () => loadModule('ai');
            
