import React from 'react';

function useModalEffect(handler) {
  React.useEffect(() => {
    function onEscKeyDown(evt) {
      if (evt.key === 'Escape') handler(false);
    }
    const paddingSize =
      window.innerWidth - document.documentElement.clientWidth;
    if (paddingSize) {
      document.documentElement.style.setProperty(
        '--scroll-width',
        `${paddingSize}px`,
      );
    }
    document.body.style = 'overflow: hidden;';
    document.addEventListener('keydown', onEscKeyDown);
    return () => {
      document.body.style = '';
      document.documentElement.style.setProperty('--scroll-width', '0px');
      document.removeEventListener('keydown', onEscKeyDown);
    };
  }, [handler]);
}

export default useModalEffect;
