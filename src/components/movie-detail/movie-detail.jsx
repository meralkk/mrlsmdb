import React from 'react';
import { useParams } from 'react-router-dom';

function MovieDetail() {
  const { movieId } = useParams();

  // movieId'yi kullanarak ilgili filmi getirin ve detaylarını gösterin

  return (
    <div>

        film detayı buraya
        
    </div>
  );
}

export default MovieDetail;
