const galleries = {
    besties: [
        '../besties/MGX_4821.jpg',
        '../besties/MGX_4824.jpg',
        '../besties/MGX_4858.jpg',
        '../besties/MGX_4988.jpg',
        '../besties/MGX_5076.jpg',
        '../besties/MGX_5228.jpg',
        '../besties/MGX_5236.jpg',
        '../besties/MGX_5247.jpg',
        '../besties/MGX_5271.jpg',
        '../besties/MGX_5367.jpg',
        '../besties/MGX_5465.jpg',
        '../besties/MGX_5662.jpg',
        '../besties/MGX_5685.jpg',
        '../besties/MGX_5710.jpg',
        '../besties/MGX_5715.jpg',
        '../besties/MGX_5724.jpg',
        '../besties/MGX_5748.jpg'
    ],
    family: [
        '../family/FB_IMG_1776668383662.jpg',
        '../family/IMG_1250.JPG',
        '../family/IMG_1251.JPG',
        '../family/IMG_1255.JPG',
        '../family/IMG_1262.JPG',
        '../family/IMG_1265.JPG',
        '../family/IMG_1268.JPG',
        '../family/IMG_1269.JPG',
        '../family/IMG_1281.JPG',
        '../family/IMG_1282.JPG',
        '../family/IMG_1286.JPG'
    ],
    friends: [
        '../friends/IMG_1259.JPG',
        '../friends/IMG_1263.JPG',
        '../friends/IMG_1324.JPG',
        '../friends/IMG_1326 (1).JPG',
        '../friends/IMG_1330 (1).JPG',
        '../friends/IMG_1374.JPG',
        '../friends/IMG_1376.JPG',
        '../friends/IMG_1385.JPG',
        '../friends/IMG_1410.JPG',
        '../friends/IMG_1412.JPG',
        '../friends/IMG_1432.JPG',
        '../friends/retouch_2026041911135056.jpg',
        '../friends/retouch_2026041911161906.jpg',
        '../friends/retouch_2026041911180585.jpg',
        '../friends/retouch_2026041911195521.jpg',
        '../friends/retouch_2026041911221875.jpg',
        '../friends/retouch_2026041911233806.jpg',
        '../friends/retouch_2026041911260420.jpg',
        '../friends/retouch_2026041911281461.jpg',
        '../friends/retouch_2026041911370920.jpg',
        '../friends/retouch_2026041911423137.jpg',
        '../friends/retouch_2026041911484045.jpg',
        '../friends/retouch_2026041911504902.jpg',
        '../friends/retouch_2026041911543162.jpg',
        '../friends/retouch_2026041911591632.jpg',
        '../friends/retouch_2026041912011612.jpg',
        '../friends/retouch_2026041912065740.jpg',
        '../friends/retouch_2026041912082007.jpg',
        '../friends/retouch_2026041912131125.jpg',
        '../friends/retouch_2026041912151582.jpg',
        '../friends/retouch_2026041912213175.jpg',
        '../friends/retouch_2026041912243164.jpg',
        '../friends/retouch_2026041912271195.jpg',
        '../friends/retouch_2026041912311457.jpg',
        '../friends/retouch_2026041912322835.jpg',
        '../friends/retouch_2026041912345812.jpg',
        '../friends/retouch_2026041912382120.jpg',
        '../friends/retouch_2026041912394317.jpg',
        '../friends/retouch_2026041913081665.jpg'
    ],
    gifts: [
        '../gifts/IMG_1503.JPG',
        '../gifts/IMG_1513.JPG',
        '../gifts/IMG_1538.JPG',
        '../gifts/IMG_1540.JPG',
        '../gifts/IMG_1552.JPG',
        '../gifts/IMG_1556.JPG',
        '../gifts/IMG_1560.JPG',
        '../gifts/IMG_1578.JPG',
        '../gifts/IMG_1580.JPG',
        '../gifts/IMG_1585.JPG',
        '../gifts/IMG_1588.JPG',
        '../gifts/IMG_1590.JPG',
        '../gifts/IMG_1591.JPG',
        '../gifts/IMG_1595.JPG',
        '../gifts/IMG_1596.JPG'
    ],
    princess: [
        '../princess/IMG_1252.JPG',
        '../princess/IMG_1273.JPG',
        '../princess/IMG_1275.JPG',
        '../princess/IMG_1319.JPG',
        '../princess/IMG_1343.JPG',
        '../princess/IMG_1344.JPG',
        '../princess/IMG_1358.JPG',
        '../princess/IMG_1361.JPG',
        '../princess/IMG_1362.JPG',
        '../princess/IMG_1364.JPG',
        '../princess/IMG_1368.JPG',
        '../princess/IMG_1372.JPG',
        '../princess/IMG_1414.JPG',
        '../princess/IMG_6801.JPG',
        '../princess/MGX_4563.jpg',
        '../princess/MGX_4586.jpg',
        '../princess/MGX_4622.jpg',
        '../princess/MGX_5641.jpg',
        '../princess/MGX_5803.jpg',
        '../princess/retouch_2026041912423638.jpg',
        '../princess/retouch_2026042823544981.jpg',
        '../princess/_DSC9178.JPG',
        '../princess/_DSC9190.JPG'
    ],
    us: [
        '../us/photo-photo_1775912558712_filtered.jpg.jpg'
    ]
};

