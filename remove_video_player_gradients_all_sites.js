// ==UserScript==
// @name         Remove Gradients From Video Controls - All Sites
// @description  Removes gradients from HTML5 video players + other video players controls on all sites
// @namespace    https://github.com/BD9Max/userscripts
// @update       https://github.com/BD9Max/userscripts/raw/refs/heads/main/remove_video_player_gradients_all_sites.js
// @icon         https://github.com/BD9Max/userscripts/raw/refs/heads/main/media/icons/remove_video_player_gradients.png
// @version      1.0
// @run-at       document-end
// @author       DB9Max
// @grant        none
// @license      MIT
// @match        https://*/*
// ==/UserScript==

(function() {
    'use strict';
    
    // Create and inject CSS styles
    const style = document.createElement('style');
    style.textContent = `
        /* Remove gradient from WebKit video controls panel (main target) */
        video::-webkit-media-controls-panel {
            background: transparent !important;
            background-image: none !important;
            background-color: transparent !important;
        }
        
        /* Remove gradient from the enclosure around controls */
        video::-webkit-media-controls-enclosure {
            background: transparent !important;
            background-image: none !important;
        }
        
        /* Remove overlay gradient that appears over controls */
        video::-webkit-media-controls-overlay-enclosure {
            background: transparent !important;
            background-image: none !important;
        }
        
        /* Target the timeline container specifically */
        video::-webkit-media-controls-timeline-container {
            background: transparent !important;
            background-image: none !important;
        }
        
        /* Remove any shadow/gradient effects */
        video::-webkit-media-controls {
            background: transparent !important;
            background-image: none !important;
        }
        
        /* Firefox controls */
        video::-moz-media-controls {
            background: transparent !important;
            background-image: none !important;
        }
        
        /* Additional fallback for stubborn gradients */
        video::-webkit-media-controls-panel,
        video::-webkit-media-controls-enclosure,
        video::-webkit-media-controls-overlay-enclosure {
            background: rgba(0, 0, 0, 0) !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
        }
    `;
    
    // Inject the styles
    document.head.appendChild(style);
    
    // Function to force remove gradients via JavaScript
    function forceRemoveGradients() {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            // Force transparent background on video element itself
            video.style.setProperty('background', 'transparent', 'important');
            
            // Try to access shadow DOM controls (limited access)
            try {
                const shadowRoot = video.shadowRoot;
                if (shadowRoot) {
                    const controls = shadowRoot.querySelectorAll('*');
                    controls.forEach(control => {
                        if (control.style) {
                            control.style.setProperty('background', 'transparent', 'important');
                            control.style.setProperty('background-image', 'none', 'important');
                        }
                    });
                }
            } catch (e) {
                // Shadow DOM access restricted, CSS should handle it
            }
        });
    }
    
    // Run initially
    forceRemoveGradients();
    
    // Run when videos are loaded
    document.addEventListener('loadedmetadata', forceRemoveGradients, true);
    
    // Watch for new videos being added
    const observer = new MutationObserver(() => {
        forceRemoveGradients();
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // Also try to run when page is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', forceRemoveGradients);
    }
    
    window.addEventListener('load', forceRemoveGradients);
    
})();
