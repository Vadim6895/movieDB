import React from 'react';

function useOnClickOutside(initialIsVisible) {
  const [isComponentVisible, setIsComponentVisible] =
    React.useState(initialIsVisible);
  const ref = React.useRef(null);

  const onKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      setIsComponentVisible(false);
    }
  };

  const onClickOutside = (evt) => {
    if (ref.current && !ref.current.contains(evt.target)) {
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
