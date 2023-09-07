import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
// import { BsArrowRightShort } from "react-icons/bs";
import MainTitle from '../main-title/main-title';

import axios from "axios";
import "./tv-series.scss";

function TvSeries() {
  const [tvData, setTvData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
      const apiToken = import.meta.env.VITE_REACT_APP_API_TOKEN;

      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${apiToken}`,
            },
          }
        );

        if (response.status === 200) {
          setTvData(response.data.results);
        } else {
          console.error("API Request Error:", response.statusText);
        }
      } catch (error) {
        console.error("API Request Error:", error);
      }
    };

    loadData();
  }, []);

  return (
    <>
      <div className="tvseries-bg">
      <MainTitle title="Tv Series" />
        {tvData.map((tvShow, index) => (
          <div className="tvshow-container">
            <div className="container-poster-title">
              <div class="container-poster" key={index}>
                <img
                  className="poster"
                  src={`https://image.tmdb.org/t/p/original${tvShow.poster_path}`}
                  alt={tvShow.name}
                />
              </div>
              <div className="tvshowname-title">{tvShow.name}</div>
            </div>
            <div className="tvshow-vote-average">
              {" "}
              <AiFillStar />
              {tvShow.vote_average}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default TvSeries;
