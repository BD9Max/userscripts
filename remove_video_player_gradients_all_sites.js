// ==UserScript==
// @name         Remove Gradients From Video Controls - All Sites
// @description  Removes gradients from HTML5 video players + other video players controls on all sites
// @namespace    https://github.com/BD9Max/userscripts
// @updateURL    https://github.com/BD9Max/userscripts/raw/refs/heads/main/remove_video_player_gradients_all_sites.js
// @icon         https://github.com/BD9Max/userscripts/raw/refs/heads/main/media/icons/remove_video_player_gradients.png
// @version      1.2
// @run-at       document-end
// @author       DB9Max
// @grant        GM_addStyle
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

// Add extra styles for other video players
GM_addStyle(`
  /* Plyr */
  .plyr__controls::before,
  .plyr__controls {
    background-image: none !important;
    background: transparent !important;
    box-shadow: none !important;
  }

  /* Video.js */
  .vjs-control-bar::before,
  .vjs-control-bar::after,
  .vjs-control-bar {
    background-image: none !important;
    background: transparent !important;
    box-shadow: none !important;
  }

  /* Vidstack (used in Stream, Vime, etc.) */
  media-controller::part(controls),
  media-controller::part(control-bar),
  .vds-control-bar {
    background-image: none !important;
    background: transparent !important;
    box-shadow: none !important;
  }

  /* JW Player */
  .jw-controlbar,
  .jw-controlbar::before,
  .jw-controlbar::after {
    background: transparent !important;
    background-image: none !important;
    box-shadow: none !important;
  }

  /* Ruffle (Flash emulator) */
  ruffle-player::part(controls),
  .ruffle-control-bar {
    background: transparent !important;
    background-image: none !important;
    box-shadow: none !important;
  }

/* TikTok */
  .tiktok-1itcwxg-DivControlsContainer,
  .tiktok-1itcwxg-DivControlsContainer::before,
  .tiktok-1itcwxg-DivControlsContainer::after,
  .tiktok-14i2jc-DivSeekBarBackground {
    background: transparent !important;
    background-image: none !important;
    box-shadow: none !important;
  }

  /* Instagram (Web) */
  .x1lliihq,  /* IG overlay wrapper */
  .x1i10hfl::before,
  .x1i10hfl::after,
  .xds687c,
  .x1ypdohk {
    background: transparent !important;
    background-image: none !important;
    box-shadow: none !important;
  }

  /* Twitter (X) */
  div[data-testid="videoPlayer"]::before,
  div[data-testid="videoPlayer"]::after,
  .r-1oszu61,  /* overlay area */
  .r-14lw9ot {
    background: transparent !important;
    background-image: none !important;
    box-shadow: none !important;
  }

/* Facebook */
  .x1lliihq, /* shared with Instagram */
  .x6s0dn4,
  .x1n2onr6,
  .x5yr21d,
  .x78zum5,
  .x1pi30zi {
    background: transparent !important;
    background-image: none !important;
    box-shadow: none !important;
  }

  /* Vimeo */
  .vp-controls,
  .vp-controls::before,
  .vp-bottom-gradient,
  .vp-gradient-top,
  .vp-gradient-bottom {
    background: transparent !important;
    background-image: none !important;
    box-shadow: none !important;
  }

  /* Dailymotion */
  .dmp_ControlBar,
  .dmp_ControlBar::before,
  .dmp_Overlay,
  .dmp_UIOverlay {
    background: transparent !important;
    background-image: none !important;
    box-shadow: none !important;
  }

`);

// Extended runtime cleanup for dynamically styled gradients
const gradientSelectors = [
  '.ytp-gradient-top',
  '.ytp-gradient-bottom',
  '.plyr__controls',
  '.vjs-control-bar',
  'media-controller::part(controls)',
  'media-controller::part(control-bar)',
  '.vds-control-bar',
  '.jw-controlbar',
  'ruffle-player::part(controls)',
  '.ruffle-control-bar'

// Facebook
  '.x6s0dn4',
  '.x1n2onr6',
  '.x5yr21d',
  '.x78zum5',
  '.x1pi30zi',

  // Vimeo
  '.vp-controls',
  '.vp-bottom-gradient',
  '.vp-gradient-top',
  '.vp-gradient-bottom',

  // Dailymotion
  '.dmp_ControlBar',
  '.dmp_Overlay',
  '.dmp_UIOverlay'
];

function removeGradientStyles() {
  gradientSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      try {
        el.style.background = 'transparent';
        el.style.backgroundImage = 'none';
        el.style.boxShadow = 'none';
      } catch (e) {}
    });
  });
}

// Observe dynamically injected players
const observer = new MutationObserver(removeGradientStyles);
observer.observe(document.body, { childList: true, subtree: true });

// Initial pass
removeGradientStyles();
    
})();
