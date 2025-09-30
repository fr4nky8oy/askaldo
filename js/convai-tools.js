// ============================================================================
// ELEVENLABS CONVAI WIDGET SETUP
// ============================================================================

const AGENT_ID = 'agent_3701k6axwc1bffatxfvchn49dnd3';
const OPEN_IN_NEW_TAB = true;
const WIDGET_POSITION = 'bottom-right';
const BASE_URL = '';

function showPopupBlockedNotification(url) {
  // Create notification element
  const notification = document.createElement('div');
  notification.id = 'popup-blocked-notification';
  notification.innerHTML = `
    <div style="position: fixed; top: 20px; left: 50%; transform: translateX(-50%); z-index: 10000;
                background: rgba(0, 0, 0, 0.9); color: white; padding: 20px 30px; border-radius: 12px;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4); max-width: 500px; text-align: center;
                backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.2);
                font-family: 'Inter', system-ui, sans-serif;">
      <div style="font-size: 1.1rem; font-weight: 600; margin-bottom: 10px;">Pop-up Blocked</div>
      <div style="font-size: 0.95rem; margin-bottom: 15px; line-height: 1.5;">
        Please allow pop-ups for this site to open the map.
      </div>
      <div style="display: flex; gap: 10px; justify-content: center;">
        <button onclick="window.open('${url}', '_blank'); document.getElementById('popup-blocked-notification').remove();"
                style="background: white; color: black; border: none; padding: 10px 20px; border-radius: 6px;
                       font-weight: 600; cursor: pointer; font-size: 0.9rem;">
          Try Again
        </button>
        <button onclick="document.getElementById('popup-blocked-notification').remove();"
                style="background: transparent; color: white; border: 1px solid rgba(255, 255, 255, 0.3);
                       padding: 10px 20px; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 0.9rem;">
          Close
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(notification);

  // Auto-remove after 8 seconds
  setTimeout(() => {
    const notif = document.getElementById('popup-blocked-notification');
    if (notif) {
      notif.remove();
    }
  }, 8000);
}

function injectElevenLabsWidget() {
  const ID = 'elevenlabs-convai-widget';

  if (document.getElementById(ID)) {
    return;
  }

  const script = document.createElement('script');
  script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
  script.async = true;
  script.type = 'text/javascript';
  document.head.appendChild(script);

  const wrapper = document.createElement('div');
  wrapper.className = `convai-widget ${WIDGET_POSITION}`;

  const widget = document.createElement('elevenlabs-convai');
  widget.id = ID;
  widget.setAttribute('agent-id', AGENT_ID);
  widget.setAttribute('variant', 'full');

  widget.addEventListener('elevenlabs-convai:call', (event) => {
    event.detail.config.clientTools = {
      redirectToExternalURL: ({ url }) => {
        console.log('redirectToExternalURL called with url:', url);

        let fullUrl = url;
        if (!url.startsWith('http')) {
          const baseUrl = BASE_URL || window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, '');
          fullUrl = `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
        }

        console.log('Navigating to:', fullUrl);

        if (OPEN_IN_NEW_TAB) {
          const newWindow = window.open(fullUrl, '_blank', 'noopener,noreferrer');

          // Check if pop-up was blocked
          if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
            showPopupBlockedNotification(fullUrl);
          }
        } else {
          window.location.href = fullUrl;
        }
      }
    };
  });

  wrapper.appendChild(widget);
  document.body.appendChild(wrapper);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectElevenLabsWidget);
} else {
  injectElevenLabsWidget();
}