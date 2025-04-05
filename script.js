document.addEventListener('DOMContentLoaded', () => {
    const celebrateBtn = document.getElementById('celebrateBtn');
    const confettiContainer = document.getElementById('confetti-container');
    let isCelebrating = false;
    let activeConfetti = 0;
    const MAX_CONFETTI = 200; // Maximum number of confetti pieces at once

    // Function to create confetti effect
    function createConfetti() {
        if (activeConfetti >= MAX_CONFETTI) return;
        
        const colors = ['#ffd700', '#ffeb3b', '#ffc107', '#ffb300', '#ffa000'];
        const confettiCount = 20; // Reduced batch size

        for (let i = 0; i < confettiCount && activeConfetti < MAX_CONFETTI; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-20px';
            confetti.style.animationDuration = (Math.random() * 3 + 4) + 's';
            confetti.style.opacity = Math.random() * 0.5 + 0.5;
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.boxShadow = '0 0 5px rgba(255, 215, 0, 0.5)';
            
            // Add event listener for animation end
            confetti.addEventListener('animationend', () => {
                confetti.remove();
                activeConfetti--;
            });
            
            confettiContainer.appendChild(confetti);
            activeConfetti++;
        }
    }

    // Function to cleanup all confetti
    function cleanupConfetti() {
        const confettiElements = confettiContainer.getElementsByClassName('confetti');
        while (confettiElements.length > 0) {
            confettiElements[0].remove();
        }
        activeConfetti = 0;
    }

    // Function to trigger celebration
    function celebrate() {
        if (isCelebrating) return;
        isCelebrating = true;

        // Cleanup any existing confetti
        cleanupConfetti();

        // Create initial confetti effect
        createConfetti();

        // Trigger confetti.js effect with golden colors
        confetti({
            particleCount: 50, // Reduced particle count
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ffd700', '#ffeb3b', '#ffc107', '#ffb300', '#ffa000']
        });

        // Play a soothing party song
        const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3');
        audio.volume = 0.4;
        audio.play().catch(error => console.log('Audio play failed:', error));

        // Add some fun animations to the cake
        const cake = document.querySelector('.cake');
        cake.style.transform = 'scale(1.1)';
        setTimeout(() => {
            cake.style.transform = 'scale(1)';
        }, 500);

        // Create continuous confetti effect
        const confettiInterval = setInterval(() => {
            if (!isCelebrating) {
                clearInterval(confettiInterval);
                cleanupConfetti();
                return;
            }
            createConfetti();
        }, 300); // Increased interval to reduce CPU load

        // Stop celebration after 30 seconds
        setTimeout(() => {
            isCelebrating = false;
            clearInterval(confettiInterval);
            cleanupConfetti();
        }, 30000);
    }

    // Add click event listener to the celebrate button
    celebrateBtn.addEventListener('click', celebrate);

    // Add some initial animations
    const elements = document.querySelectorAll('.animate__animated');
    elements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
    });
}); 