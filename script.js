document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');

        // Icon Toggle Logic
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');

            // Reset Icon to Hamburger
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Custom Smooth Scroll Function
    function smoothScroll(target, duration) {
        var target = document.querySelector(target);
        var targetPosition = target.getBoundingClientRect().top;
        var startPosition = window.pageYOffset;
        var headerOffset = 85; // Navbar height
        var distance = targetPosition - headerOffset;
        var startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            var timeElapsed = currentTime - startTime;
            var run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            smoothScroll(this.getAttribute('href'), 1000);
        });
    });



    // Navbar Background Change on Scroll & Scroll Spy
    function updateActiveState() {
        // Navbar style is now static (liquid glass default)


        // Scroll Spy
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.nav-links a');

        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        // If at the very top, force 'home'
        if (window.scrollY < 100) {
            current = 'home';
        }

        const navSlider = document.querySelector('.nav-slider-bg');
        let activeLink = null;

        navItems.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
                activeLink = a;
            }
        });

        if (activeLink && navSlider) {
            navSlider.style.opacity = '1';
            navSlider.style.width = `${activeLink.offsetWidth + 20}px`; // Add padding
            navSlider.style.left = `${activeLink.offsetLeft - 10}px`; // Center padding
            navSlider.style.height = `${activeLink.offsetHeight + 10}px`; // Add padding
            navSlider.style.top = `${activeLink.offsetTop - 5}px`; // Center padding
        } else if (navSlider) {
            navSlider.style.opacity = '0';
        }

        // Logo Active State
        const logo = document.querySelector('.logo');
        if (current === 'home') {
            logo.classList.add('active');
        } else {
            logo.classList.remove('active');
        }
    }

    // Optimized Scroll Listener
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateActiveState();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Run on load to set initial state
    updateActiveState();

    // Track Toggles
    const btnSoundcloud = document.getElementById('btn-soundcloud');
    const btnSpotify = document.getElementById('btn-spotify');
    const btnYoutube = document.getElementById('btn-youtube');
    const tracksSoundcloud = document.getElementById('soundcloud-tracks');
    const tracksSpotify = document.getElementById('spotify-tracks');
    const tracksYoutube = document.getElementById('youtube-tracks');
    const tracksControlsContainer = document.querySelector('.tracks-controls');

    if (btnSoundcloud && btnSpotify && btnYoutube && tracksSoundcloud && tracksSpotify && tracksYoutube) {
        const btnShowMore = document.getElementById('btn-show-more');

        function manageTrackVisibility() {
            const activeContainer = tracksSoundcloud.classList.contains('hidden') ? tracksSpotify : tracksSoundcloud;
            const tracks = activeContainer.querySelectorAll('.track-item');

            // Check if we need to hide items (initial state)
            let hiddenCount = 0;
            tracks.forEach((track, index) => {
                if (index >= 6) {
                    // Only add hidden class if it's not already explicitly shown (we can use a data attribute or just check class)
                    // For simplicity, let's assume we reset on tab switch or just check if they have 'track-hidden'
                    // Actually, let's just check if we should show the button
                    if (track.classList.contains('track-hidden')) {
                        hiddenCount++;
                    }
                }
            });

            // If we have hidden tracks, show button. If not, hide button.
            // Wait, we need to initialize the hidden state first.
        }

        // Initialize: Hide tracks > 6
        [tracksSoundcloud, tracksSpotify, tracksYoutube].forEach(container => {
            const tracks = container.querySelectorAll('.track-item');
            tracks.forEach((track, index) => {
                if (index >= 6) {
                    track.classList.add('track-hidden');
                }
            });
        });

        function updateShowMoreButton() {
            let activeContainer;
            if (!tracksSoundcloud.classList.contains('hidden')) {
                activeContainer = tracksSoundcloud;
            } else if (!tracksSpotify.classList.contains('hidden')) {
                activeContainer = tracksSpotify;
            } else if (!tracksYoutube.classList.contains('hidden')) {
                activeContainer = tracksYoutube;
            }

            if (activeContainer) {
                const hiddenTracks = activeContainer.querySelectorAll('.track-hidden');
                if (hiddenTracks.length > 0) {
                    btnShowMore.style.display = 'block';
                } else {
                    btnShowMore.style.display = 'none';
                }
            }
        }

        // Initial button state
        updateShowMoreButton();

        btnShowMore.addEventListener('click', () => {
            let activeContainer;
            if (!tracksSoundcloud.classList.contains('hidden')) {
                activeContainer = tracksSoundcloud;
            } else if (!tracksSpotify.classList.contains('hidden')) {
                activeContainer = tracksSpotify;
            } else if (!tracksYoutube.classList.contains('hidden')) {
                activeContainer = tracksYoutube;
            }

            if (activeContainer) {
                const hiddenTracks = activeContainer.querySelectorAll('.track-hidden');
                hiddenTracks.forEach(track => {
                    track.classList.remove('track-hidden');
                });
            }
            updateShowMoreButton();
        });

        btnSpotify.addEventListener('click', () => {
            btnSpotify.classList.add('active');
            btnSoundcloud.classList.remove('active');
            btnYoutube.classList.remove('active');

            updateSlider(tracksControlsContainer, btnSpotify);

            tracksSpotify.classList.remove('hidden');
            tracksSoundcloud.classList.add('hidden');
            tracksYoutube.classList.add('hidden');
            updateShowMoreButton();
        });

        btnSoundcloud.addEventListener('click', () => {
            btnSoundcloud.classList.add('active');
            btnSpotify.classList.remove('active');
            btnYoutube.classList.remove('active');

            updateSlider(tracksControlsContainer, btnSoundcloud);

            tracksSoundcloud.classList.remove('hidden');
            tracksSpotify.classList.add('hidden');
            tracksYoutube.classList.add('hidden');
            updateShowMoreButton();
        });

        btnYoutube.addEventListener('click', () => {
            btnYoutube.classList.add('active');
            btnSpotify.classList.remove('active');
            btnSoundcloud.classList.remove('active');

            updateSlider(tracksControlsContainer, btnYoutube);

            tracksYoutube.classList.remove('hidden');
            tracksSpotify.classList.add('hidden');
            tracksSoundcloud.classList.add('hidden');
            updateShowMoreButton();
        });

        // Initialize Slider for Tracks
        const activeTrackBtn = tracksControlsContainer.querySelector('.btn-toggle.active');
        if (activeTrackBtn) {
            setTimeout(() => updateSlider(tracksControlsContainer, activeTrackBtn), 100);
        }
    }

    // Sets Toggle Logic
    const btnSetsYoutube = document.getElementById('btn-sets-youtube');
    const btnSetsSoundcloud = document.getElementById('btn-sets-soundcloud');
    const setsYoutube = document.getElementById('sets-youtube');
    const setsSoundcloud = document.getElementById('sets-soundcloud');
    const setsControlsContainer = document.getElementById('sets-controls');

    if (btnSetsYoutube && btnSetsSoundcloud && setsControlsContainer) {
        btnSetsYoutube.addEventListener('click', () => {
            btnSetsYoutube.classList.add('active');
            btnSetsSoundcloud.classList.remove('active');
            setsYoutube.classList.remove('hidden');
            setsSoundcloud.classList.add('hidden');

            updateSlider(setsControlsContainer, btnSetsYoutube);
        });

        btnSetsSoundcloud.addEventListener('click', () => {
            btnSetsSoundcloud.classList.add('active');
            btnSetsYoutube.classList.remove('active');
            setsSoundcloud.classList.remove('hidden');
            setsYoutube.classList.add('hidden');

            updateSlider(setsControlsContainer, btnSetsSoundcloud);
        });

        // Initialize default state styles (YouTube Active)
        // We use a timeout to ensure layout is ready for slider calculation
        setTimeout(() => updateSlider(setsControlsContainer, btnSetsYoutube), 100);
    }

    // Event Carousel & Video Autoplay
    const slides = document.querySelectorAll('.event-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    let currentSlide = 0;

    // Create indicators
    if (slides.length > 0 && indicatorsContainer) {
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
            indicatorsContainer.appendChild(dot);
        });
    }

    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
            const video = slide.querySelector('video');
            if (video) {
                video.pause();
                // video.currentTime = 0; // Optional: reset video
            }
        });

        // Update indicators
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        // Show active slide
        slides[index].classList.add('active');

        // Trigger observer check for the new active video
        const activeVideo = slides[index].querySelector('video');
        // The IntersectionObserver will automatically detect the visibility change
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
    }

    // Video Autoplay Observer
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            const slide = video.closest('.event-item');

            // Only play if the slide is active AND the video is intersecting
            if (slide && slide.classList.contains('active') && entry.isIntersecting) {
                video.play().catch(error => {
                    console.log("Autoplay prevented:", error);
                });
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.carousel-video').forEach(video => {
        videoObserver.observe(video);
    });

    // Gallery Filtering
    const galleryBtns = document.querySelectorAll('.gallery-controls .btn-toggle');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const presskitSubControls = document.getElementById('presskit-years');
    const presskitYearBtns = presskitSubControls ? presskitSubControls.querySelectorAll('.btn-toggle') : [];
    const motionsSubControls = document.getElementById('motions-categories');
    const motionsCategoryBtns = motionsSubControls ? motionsSubControls.querySelectorAll('.btn-toggle') : [];

    if (galleryBtns.length > 0 && galleryItems.length > 0) {

        // Color Map for Submenu Buttons
        const buttonColors = {
            '2025': 'linear-gradient(45deg, #0052D4, #4364F7, #6FB1FC)', // Blue
            '2024': 'linear-gradient(45deg, #006400, #008000, #00FF00)', // Dark Green
            '2023': 'linear-gradient(45deg, #CB2D3E, #EF473A)', // Red
            'festas': 'linear-gradient(45deg, #0052D4, #4364F7, #6FB1FC)', // Blue (matches 2025)
            'nikbass': 'linear-gradient(45deg, #FFD700, #FFA500)', // Gold
            'horus': 'linear-gradient(45deg, #CB2D3E, #EF473A)', // Red (matches 2023)
            'youtube': 'linear-gradient(45deg, #FF0000, #CC0000)', // YouTube Red
            'soundcloud': 'linear-gradient(45deg, #ff5500, #ff7700)', // SoundCloud Orange
            'spotify': 'linear-gradient(45deg, #1DB954, #1ED760)' // Spotify Green
        };

        function updateSlider(container, btn) {
            if (!container || !btn) return;
            const sliderBg = container.querySelector('.slider-bg');
            if (sliderBg) {
                sliderBg.style.width = `${btn.offsetWidth}px`;
                sliderBg.style.left = `${btn.offsetLeft}px`;

                // Update color if defined in map, otherwise default to gold
                const key = btn.getAttribute('data-category') || btn.getAttribute('data-year');
                if (key && buttonColors[key]) {
                    sliderBg.style.background = buttonColors[key];
                } else {
                    sliderBg.style.background = 'linear-gradient(45deg, #FFD700, #FFA500)';
                }

                // Update container theme class if it's a tracks-controls container
                if (container.classList.contains('tracks-controls')) {
                    container.classList.remove('theme-spotify', 'theme-soundcloud', 'theme-youtube');
                    if (key) {
                        container.classList.add(`theme-${key}`);
                    }
                }
            }
        }

        // Main Gallery Slider
        const mainGalleryContainer = document.querySelector('.gallery-controls');
        galleryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                galleryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                updateSlider(mainGalleryContainer, btn);

                const filterValue = btn.getAttribute('data-album');

                // Show/hide Baixar Fotos button
                const baixarFotosContainer = document.getElementById('baixar-fotos-container');
                const baixarFotosSelecaoContainer = document.getElementById('baixar-fotos-selecao-container');
                const baixarVideoContainer = document.getElementById('baixar-video-container');

                // Hide all buttons first
                if (baixarFotosContainer) baixarFotosContainer.style.display = 'none';
                if (baixarFotosSelecaoContainer) baixarFotosSelecaoContainer.style.display = 'none';
                if (baixarVideoContainer) baixarVideoContainer.style.display = 'none';

                // Show appropriate button based on active album
                if (filterValue === 'presskit' && baixarFotosContainer) {
                    baixarFotosContainer.style.display = 'block';
                } else if (filterValue === 'selecao' && baixarFotosSelecaoContainer) {
                    baixarFotosSelecaoContainer.style.display = 'block';
                } else if (filterValue === 'aftermovies' && baixarVideoContainer) {
                    baixarVideoContainer.style.display = 'block';
                }

                // Handle Sub-controls visibility and filtering
                if (filterValue === 'presskit') {
                    if (presskitSubControls) presskitSubControls.classList.remove('hidden');
                    if (motionsSubControls) motionsSubControls.classList.add('hidden');

                    // Reset/Init Presskit Slider
                    const activeYearBtn = presskitSubControls.querySelector('.btn-toggle.active') || presskitYearBtns[0];
                    if (activeYearBtn) {
                        // Small delay to ensure container is visible and layout is calculated
                        setTimeout(() => updateSlider(presskitSubControls, activeYearBtn), 10);
                    }

                    // Reset year filter to the first available year (e.g., 2025)
                    let activeYear = '2025';
                    if (presskitYearBtns.length > 0) {
                        // Ensure active class is correct if we reset
                        if (!presskitSubControls.querySelector('.btn-toggle.active')) {
                            presskitYearBtns.forEach(b => b.classList.remove('active'));
                            presskitYearBtns[0].classList.add('active');
                        }
                        activeYear = presskitSubControls.querySelector('.btn-toggle.active').getAttribute('data-year');
                    }
                    galleryItems.forEach(item => {
                        const video = item.querySelector('video');
                        if (item.getAttribute('data-album') === 'presskit' && item.getAttribute('data-year') === activeYear) {
                            item.classList.remove('hidden');
                            if (video) { video.muted = true; video.play().catch(e => console.log('Autoplay deferred', e)); }
                        } else {
                            item.classList.add('hidden');
                            if (video) video.pause();
                        }
                    });

                } else if (filterValue === 'motions') {
                    if (motionsSubControls) motionsSubControls.classList.remove('hidden');
                    if (presskitSubControls) presskitSubControls.classList.add('hidden');

                    // Reset/Init Motions Slider
                    const activeCategoryBtn = motionsSubControls.querySelector('.btn-toggle.active') || motionsCategoryBtns[0];
                    if (activeCategoryBtn) {
                        setTimeout(() => updateSlider(motionsSubControls, activeCategoryBtn), 10);
                    }

                    // Reset category filter to default (Festas)
                    let activeCategory = 'festas';
                    if (motionsCategoryBtns.length > 0) {
                        if (!motionsSubControls.querySelector('.btn-toggle.active')) {
                            motionsCategoryBtns.forEach(b => b.classList.remove('active'));
                            // Find Festas button or default to first
                            const defaultBtn = Array.from(motionsCategoryBtns).find(b => b.getAttribute('data-category') === 'festas') || motionsCategoryBtns[0];
                            defaultBtn.classList.add('active');
                        }
                        activeCategory = motionsSubControls.querySelector('.btn-toggle.active').getAttribute('data-category');
                    }

                    // Filter items by motions AND active category
                    galleryItems.forEach(item => {
                        const video = item.querySelector('video');
                        if (item.getAttribute('data-album') === 'motions' && item.getAttribute('data-category') === activeCategory) {
                            item.classList.remove('hidden');
                            if (video) { video.muted = true; video.play().catch(e => console.log('Autoplay deferred', e)); }
                        } else {
                            item.classList.add('hidden');
                            if (video) video.pause();
                        }
                    });

                } else {
                    if (presskitSubControls) presskitSubControls.classList.add('hidden');
                    if (motionsSubControls) motionsSubControls.classList.add('hidden');

                    // Normal filtering for other albums
                    galleryItems.forEach(item => {
                        const video = item.querySelector('video');
                        if (item.getAttribute('data-album') === filterValue) {
                            item.classList.remove('hidden');
                            if (video) {
                                video.muted = true; // Ensure muted for autoplay checks
                                video.play().catch(e => console.log('Video autoplay prevented:', e));
                            }
                        } else {
                            item.classList.add('hidden');
                            if (video) {
                                video.pause();
                            }
                        }
                    });
                }
            });
        });

        // Presskit Sub-controls Logic
        if (presskitYearBtns.length > 0) {
            presskitYearBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    presskitYearBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    updateSlider(presskitSubControls, btn);

                    const year = btn.getAttribute('data-year');

                    galleryItems.forEach(item => {
                        const video = item.querySelector('video');
                        if (item.getAttribute('data-album') === 'presskit') {
                            if (item.getAttribute('data-year') === year) {
                                item.classList.remove('hidden');
                                if (video) { video.muted = true; video.play().catch(e => console.log('Autoplay deferred', e)); }
                            } else {
                                item.classList.add('hidden');
                                if (video) video.pause();
                            }
                        }
                    });
                });
            });
        }

        // Motions Sub-controls Logic
        if (motionsCategoryBtns.length > 0) {
            motionsCategoryBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    motionsCategoryBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    updateSlider(motionsSubControls, btn);

                    const category = btn.getAttribute('data-category');

                    galleryItems.forEach(item => {
                        const video = item.querySelector('video');
                        if (item.getAttribute('data-album') === 'motions') {
                            if (item.getAttribute('data-category') === category) {
                                item.classList.remove('hidden');
                                if (video) { video.muted = true; video.play().catch(e => console.log('Autoplay deferred', e)); }
                            } else {
                                item.classList.add('hidden');
                                if (video) video.pause();
                            }
                        }
                    });
                });
            });
        }

        // Trigger click on the active button to set initial state
        const activeBtn = document.querySelector('.gallery-controls .btn-toggle.active');
        if (activeBtn) {
            activeBtn.click();
        }
    }

    // Gallery Video Play Overlay Logic
    const galleryVideos = document.querySelectorAll('.gallery-item video');
    galleryVideos.forEach(video => {
        video.addEventListener('play', () => {
            const item = video.closest('.gallery-item');
            if (item) item.classList.add('playing');
        });

        video.addEventListener('pause', () => {
            const item = video.closest('.gallery-item');
            if (item) item.classList.remove('playing');
        });

        video.addEventListener('ended', () => {
            const item = video.closest('.gallery-item');
            if (item) item.classList.remove('playing');
        });
    });

    // Sticker Rotation Logic (Crossfade & Non-Repeating)
    const stickerSlots = document.querySelectorAll('.sticker-slot');
    const totalStickers = 32;

    if (stickerSlots.length > 0) {
        // Generate array of all sticker filenames
        const stickerImages = [];
        for (let i = 1; i <= totalStickers; i++) {
            stickerImages.push(`img/galeria/adesivos/Arte NikBass_${i}.png`);
        }

        // Create a pool of indices [0, 1, ..., 31]
        let imagePool = Array.from({ length: totalStickers }, (_, i) => i);
        let poolIndex = 0;

        // Fisher-Yates Shuffle
        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        // Initial Shuffle
        shuffle(imagePool);

        // Helper to get next unique image index
        function getNextImageIndex() {
            if (poolIndex >= imagePool.length) {
                // Reshuffle when pool is exhausted
                shuffle(imagePool);
                poolIndex = 0;
            }
            return imagePool[poolIndex++];
        }

        // Initialize slots with unique images from the pool
        stickerSlots.forEach(slot => {
            const img1 = slot.querySelector('img');
            const uniqueIdx = getNextImageIndex(); // Get unique index

            // Setup first image
            img1.src = stickerImages[uniqueIdx];
            img1.alt = `Adesivo ${uniqueIdx + 1}`;
            img1.style.opacity = '1';
            img1.style.zIndex = '1';
            img1.classList.add('active');

            // Create second image (hidden)
            const img2 = img1.cloneNode(true);
            img2.style.opacity = '0';
            img2.style.zIndex = '2';
            img2.classList.remove('active');
            slot.appendChild(img2);
        });

        // Function to update a specific slot with crossfade
        function updateSlot(slot) {
            const activeImg = slot.querySelector('img.active');
            const nextImg = slot.querySelector('img:not(.active)');

            // Get next unique image from the global pool
            const uniqueIdx = getNextImageIndex();

            // Prepare next image
            nextImg.src = stickerImages[uniqueIdx];
            nextImg.alt = `Adesivo ${uniqueIdx + 1}`;

            // Crossfade
            nextImg.style.opacity = '1';
            activeImg.style.opacity = '0';

            // Swap active class
            activeImg.classList.remove('active');
            nextImg.classList.add('active');
        }

        // Start independent rotation for each slot with staggered timing
        const intervalDuration = 6000;
        const staggerDelay = intervalDuration / stickerSlots.length;

        stickerSlots.forEach((slot, index) => {
            const initialDelay = index * staggerDelay;

            setTimeout(() => {
                // Initial update
                updateSlot(slot);
                // Set interval for subsequent updates
                setInterval(() => {
                    updateSlot(slot);
                }, intervalDuration);
            }, initialDelay);
        });
    }

    // Presskit Menu Logic
    const presskitControls = document.querySelector('.presskit-controls');
    const presskitBtns = presskitControls ? presskitControls.querySelectorAll('.btn-toggle') : [];
    const presskitContents = document.querySelectorAll('.pk-tab-content');

    if (presskitControls && presskitBtns.length > 0) {
        // Initialize slider
        const activeBtn = presskitControls.querySelector('.btn-toggle.active');
        if (activeBtn) {
            setTimeout(() => updateSlider(presskitControls, activeBtn), 100);
        }

        presskitBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                presskitBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Update slider
                updateSlider(presskitControls, btn);

                // Show content
                const target = btn.getAttribute('data-target');
                presskitContents.forEach(content => {
                    const videos = content.querySelectorAll('video');
                    if (content.id === target) {
                        content.classList.remove('hidden');
                        videos.forEach(video => {
                            video.muted = true;
                            video.play().catch(e => console.log('Autoplay deferred', e));
                        });
                    } else {
                        content.classList.add('hidden');
                        videos.forEach(video => video.pause());
                    }
                });

                // Update active icon
                const icons = {
                    'pk-fotos': document.getElementById('icon-fotos'),
                    'pk-release': document.getElementById('icon-release'),
                    'pk-logos': document.getElementById('icon-logos'),
                    'pk-videos': document.getElementById('icon-videos'),
                    'pk-musicas': document.getElementById('icon-musicas')
                };

                Object.values(icons).forEach(icon => {
                    if (icon) icon.classList.remove('active');
                });

                if (icons[target]) {
                    icons[target].classList.add('active');
                }
            });
        });


        // Icon Click Logic
        const iconMap = {
            'icon-fotos': 'pk-fotos',
            'icon-release': 'pk-release',
            'icon-logos': 'pk-logos',
            'icon-videos': 'pk-videos',
            'icon-musicas': 'pk-musicas'
        };

        Object.keys(iconMap).forEach(iconId => {
            const icon = document.getElementById(iconId);
            if (icon) {
                icon.addEventListener('click', () => {
                    const targetId = iconMap[iconId];
                    const targetBtn = presskitControls.querySelector(`.btn-toggle[data-target="${targetId}"]`);
                    if (targetBtn) {
                        targetBtn.click();
                    }
                });
            }
        });
    }
    // Card Toggle Logic (Release/Bio inside card)
    const btnCardRelease = document.getElementById('btn-card-release');
    const btnCardBio = document.getElementById('btn-card-bio');
    const textRelease = document.getElementById('text-release');
    const textBio = document.getElementById('text-bio');

    if (btnCardRelease && btnCardBio && textRelease && textBio) {
        btnCardRelease.addEventListener('click', () => {
            btnCardRelease.classList.add('active');
            btnCardBio.classList.remove('active');
            textRelease.classList.remove('hidden');
            textBio.classList.add('hidden');
        });

        btnCardBio.addEventListener('click', () => {
            btnCardBio.classList.add('active');
            btnCardRelease.classList.remove('active');
            textBio.classList.remove('hidden');
            textRelease.classList.add('hidden');
        });
    }

    // Logo Sub-tab Logic
    const btnLogoNikbass = document.getElementById('btn-logo-nikbass');
    const btnLogoAgencia = document.getElementById('btn-logo-agencia');
    const contentLogoNikbass = document.getElementById('content-logo-nikbass');
    const contentLogoAgencia = document.getElementById('content-logo-agencia');

    if (btnLogoNikbass && btnLogoAgencia && contentLogoNikbass && contentLogoAgencia) {
        btnLogoNikbass.addEventListener('click', () => {
            btnLogoNikbass.classList.add('active');
            btnLogoAgencia.classList.remove('active');
            contentLogoNikbass.classList.remove('hidden');
            contentLogoAgencia.classList.add('hidden');
        });

        btnLogoAgencia.addEventListener('click', () => {
            btnLogoAgencia.classList.add('active');
            btnLogoNikbass.classList.remove('active');
            contentLogoAgencia.classList.remove('hidden');
            contentLogoNikbass.classList.add('hidden');
        });
    }

    // Fotos Sub-tab Logic
    const btnFotoFotos = document.getElementById('btn-foto-fotos');
    const btnFotoEventos = document.getElementById('btn-foto-eventos');
    const contentFotoFotos = document.getElementById('content-foto-fotos');
    const contentFotoEventos = document.getElementById('content-foto-eventos');

    if (btnFotoFotos && btnFotoEventos && contentFotoFotos && contentFotoEventos) {
        btnFotoFotos.addEventListener('click', () => {
            btnFotoFotos.classList.add('active');
            btnFotoEventos.classList.remove('active');
            contentFotoFotos.classList.remove('hidden');
            contentFotoEventos.classList.add('hidden');
        });

        btnFotoEventos.addEventListener('click', () => {
            btnFotoEventos.classList.add('active');
            btnFotoFotos.classList.remove('active');
            contentFotoEventos.classList.remove('hidden');
            contentFotoFotos.classList.add('hidden');
        });
    }

    // Ver Mais Fotos Button Logic
    const btnVerMaisFotos = document.getElementById('btn-ver-mais-fotos');
    if (btnVerMaisFotos) {
        btnVerMaisFotos.addEventListener('click', () => {
            const gallerySection = document.getElementById('gallery');

            // Check which sub-tab is active
            const btnFotoEventos = document.getElementById('btn-foto-eventos');
            const isTocandoActive = btnFotoEventos && btnFotoEventos.classList.contains('active');

            // Select the appropriate gallery button based on active sub-tab
            const targetAlbum = isTocandoActive ? 'selecao' : 'presskit';
            const galleryBtn = document.querySelector(`.gallery-controls .btn-toggle[data-album="${targetAlbum}"]`);

            if (gallerySection) {
                gallerySection.scrollIntoView({ behavior: 'smooth' });
            }

            if (galleryBtn) {
                galleryBtn.click();
            }
        });
    }

    // Contact Link to Gallery Selection Logic
    const linkContactGallery = document.getElementById('link-contact-gallery');
    if (linkContactGallery) {
        linkContactGallery.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor jump to allow smooth scroll and button click
            const gallerySection = document.getElementById('gallery');
            const galleryBtnSelecao = document.querySelector('.gallery-controls .btn-toggle[data-album="selecao"]');

            if (gallerySection) {
                gallerySection.scrollIntoView({ behavior: 'smooth' });
            }

            if (galleryBtnSelecao) {
                // Click the button to switch the gallery
                galleryBtnSelecao.click();
            }
        });
    }

    // Ver Mais Videos Button Logic
    const btnVerMaisVideos = document.getElementById('btn-ver-mais-videos');
    if (btnVerMaisVideos) {
        btnVerMaisVideos.addEventListener('click', (e) => {
            e.preventDefault();
            const gallerySection = document.getElementById('gallery');
            const galleryBtnAfterMovies = document.querySelector('.gallery-controls .btn-toggle[data-album="aftermovies"]');

            if (gallerySection) {
                gallerySection.scrollIntoView({ behavior: 'smooth' });
            }

            if (galleryBtnAfterMovies) {
                galleryBtnAfterMovies.click();
            }
        });
    }

    // Baixar Fotos/Video Buttons Logic
    const btnBaixarFotosPresskit = document.getElementById('btn-baixar-fotos-presskit');
    const btnBaixarFotosSelecao = document.getElementById('btn-baixar-fotos-selecao');
    const btnBaixarVideo = document.getElementById('btn-baixar-video');

    // Baixar Fotos (Presskit and Seleção) - Navigate to Presskit > Fotos tab
    if (btnBaixarFotosPresskit) {
        btnBaixarFotosPresskit.addEventListener('click', () => {
            const presskitSection = document.getElementById('presskit');
            const btnPkFotos = document.querySelector('.presskit-controls .btn-toggle[data-target="pk-fotos"]');

            if (presskitSection) {
                presskitSection.scrollIntoView({ behavior: 'smooth' });
            }

            if (btnPkFotos) {
                btnPkFotos.click();
            }
        });
    }

    if (btnBaixarFotosSelecao) {
        btnBaixarFotosSelecao.addEventListener('click', () => {
            const presskitSection = document.getElementById('presskit');
            const btnPkFotos = document.querySelector('.presskit-controls .btn-toggle[data-target="pk-fotos"]');

            if (presskitSection) {
                presskitSection.scrollIntoView({ behavior: 'smooth' });
            }

            if (btnPkFotos) {
                btnPkFotos.click();
            }
        });
    }

    // Baixar Vídeo (After Movies) - Navigate to Presskit > Videos tab
    if (btnBaixarVideo) {
        btnBaixarVideo.addEventListener('click', () => {
            const presskitSection = document.getElementById('presskit');
            const btnPkVideos = document.querySelector('.presskit-controls .btn-toggle[data-target="pk-videos"]');

            if (presskitSection) {
                presskitSection.scrollIntoView({ behavior: 'smooth' });
            }

            if (btnPkVideos) {
                btnPkVideos.click();
            }
        });
    }
});