const galleryLabels = {
    besties: 'Besties',
    family: 'Family',
    friends: 'Friends',
    gifts: 'Gifts',
    princess: 'Princess',
    us: 'To you, my love'
};

const VISIBLE_OFFSETS = [0, -1, 1, -2, 2];
const PRELOAD_OFFSETS = [0, 1, -1, 2, -2];
const TRANSITION_TIME = 240;
const LOADING_FALLBACK_TIME = 1100;
const US_PASSWORD = '12092025';
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const carousel = document.querySelector('.carousel');
const list = document.querySelector('.list');
const menuScreen = document.querySelector('.menu-screen');
const galleryShell = document.querySelector('.gallery-shell');
const menuButtons = document.querySelectorAll('[data-gallery]');
const backButton = document.querySelector('.back-button');
const activeGalleryTitle = document.querySelector('.active-gallery-title');
const passwordPanel = document.querySelector('.password-panel');
const passwordForm = document.querySelector('.password-box');
const passwordInput = document.querySelector('#us-password');
const passwordError = document.querySelector('.password-error');
const passwordClose = document.querySelector('.password-close');
const galleryLoader = document.querySelector('.gallery-loader');

let activeGallery = 'besties';
let activeIndex = 0;
let transitionTimeout;
let isAnimating = false;
let currentMenuButton = null;
let pendingProtectedButton = null;
let loadingToken = 0;
const imageCache = new Map();

function getWrappedIndex(images, index) {
    return (index + images.length) % images.length;
}

function getPositionClass(offset) {
    if (offset === -2) {
        return 'is-far-prev';
    }

    if (offset === -1) {
        return 'is-prev';
    }

    if (offset === 0) {
        return 'is-active';
    }

    if (offset === 1) {
        return 'is-next';
    }

    if (offset === 2) {
        return 'is-far-next';
    }

    return 'is-hidden';
}

function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

function preloadImage(src) {
    if (!src) {
        return Promise.resolve();
    }

    if (imageCache.has(src)) {
        return imageCache.get(src);
    }

    const image = new Image();
    image.decoding = 'async';
    image.src = src;

    const promise = image.decode
        ? image.decode().catch(() => undefined)
        : new Promise((resolve) => {
            image.onload = resolve;
            image.onerror = resolve;
        });

    imageCache.set(src, promise);
    return promise;
}

function preloadGalleryImages(galleryName, centerIndex = 0, limit = 3) {
    const images = galleries[galleryName] || [];

    if (!images.length || galleryName === 'us') {
        return [];
    }

    return PRELOAD_OFFSETS.slice(0, limit).map((offset) => {
        const imageIndex = getWrappedIndex(images, centerIndex + offset);
        return preloadImage(images[imageIndex]);
    });
}

