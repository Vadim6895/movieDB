import React from 'react';

function useModalEffect(handler: (v: boolean) => void) {
  React.useEffect(() => {
    function onEscKeyDown(evt: KeyboardEvent) {
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
    document.body.setAttribute('style', 'overflow: hidden;');
    document.addEventListener('keydown', onEscKeyDown);
    return () => {
      document.body.setAttribute('style', '');
      document.documentElement.style.setProperty('--scroll-width', '0px');
      document.removeEventListener('keydown', onEscKeyDown);
    };
  }, [handler]);
}

export default useModalEffect;