// Parallax effect for hero video background
window.addEventListener('scroll', () => {
    const heroVideo = document.querySelector('.hero-video-bg');
    if (heroVideo) {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5; // Adjust this value for more/less parallax effect
        heroVideo.style.transform = `translate(-50%, calc(-50% + ${scrolled * parallaxSpeed}px))`;
    }
});

// Agenda slideshow auto-rotation
const agendaImg1 = document.getElementById('agenda-img-1');
const agendaImg2 = document.getElementById('agenda-img-2');

if (agendaImg1 && agendaImg2) {
    let currentAgendaImg = 1;

    setInterval(() => {
        if (currentAgendaImg === 1) {
            agendaImg1.style.display = 'none';
            agendaImg2.style.display = 'block';
            currentAgendaImg = 2;
        } else {
            agendaImg2.style.display = 'none';
            agendaImg1.style.display = 'block';
            currentAgendaImg = 1;
        }
    }, 3000); // Change every 3 seconds
}

// Brand Identity Interactive Viewer
const brandCategoryBtns = document.querySelectorAll('.brand-category-btn');
const brandVariationBtns = document.querySelectorAll('.brand-variation-btn');
const brandColorBtns = document.querySelectorAll('.brand-color-btn');
const brandEffectBtns = document.querySelectorAll('.brand-effect-option');
const brandDisplayImg = document.getElementById('brand-display-img');
const brandVariationControls = document.getElementById('brand-variation-controls');

