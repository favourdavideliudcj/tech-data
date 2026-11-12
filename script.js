document.addEventListener('DOMContentLoaded', () => {
    // 1. Cryptographic Password Entropy Analyzer
    const passInput = document.getElementById('passInput');
    const strengthBar = document.getElementById('strengthBar');
    const strengthLabel = document.getElementById('strengthLabel');
    const entropyBitsEl = document.getElementById('entropyBits');
    const crackTimeEl = document.getElementById('crackTime');
  
    function evaluatePassword(pwd) {
      if (!pwd) {
        strengthBar.style.width = '0%';
        strengthLabel.textContent = 'AWAITING INPUT';
        entropyBitsEl.textContent = '0 bits';
        crackTimeEl.textContent = '--';
        return;
      }
  
      let poolSize = 0;
      if (/[a-z]/.test(pwd)) poolSize += 26;
      if (/[A-Z]/.test(pwd)) poolSize += 26;
      if (/[0-9]/.test(pwd)) poolSize += 10;
      if (/[^a-zA-Z0-9]/.test(pwd)) poolSize += 32;
  
      const bits = Math.round(pwd.length * Math.log2(poolSize || 1));
      entropyBitsEl.textContent = `${bits} bits`;
  
      if (bits < 40) {
        strengthBar.style.width = '25%';
        strengthBar.style.background = '#ef4444';
        strengthLabel.textContent = 'CRITICAL (WEAK)';
        crackTimeEl.textContent = 'Under 1 second';
      } else if (bits < 65) {
        strengthBar.style.width = '55%';
        strengthBar.style.background = '#f59e0b';
        strengthLabel.textContent = 'MODERATE';
        crackTimeEl.textContent = '4 Days';
      } else if (bits < 90) {
        strengthBar.style.width = '80%';
        strengthBar.style.background = '#38bdf8';
        strengthLabel.textContent = 'STRONG';
        crackTimeEl.textContent = '1,400 Years';
      } else {
        strengthBar.style.width = '100%';
        strengthBar.style.background = '#10b981';
        strengthLabel.textContent = 'QUANTUM RESISTANT';
        crackTimeEl.textContent = 'Centuries+';
      }
    }
  
    passInput.addEventListener('input', (e) => evaluatePassword(e.target.value));
  
    // Cryptographically Secure Key Generator
    document.getElementById('generatePassBtn').addEventListener('click', () => {
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*_-+=';
      const array = new Uint32Array(20);
      window.crypto.getRandomValues(array);
      let generated = '';
      for (let i = 0; i < array.length; i++) {
        generated += chars[array[i] % chars.length];
      }
      passInput.value = generated;
      evaluatePassword(generated);
    });
  
    // 2. Simulated Live Global Threat Feed
    const threatLog = document.getElementById('threatLog');
    const toggleFeedBtn = document.getElementById('toggleFeedBtn');
    let feedActive = true;
  
    const sampleEvents = [
      { type: 'BLOCKED', cls: 'log-ok', msg: 'DDoS volumetric flood mitigated (420 Gbps) • Node: AP-SOUTH' },
      { type: 'BLOCKED', cls: 'log-ok', msg: 'Zero-day SSRF exploit payload dropped • Node: US-WEST' },
      { type: 'ISOLATED', cls: 'log-warn', msg: 'Anomalous outbound SSH tunnel halted • Host: DB-PROD-04' },
      { type: 'BLOCKED', cls: 'log-ok', msg: 'Malicious JWT signature forgery rejected • Node: EU-WEST' }
    ];
  
    setInterval(() => {
      if (!feedActive) return;
      const item = sampleEvents[Math.floor(Math.random() * sampleEvents.length)];
      const now = new Date().toISOString().split('T').slice(0, 8);
  
      const line = document.createElement('div');
      line.className = 'log-line';
      line.innerHTML = `<span class="log-time">[${now} UTC]</span> <span class="${item.cls}">${item.type}</span> ${item.msg}`;
  
      threatLog.prepend(line);
      if (threatLog.children.length > 8) {
        threatLog.removeChild(threatLog.lastChild);
      }
    }, 2600);
  
    toggleFeedBtn.addEventListener('click', () => {
      feedActive = !feedActive;
      toggleFeedBtn.textContent = feedActive ? 'Pause Stream' : 'Resume Stream';
    });
  
    // 3. Emergency Incident Modal
    const incidentModal = document.getElementById('incidentModal');
    document.getElementById('openEmergencyBtn').addEventListener('click', () => {
      incidentModal.classList.add('open');
    });
    document.getElementById('closeIncidentBtn').addEventListener('click', () => {
      incidentModal.classList.remove('open');
    });
    document.getElementById('incidentForm').addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Priority 1 ticket created! Aegis Forensics is establishing an encrypted channel.');
      incidentModal.classList.remove('open');
    });
  });
  