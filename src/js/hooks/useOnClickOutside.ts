import React from 'react';

function useOnClickOutside(initialIsVisible: boolean) {
  const [isComponentVisible, setIsComponentVisible] =
    React.useState(initialIsVisible);
  const ref = React.useRef<HTMLDivElement>(null);

  const onKeyDown = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      setIsComponentVisible(false);
    }
  };

  const onClickOutside = (evt: MouseEvent) => {
    const target = evt.target as HTMLElement;
    if (ref.current && !ref.current.contains(target)) {
      setIsComponentVisible(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', onKeyDown, true);
    document.addEventListener('click', onClickOutside, true);
    return () => {
      document.removeEventListener('keydown', onKeyDown, true);
      document.removeEventListener('click', onClickOutside, true);
    };
  }, []);

  return { ref, isComponentVisible, setIsComponentVisible };
}

export default useOnClickOutside;
