// Global function for mode selection
function selectProfile(mode) {
    localStorage.setItem('selectedMode', mode);
    window.location.href = `main.html?mode=${mode}`;
}

document.addEventListener("DOMContentLoaded", () => {

    // --- 1. INTRO PAGE LOGIC (index.html) ---
    const logo = document.getElementById("logo");
    const sound = document.getElementById("introSound");

    if (logo && sound) {
        let clicked = false;

        // Function to handle the start
        const startIntro = () => {
            if (clicked) return;
            clicked = true;

            sound.volume = 0.8;
            sound.play().catch(error => console.log("Audio play blocked:", error));

            logo.classList.add("animate");

            // Redirect to home.html after 3s animation
            setTimeout(() => {
                window.location.href = "home.html";
            }, 3000);
        };

        logo.addEventListener("click", startIntro);
        // Optional: Allow clicking background to start too
        document.querySelector('.intro-container').addEventListener("click", startIntro);
    }


    // --- 2. MAIN NAVBAR SCROLL LOGIC & DYNAMIC IMAGE ---
    const nav = document.querySelector('.browse-nav');
    const profileImg = document.querySelector('.nav-profile img');
    const sidebarProfileImg = document.getElementById('sidebar-profile-img');

    // Dynamic Image Logic
    // Try to get mode from URL first, then localStorage, then default
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode') || localStorage.getItem('selectedMode') || 'Recruiter';

    // Save to localStorage if found in URL (to persist for future navigations)
    if (urlParams.get('mode')) {
        localStorage.setItem('selectedMode', mode);
    }

    const items = {
        'Recruiter': 'assets/images/blue-avatar.png',
        'Developer': 'assets/images/grey-avatar.png',
        'Stalker': 'assets/images/red-avatar.png'
    };
    const avatarSrc = items[mode] || items['Recruiter'];

    if (profileImg) {
        profileImg.src = avatarSrc;
        profileImg.alt = mode;
    }

    if (sidebarProfileImg) {
        sidebarProfileImg.src = avatarSrc;
        sidebarProfileImg.alt = mode;
    }

    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.classList.add('nav-black');
            } else {
                nav.classList.remove('nav-black');
            }
        });
    }

    // --- 3. MOBILE SIDEBAR LOGIC ---
    const hamburger = document.querySelector('.hamburger-menu');
    const sidebar = document.querySelector('.mobile-sidebar');
    const closeBtn = document.querySelector('.sidebar-close');
    const overlay = document.querySelector('.sidebar-overlay');

    if (hamburger && sidebar && overlay) {
        const toggleSidebar = () => {
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.classList.toggle('no-scroll'); // Prevent body scroll
        };

        hamburger.addEventListener('click', toggleSidebar);
        if (closeBtn) closeBtn.addEventListener('click', toggleSidebar);
        overlay.addEventListener('click', toggleSidebar);
    }


    // --- 4. TITLE & HERO BACKGROUND LOGIC ---
    // Hero Background Logic
    const heroBgImg = document.querySelector('.hero-bg img');

    if (heroBgImg) {
        // Define GIF assets
        const bgAssets = {
            'Recruiter': ['assets/videos/recruiter-1.gif', 'assets/videos/recruiter-2.gif'],
            'Developer': ['assets/videos/developer-1.gif', 'assets/videos/developer-2.gif'],
            'Stalker': ['assets/videos/stalker.gif']
        };

        const currentMode = localStorage.getItem('selectedMode') || 'Recruiter';
        const images = bgAssets[currentMode] || bgAssets['Recruiter'];

        // Function to set background
        let currentIndex = 0;

        const setBackground = () => {
            heroBgImg.src = images[currentIndex];
            currentIndex = (currentIndex + 1) % images.length;
        };

        // Initial Set
        setBackground();

        // If multiple images, cycle them
        if (images.length > 1) {
            setInterval(setBackground, 5000); // Change every 5 seconds
        }
    }


    // --- 5. TIMELINE SCROLL ANIMATION (experience.html) ---
    const timelineItems = document.querySelectorAll('.timeline-item');

    if (timelineItems.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, { threshold: 0.1 }); // Trigger when 10% visible

        timelineItems.forEach(item => {
            observer.observe(item);
        });
    }

});