// Current state
let currentCategory = 'logo';
let currentVariation = 'v1';
let currentColor = 'branco';
let currentEffect = 'sem-efeito';

// Image mapping
const brandImages = {
    'sem-efeito': {
        logo: {
            'branco': 'img/brand/sem-efeito/logo/1.png',
            'azul-turquesa': 'img/brand/sem-efeito/logo/2.png',
            'preto-azul': 'img/brand/sem-efeito/logo/3.png',
            'preto': 'img/brand/sem-efeito/logo/4.png',
            'rosa-preto': 'img/brand/sem-efeito/logo/5.png',
            'rosa-azul': 'img/brand/sem-efeito/logo/6.png',
            'dourado': 'img/brand/sem-efeito/logo/7.png'
        },
        tipografia: {
            v1: {
                'branco': 'img/brand/sem-efeito/tipo/v1/1.png',
                'azul-turquesa': 'img/brand/sem-efeito/tipo/v1/2.png',
                'preto-azul': 'img/brand/sem-efeito/tipo/v1/3.png',
                'preto': 'img/brand/sem-efeito/tipo/v1/4.png',
                'rosa-preto': 'img/brand/sem-efeito/tipo/v1/5.png',
                'rosa-azul': 'img/brand/sem-efeito/tipo/v1/6.png',
                'dourado': 'img/brand/sem-efeito/tipo/v1/7.png'
            },
            v2: {
                'branco': 'img/brand/sem-efeito/tipo/v2/1.png',
                'azul-turquesa': 'img/brand/sem-efeito/tipo/v2/2.png',
                'preto-azul': 'img/brand/sem-efeito/tipo/v2/3.png',
                'preto': 'img/brand/sem-efeito/tipo/v2/4.png',
                'rosa-preto': 'img/brand/sem-efeito/tipo/v2/5.png',
                'rosa-azul': 'img/brand/sem-efeito/tipo/v2/6.png',
                'dourado': 'img/brand/sem-efeito/tipo/v2/7.png'
            },
            v3: {
                'branco': 'img/brand/sem-efeito/tipo/v3/1.png',
                'azul-turquesa': 'img/brand/sem-efeito/tipo/v3/2.png',
                'preto-azul': 'img/brand/sem-efeito/tipo/v3/3.png',
                'preto': 'img/brand/sem-efeito/tipo/v3/4.png',
                'rosa-preto': 'img/brand/sem-efeito/tipo/v3/5.png',
                'rosa-azul': 'img/brand/sem-efeito/tipo/v3/6.png',
                'dourado': 'img/brand/sem-efeito/tipo/v3/7.png'
            },
            v4: {
                'branco': 'img/brand/sem-efeito/tipo/v4/1.png',
                'azul-turquesa': 'img/brand/sem-efeito/tipo/v4/2.png',
                'preto-azul': 'img/brand/sem-efeito/tipo/v4/3.png',
                'preto': 'img/brand/sem-efeito/tipo/v4/4.png',
                'rosa-preto': 'img/brand/sem-efeito/tipo/v4/5.png',
                'rosa-azul': 'img/brand/sem-efeito/tipo/v4/6.png',
                'dourado': 'img/brand/sem-efeito/tipo/v4/7.png'
            }
        }
    },
    'com-efeito': {
        logo: {
            'branco': 'img/brand/com-efeito/logo/1.png',
            'azul-turquesa': 'img/brand/com-efeito/logo/2.png',
            'preto-azul': 'img/brand/com-efeito/logo/3.png',
            'preto': 'img/brand/com-efeito/logo/4.png',
            'rosa-preto': 'img/brand/com-efeito/logo/5.png',
            'rosa-azul': 'img/brand/com-efeito/logo/6.png',
            'dourado': 'img/brand/com-efeito/logo/7.png'
        },
        tipografia: {
            v1: {
                'branco': 'img/brand/com-efeito/tipo/v1/1.png',
                'azul-turquesa': 'img/brand/com-efeito/tipo/v1/2.png',
                'preto-azul': 'img/brand/com-efeito/tipo/v1/3.png',
                'preto': 'img/brand/com-efeito/tipo/v1/4.png',
                'rosa-preto': 'img/brand/com-efeito/tipo/v1/5.png',
                'rosa-azul': 'img/brand/com-efeito/tipo/v1/6.png',
                'dourado': 'img/brand/com-efeito/tipo/v1/7.png'
            },
            v2: {
                'branco': 'img/brand/com-efeito/tipo/v2/1.png',
                'azul-turquesa': 'img/brand/com-efeito/tipo/v2/2.png',
                'preto-azul': 'img/brand/com-efeito/tipo/v2/3.png',
                'preto': 'img/brand/com-efeito/tipo/v2/4.png',
                'rosa-preto': 'img/brand/com-efeito/tipo/v2/5.png',
                'rosa-azul': 'img/brand/com-efeito/tipo/v2/6.png',
                'dourado': 'img/brand/com-efeito/tipo/v2/7.png'
            },
            v3: {
                'branco': 'img/brand/com-efeito/tipo/v3/1.png',
                'azul-turquesa': 'img/brand/com-efeito/tipo/v3/2.png',
                'preto-azul': 'img/brand/com-efeito/tipo/v3/3.png',
                'preto': 'img/brand/com-efeito/tipo/v3/4.png',
                'rosa-preto': 'img/brand/com-efeito/tipo/v3/5.png',
                'rosa-azul': 'img/brand/com-efeito/tipo/v3/6.png',
                'dourado': 'img/brand/com-efeito/tipo/v3/7.png'
            },
            v4: {
                'branco': 'img/brand/com-efeito/tipo/v4/1.png',
                'azul-turquesa': 'img/brand/com-efeito/tipo/v4/2.png',
                'preto-azul': 'img/brand/com-efeito/tipo/v4/3.png',
                'preto': 'img/brand/com-efeito/tipo/v4/4.png',
                'rosa-preto': 'img/brand/com-efeito/tipo/v4/5.png',
                'rosa-azul': 'img/brand/com-efeito/tipo/v4/6.png',
                'dourado': 'img/brand/com-efeito/tipo/v4/7.png'
            }
        }
    }
};

