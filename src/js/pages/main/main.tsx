import React from 'react';

import PromoSlider from '../../components/promoSlider/promoSlider';
import GenreSlider from '../../components/genreSlider/genreSlider';
import CardsSlider from '../../components/cardsSlider/cardsSlider';
import { allGenresNames } from '../../const';

function Main() {
  return (
    <>
      <PromoSlider />
      <GenreSlider />
      {allGenresNames.slice(1, 5).map((item) => (
        <CardsSlider genre={item} key={item.id} />
      ))}
    </>
  );
}

export default Main;