function scheduleGalleryWarmup(galleryName, limit = 3) {
    if (galleryName === 'us') {
        return;
    }

    const warmup = () => preloadGalleryImages(galleryName, 0, limit);

    if ('requestIdleCallback' in window) {
        window.requestIdleCallback(warmup, { timeout: 1600 });
        return;
    }

    setTimeout(warmup, 240);
}

function scheduleMenuWarmups() {
    if (navigator.connection?.saveData) {
        return;
    }

    Object.keys(galleries).forEach((galleryName, index) => {
        if (galleryName === 'us') {
            return;
        }

        setTimeout(() => {
            preloadGalleryImages(galleryName, 0, 2);
        }, 600 + index * 420);
    });
}

function setGalleryLoading(isLoading) {
    galleryShell.classList.toggle('is-loading', isLoading);
    galleryLoader.setAttribute('aria-hidden', String(!isLoading));
}

function createSlide(imageSrc, galleryKey, index, offset) {
    const item = document.createElement('button');
    const image = document.createElement('img');

    item.className = `item ${getPositionClass(offset)}`;
    item.type = 'button';
    item.dataset.index = index;
    item.tabIndex = Math.abs(offset) <= 1 ? 0 : -1;
    item.setAttribute('aria-label', `Show ${galleryLabels[galleryKey]} photo ${index + 1}`);
    item.toggleAttribute('aria-current', offset === 0);

    image.src = imageSrc;
    image.alt = `${galleryLabels[galleryKey]} photo ${index + 1}`;
    image.decoding = 'async';
    image.draggable = false;
    image.fetchPriority = offset === 0 ? 'high' : 'low';
    image.loading = Math.abs(offset) <= 1 ? 'eager' : 'lazy';

    item.appendChild(image);

    item.addEventListener('click', () => {
        if (index !== activeIndex) {
            setActiveIndex(index, offset < 0 ? 'prev' : 'next');
        }
    });

    return item;
}

function preloadNearbyImages() {
    const images = galleries[activeGallery] || [];

    if (!images.length) {
        return;
    }

    PRELOAD_OFFSETS.forEach((offset) => {
        preloadImage(images[getWrappedIndex(images, activeIndex + offset)]);
    });
}

function renderVisibleSlides() {
    const images = galleries[activeGallery] || [];
    const usedIndexes = new Set();

    list.textContent = '';

    if (!images.length) {
        nextBtn.disabled = true;
        prevBtn.disabled = true;
        return;
    }

    VISIBLE_OFFSETS.forEach((offset) => {
        const imageIndex = getWrappedIndex(images, activeIndex + offset);

        if (usedIndexes.has(imageIndex)) {
            return;
        }

        usedIndexes.add(imageIndex);
        list.appendChild(createSlide(images[imageIndex], activeGallery, imageIndex, offset));
    });

    const hasMultipleImages = images.length > 1;
    nextBtn.disabled = !hasMultipleImages;
    prevBtn.disabled = !hasMultipleImages;
    preloadNearbyImages();
}

function renderGallery(galleryName) {
    activeGallery = galleryName;
    activeIndex = 0;
    isAnimating = false;
    clearTimeout(transitionTimeout);
    list.textContent = '';
    carousel.classList.remove('is-changing', 'is-moving-next', 'is-moving-prev');
    galleryShell.classList.toggle('is-postcard', galleryName === 'us');
    activeGalleryTitle.textContent = galleryLabels[galleryName];

    if (galleryName === 'us') {
        nextBtn.disabled = true;
        prevBtn.disabled = true;
    } else {
        renderVisibleSlides();
    }

    menuButtons.forEach((button) => {
        button.classList.toggle('active', button.dataset.gallery === galleryName);
    });
}

function openGallery(galleryName, triggerButton) {
    const images = galleries[galleryName] || [];
    const openToken = ++loadingToken;

    currentMenuButton = triggerButton;
    setGalleryLoading(galleryName !== 'us');
    renderGallery(galleryName);
    menuScreen.classList.add('is-hidden');
    passwordPanel.classList.remove('is-open');
    passwordPanel.setAttribute('aria-hidden', 'true');
    galleryShell.classList.add('is-open');
    galleryShell.setAttribute('aria-hidden', 'false');
    backButton.focus({ preventScroll: true });

    if (galleryName === 'us' || !images.length) {
        setGalleryLoading(false);
        return;
    }

    Promise.race([
        preloadImage(images[0]),
        wait(LOADING_FALLBACK_TIME)
    ]).then(() => {
        if (loadingToken === openToken) {
            setGalleryLoading(false);
        }
    });

    preloadGalleryImages(galleryName, 0, 5);
}