// Function to update image
function updateBrandImage() {
    let mainSrc = '';
    // Main display image follows currentEffect
    if (currentCategory === 'logo') {
        mainSrc = brandImages[currentEffect].logo[currentColor];
        brandDisplayImg.classList.remove('typography-active');
    } else if (currentCategory === 'tipografia') {
        mainSrc = brandImages[currentEffect].tipografia[currentVariation][currentColor];
        brandDisplayImg.classList.add('typography-active');
    }

    if (mainSrc) {
        brandDisplayImg.src = mainSrc;
    }

    // Update ALL category buttons icons
    const categoryBtns = document.querySelectorAll('.brand-category-btn');
    categoryBtns.forEach(btn => {
        const category = btn.getAttribute('data-category');
        let iconSrc = '';

        // Always use 'branco' (white) icon to ensure we get the filled/flat shape
        // The color will be applied via CSS drop-shadow filter using --anim-color
        let iconColor = 'branco';

        if (category === 'logo') {
            iconSrc = brandImages['sem-efeito'].logo[iconColor];
        } else if (category === 'tipografia') {
            // Use saved variation for typography
            iconSrc = brandImages['sem-efeito'].tipografia[savedTypographyVariation][iconColor];
        }

        if (iconSrc) {
            const icon = btn.querySelector('img');
            if (icon) {
                icon.src = iconSrc;
            }
        }
    });
}

