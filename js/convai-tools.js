// ============================================================================
// ELEVENLABS CONVAI WIDGET SETUP
// ============================================================================

const AGENT_ID = 'agent_3701k6axwc1bffatxfvchn49dnd3';
const OPEN_IN_NEW_TAB = false;
const WIDGET_POSITION = 'bottom-right';
const BASE_URL = '';

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
          window.open(fullUrl, '_blank', 'noopener,noreferrer');
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