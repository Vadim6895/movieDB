import React from 'react';

import styles from './spinner.module.scss';

function Spinner({ width, height }: { width: number; height: number }) {
  return (
    <div className={styles.wrapper}>
      <span
        className={styles.loader}
        style={{ width: `${width}px`, height: `${height}px` }}
      />
    </div>
  );
}

function SmallSpinner({
  width,
  height,
  stroke = 3,
}: {
  width: number;
  height: number;
  // eslint-disable-next-line react/require-default-props
  stroke?: number;
}) {
  return (
    <span
      className={styles.loader}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        borderWidth: `${stroke}px`,
      }}
    />
  );
}

export default Spinner;
export { SmallSpinner };