// Category button click handler
brandCategoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active from all category buttons
        brandCategoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        currentCategory = btn.getAttribute('data-category');

        // Reset variation buttons logic
        brandVariationBtns.forEach(vBtn => vBtn.classList.remove('active'));

        if (currentCategory === 'logo') {
            // Logo always uses V1 (default)
            currentVariation = 'v1';
            brandVariationBtns[0].classList.add('active');

            // Show only V1, hide others
            brandVariationBtns.forEach((btn, index) => {
                if (index === 0) btn.style.display = 'block';
                else btn.style.display = 'none';
            });
        } else if (currentCategory === 'tipografia') {
            // Restore saved variation for typography
            currentVariation = savedTypographyVariation;

            // Find button for saved variation and make active
            const savedBtn = document.querySelector(`.brand-variation-btn[data-variation="${savedTypographyVariation}"]`);
            if (savedBtn) savedBtn.classList.add('active');
            else brandVariationBtns[0].classList.add('active'); // Fallback

            // Show all variations
            brandVariationBtns.forEach(btn => btn.style.display = 'block');
        }

        // Initialize slider for variation controls
        // Initialize slider for variation controls with correct color
        setTimeout(() => {
            let targetColor = 'gold';
            const colorMap = {
                'branco': '#ffffff',
                'preto': '#333333',
                'preto-azul': '#1E90FF',
                'azul-turquesa': '#40E0D0',
                'rosa-azul': '#FF69B4',
                'rosa-preto': '#FF1493',
                'dourado': '#FFD700'
            };

            if (currentColor === 'preto') {
                targetColor = 'white';
            } else if (currentColor === 'branco') {
                targetColor = 'gold';
            } else if (colorMap[currentColor]) {
                targetColor = colorMap[currentColor];
            }

            // Find the currently active button to set the slider position correctly
            const activeVarBtn = document.querySelector('.brand-variation-btn.active') || brandVariationBtns[0];
            updateBrandToggle(brandVariationControls, activeVarBtn, targetColor);
        }, 50);

        updateBrandImage();
    });
});

