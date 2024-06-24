import React from 'react';
import PropTypes from 'prop-types';

import styles from './spinner.module.scss';

function Spinner({ width, height }) {
  return (
    <div className={styles.wrapper}>
      <span
        className={styles.loader}
        style={{ width: `${width}px`, height: `${height}px` }}
      />
    </div>
  );
}

function SmallSpinner({ width, height, stroke = 3 }) {
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

SmallSpinner.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  stroke: PropTypes.number,
};

SmallSpinner.defaultProps = {
  stroke: 3,
};

Spinner.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default Spinner;
export { SmallSpinner };