function openPasswordPanel(triggerButton) {
    pendingProtectedButton = triggerButton;
    passwordInput.value = '';
    passwordError.textContent = '';
    passwordPanel.classList.add('is-open');
    passwordPanel.setAttribute('aria-hidden', 'false');
    passwordInput.focus();
}

function closePasswordPanel() {
    passwordPanel.classList.remove('is-open');
    passwordPanel.setAttribute('aria-hidden', 'true');
    passwordError.textContent = '';

    if (pendingProtectedButton) {
        pendingProtectedButton.focus();
    }
}

function closeGallery() {
    loadingToken += 1;
    clearTimeout(transitionTimeout);
    isAnimating = false;
    list.textContent = '';
    carousel.classList.remove('is-changing', 'is-moving-next', 'is-moving-prev');
    galleryShell.classList.remove('is-postcard');
    galleryShell.classList.remove('is-open');
    setGalleryLoading(false);
    galleryShell.setAttribute('aria-hidden', 'true');
    menuScreen.classList.remove('is-hidden');

    if (currentMenuButton) {
        currentMenuButton.focus();
    }
}

function setActiveIndex(index, direction) {
    const images = galleries[activeGallery] || [];

    if (images.length < 2 || isAnimating) {
        return;
    }

    isAnimating = true;
    activeIndex = getWrappedIndex(images, index);
    preloadImage(images[activeIndex]);
    carousel.classList.remove('is-moving-next', 'is-moving-prev');
    carousel.classList.add('is-changing', `is-moving-${direction}`);
    renderVisibleSlides();

    clearTimeout(transitionTimeout);

    transitionTimeout = setTimeout(() => {
        carousel.classList.remove('is-changing', `is-moving-${direction}`);
        isAnimating = false;
    }, TRANSITION_TIME);
}

function showSlider(direction) {
    setActiveIndex(activeIndex + (direction === 'next' ? 1 : -1), direction);
}

nextBtn.addEventListener('click', () => {
    showSlider('next');
});

prevBtn.addEventListener('click', () => {
    showSlider('prev');
});

menuButtons.forEach((button) => {
    const galleryName = button.dataset.gallery;

    button.addEventListener('pointerenter', () => {
        scheduleGalleryWarmup(galleryName, 5);
    });

    button.addEventListener('focus', () => {
        scheduleGalleryWarmup(galleryName, 4);
    });

    button.addEventListener('touchstart', () => {
        preloadGalleryImages(galleryName, 0, 5);
    }, { passive: true });

    button.addEventListener('click', () => {
        if (button.dataset.protected === 'true') {
            openPasswordPanel(button);
            return;
        }

        openGallery(galleryName, button);
    });
});

backButton.addEventListener('click', closeGallery);
passwordClose.addEventListener('click', closePasswordPanel);

passwordPanel.addEventListener('click', (event) => {
    if (event.target === passwordPanel) {
        closePasswordPanel();
    }
});

passwordForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (passwordInput.value === US_PASSWORD && pendingProtectedButton) {
        openGallery(pendingProtectedButton.dataset.gallery, pendingProtectedButton);
        pendingProtectedButton = null;
        return;
    }

    passwordError.textContent = 'Incorrect password';
    passwordInput.select();
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && passwordPanel.classList.contains('is-open')) {
        closePasswordPanel();
        return;
    }

    if (!galleryShell.classList.contains('is-open')) {
        return;
    }

    if (event.key === 'Escape') {
        closeGallery();
    }

    if (event.key === 'ArrowRight') {
        showSlider('next');
    }

    if (event.key === 'ArrowLeft') {
        showSlider('prev');
    }
});

window.addEventListener('load', scheduleMenuWarmups);
