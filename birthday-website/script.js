const candle = document.getElementById('candle');
const secretMessage = document.getElementById('secretMessage');
const shareButton = document.getElementById('shareButton');
const shareHint = document.getElementById('shareHint');
const shareFallback = document.getElementById('shareFallback');
const shareInput = document.getElementById('shareInput');

function showMessage() {
  secretMessage.classList.toggle('visible');
  secretMessage.setAttribute('aria-hidden', secretMessage.classList.contains('visible') ? 'false' : 'true');
  if (secretMessage.classList.contains('visible')) {
    triggerConfetti();
  }
}

async function shareBirthday() {
  const shareText = 'Check out this birthday surprise!';
  const shareUrl = window.location.href;
  shareInput.value = shareUrl;

  if (navigator.share) {
    try {
      await navigator.share({ title: 'Birthday Surprise', text: shareText, url: shareUrl });
      showShareHint('Shared successfully!');
      return;
    } catch (error) {
      // Continue to clipboard fallback or manual fallback
    }
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(shareUrl);
      showShareHint('Link copied!');
      return;
    } catch (error) {
      // Manual fallback below
    }
  }

  shareFallback.hidden = false;
  shareInput.select();
  showShareHint('Unable to copy automatically.');
}

function showShareHint(message) {
  shareHint.textContent = message;
  shareHint.classList.add('visible');
  setTimeout(() => shareHint.classList.remove('visible'), 2200);
}

function triggerConfetti() {
  const count = 24;
  for (let i = 0; i < count; i += 1) {
    const dot = document.createElement('div');
    dot.className = 'confetti-dot';
    dot.style.left = `${50 + (Math.random() - 0.5) * 50}%`;
    dot.style.top = `${10 + Math.random() * 20}%`;
    dot.style.background = `hsl(${Math.random() * 320 + 20}, 82%, 64%)`;
    dot.style.opacity = `${0.7 + Math.random() * 0.3}`;
    dot.style.transform = `translate(-50%, -50%) scale(${0.7 + Math.random() * 0.8})`;
    document.body.appendChild(dot);
    window.setTimeout(() => dot.remove(), 2000);
  }
}

candle.addEventListener('click', showMessage);
candle.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    showMessage();
  }
});

shareButton.addEventListener('click', shareBirthday);