// Dedicated function for brand toggle slider
function updateBrandToggle(container, btn, color = 'gold') {
    const slider = container.querySelector('.slider-bg');
    if (slider && btn) {
        slider.style.width = `${btn.offsetWidth}px`;
        slider.style.left = `${btn.offsetLeft}px`;

        if (color === 'white') {
            slider.style.background = 'linear-gradient(45deg, #ffffff, #e0e0e0)';
            container.style.setProperty('--anim-color', 'white');
        } else if (color === 'gold') {
            slider.style.background = 'linear-gradient(45deg, #FFD700, #FFA500)';
            container.style.setProperty('--anim-color', '#FFD700');
        } else {
            // Assume it's a hex code or other valid color
            slider.style.background = color;
            container.style.setProperty('--anim-color', color);
        }
    }
}

let savedTypographyVariation = 'v1'; // Default saved variation

// Variation button click handler
brandVariationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active from all variation buttons
        brandVariationBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Determine color based on current selection
        let targetColor = 'gold';
        const colorMap = {
            'branco': '#ffffff',
            'preto': '#333333',
            'preto-azul': '#1E90FF',
            'azul-turquesa': '#40E0D0',
            'rosa-azul': '#FF69B4',
            'rosa-preto': '#FF1493',
            'dourado': '#FFD700'
        };

        if (currentColor === 'preto') {
            targetColor = 'white';
        } else if (currentColor === 'branco') {
            targetColor = 'gold';
        } else if (colorMap[currentColor]) {
            targetColor = colorMap[currentColor];
        }

        updateBrandToggle(btn.parentElement, btn, targetColor);

        currentVariation = btn.getAttribute('data-variation');

        // Save variation if we are in typography mode
        if (currentCategory === 'tipografia') {
            savedTypographyVariation = currentVariation;
        }

        updateBrandImage();
    });
});

