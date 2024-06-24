import React, { memo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './facts.module.scss';
import { FACTS_COUNT } from '../../const';

function Fact({ fact, index }) {
  const [showSpoiler, setShowSpoiler] = React.useState(fact.spoiler);
  return (
    <li className={styles.factsItem}>
      <div className={styles.factsNumber}>
        <span className={styles.factsNumberText}>{index + 1}</span>
      </div>
      <div className={styles.factsWrapperText}>
        <p
          className={
            showSpoiler
              ? clsx(styles.factsDescText, styles.factsDescTextSpoiler)
              : styles.factsDescText
          }
        >
          {fact.value.replace(/<[^>]*>/g, '')}
        </p>
        {showSpoiler && (
          <button
            className={styles.factsSpoilerBtn}
            type="button"
            onClick={() => setShowSpoiler(!showSpoiler)}
          >
            Показать спойлер
          </button>
        )}
      </div>
    </li>
  );
}

const Facts = memo(({ facts }) => {
  const [showedFactsCount, setOpenFacts] = React.useState(FACTS_COUNT);
  const showBtn = showedFactsCount < facts.length;

  return (
    <section className={styles.facts}>
      <div className="container">
        <h2 className={styles.factsTitle}>Интересные факты о фильме</h2>
        <ul className={styles.factsList}>
          {facts.slice(0, showedFactsCount).map((fact, i) => (
            <Fact key={i} fact={fact} index={i} />
          ))}
        </ul>
        {showBtn && (
          <button
            className={styles.factsBtn}
            type="button"
            onClick={() => setOpenFacts(showedFactsCount + FACTS_COUNT)}
          >
            Показать ещё
          </button>
        )}
      </div>
    </section>
  );
});

Fact.propTypes = {
  fact: PropTypes.shape({
    spoiler: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

Facts.propTypes = {
  facts: PropTypes.arrayOf(
    PropTypes.shape({
      spoiler: PropTypes.bool.isRequired,
      type: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Facts;