// Color button click handler
brandColorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active from all color buttons
        brandColorBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        currentColor = btn.getAttribute('data-color');

        // Update container border color
        const colorMap = {
            'branco': '#ffffff',
            'preto': '#333333',
            'preto-azul': '#1E90FF',
            'azul-turquesa': '#40E0D0',
            'rosa-azul': '#FF69B4',
            'rosa-preto': '#FF1493',
            'dourado': '#FFD700'
        };

        const container = document.querySelector('.brand-color-controls');
        if (container && colorMap[currentColor]) {
            container.style.setProperty('--anim-color', colorMap[currentColor]);
        }

        // Sync variation controls color
        const variationContainer = document.querySelector('#brand-variation-controls');
        const activeVarBtn = variationContainer.querySelector('.brand-variation-btn.active');

        let targetColor = 'gold'; // Default

        if (currentColor === 'preto') {
            targetColor = 'white';
        } else if (currentColor === 'branco') {
            targetColor = 'gold';
        } else if (colorMap[currentColor]) {
            targetColor = colorMap[currentColor];
        }

        if (variationContainer && activeVarBtn) {
            updateBrandToggle(variationContainer, activeVarBtn, targetColor);
        }

        // Sync effect toggle color if "com-efeito" is active
        const effectContainer = document.querySelector('.brand-toggle-container'); // Assuming first one is effect
        // Better selector: find the container that has brand-effect-option
        const activeEffectBtn = document.querySelector('.brand-effect-option.active');

        if (activeEffectBtn && activeEffectBtn.getAttribute('data-effect') === 'com-efeito') {
            // For effect toggle, we might want to keep gold for black/white to distinguish from "sem-efeito" (white)
            // Or use the same logic. Let's use gold for black/white to be safe and distinct.
            let effectColor = 'gold';
            if (currentColor !== 'preto' && currentColor !== 'branco' && colorMap[currentColor]) {
                effectColor = colorMap[currentColor];
            }
            updateBrandToggle(activeEffectBtn.parentElement, activeEffectBtn, effectColor);
        }

        // Sync category buttons color
        const categoryBtns = document.querySelectorAll('.brand-category-btn');
        let categoryColor = 'gold'; // Default
        if (currentColor === 'preto' || currentColor === 'branco') {
            categoryColor = 'white'; // Use white for contrast on black/white selections
        } else if (colorMap[currentColor]) {
            categoryColor = colorMap[currentColor];
        }

        categoryBtns.forEach(btn => {
            btn.style.setProperty('--anim-color', categoryColor);
        });

        updateBrandImage();
    });
});

// Effect button click handler
brandEffectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active from all effect buttons
        brandEffectBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const effect = btn.getAttribute('data-effect');
        let color = 'white'; // Default for sem-efeito

        if (effect === 'com-efeito') {
            color = 'gold'; // Default
            // Use current color mapping if available (except black/white which stay gold)
            const colorMap = {
                'branco': '#ffffff',
                'preto': '#333333',
                'preto-azul': '#1E90FF',
                'azul-turquesa': '#40E0D0',
                'rosa-azul': '#FF69B4',
                'rosa-preto': '#FF1493',
                'dourado': '#FFD700'
            };

            if (currentColor !== 'preto' && currentColor !== 'branco' && colorMap[currentColor]) {
                color = colorMap[currentColor];
            }
        }

        updateBrandToggle(btn.parentElement, btn, color);

        currentEffect = effect;
        updateBrandImage();
    });
});

// Initialize sliders
const activeEffectBtn = document.querySelector('.brand-effect-option.active');
if (activeEffectBtn) {
    // Small delay to ensure layout is ready
    // Default to white for initial state (sem-efeito)
    setTimeout(() => updateBrandToggle(activeEffectBtn.parentElement, activeEffectBtn, 'white'), 100);
}

// Initialize variation buttons for default category (logo)
if (currentCategory === 'logo') {
    brandVariationBtns.forEach((btn, index) => {
        if (index === 0) btn.style.display = 'block';
        else btn.style.display = 'none';
    });
    // Initialize slider for variation controls
    setTimeout(() => updateBrandToggle(brandVariationControls, brandVariationBtns[0], 'gold'), 100);
}

// Re-calculate on window resize to keep slider correct
window.addEventListener('resize', () => {
    const activeVarBtn = document.querySelector('.brand-variation-btn.active');
    if (activeVarBtn && !brandVariationControls.classList.contains('hidden')) {
        updateBrandToggle(brandVariationControls, activeVarBtn, 'gold');
    }

    const activeEffBtn = document.querySelector('.brand-effect-option.active');
    if (activeEffBtn) {
        const effect = activeEffBtn.getAttribute('data-effect');
        const color = effect === 'sem-efeito' ? 'white' : 'gold';
        updateBrandToggle(activeEffBtn.parentElement, activeEffBtn, color);
    }
});

// Force Video Autoplay Logic
document.addEventListener('DOMContentLoaded', function () {
    const heroVideo = document.querySelector('.hero-video-bg');
    if (heroVideo) {
        console.log('Attempting to play hero video...');
        heroVideo.muted = true; // Ensure muted
        heroVideo.play().then(() => {
            console.log('Hero video playing.');
        }).catch(error => {
            console.error('Hero video autoplay failed:', error);
            // Fallback on interaction
            const playOnInteraction = () => {
                heroVideo.play();
                document.removeEventListener('click', playOnInteraction);
                document.removeEventListener('touchstart', playOnInteraction);
            };
            document.addEventListener('click', playOnInteraction);
            document.addEventListener('touchstart', playOnInteraction);
        });
    }
});
