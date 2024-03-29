import "../assets/MovieDesc/Movie.css";
import Nav from "../assets/MovieDesc/Nav";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";
import ReactGA from "react-ga";

const TRACKING_ID = "UA-270069478-1";

ReactGA.initialize(TRACKING_ID);

const Detail = () => {
  const { id } = useParams();
  const [movieData, setMovieData] = useState({});
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  const getApi = async () => {
    setLoading(true);
    let newData = {};
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2N2I1NmU2ZmQzZWY0NDNiM2EyNGQxZmU2ODI0Yzc1NiIsInN1YiI6IjY0NjBhYjc3YTY3MjU0MDBlM2QxYzNmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mF92dZ4Jll99QJNHWJYX4yiFPckV6iqo87gpDowtOAs",
          },
        } // *GET, POST, PUT, DELETE, etc.}
      );
      const data = await response.json();
      const url = `https://movies-tv-shows-database.p.rapidapi.com/?movieid=${data.imdb_id}`;
      const options = {
        method: "GET",
        headers: {
          Type: "get-movie-details",
          "X-RapidAPI-Key":
            "696cfde225msh3a5b5bbd15f2f0bp15f5bbjsn220c86b8f486",
          "X-RapidAPI-Host": "movies-tv-shows-database.p.rapidapi.com",
        },
      };

      const otherResponse = await fetch(url, options);
      const result = await otherResponse.json();
      newData = { ...data, ...result };
      setMovieData(newData);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getApi();
  }, []);

  return (
    <>
      <Nav />
      <div class="title">
        <h2>Movie Information</h2>
      </div>
      {isLoading ? (
        <div className="lds-container">
          <div class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <>
          <section id="info">
            <div class="movie">
              <img
                src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`}
                style={{ width: "100%" }}
                alt={movieData.title}
              />
              <h3>{movieData.title}</h3>
              <h5>Movie</h5>
              <h6>{movieData.year}</h6>
            </div>
            <div class="desc">
              <div class="movie-overview">
                {movieData?.youtube_trailer_key && (
                  <ReactPlayer
                    className="video-player"
                    url={`https://www.youtube.com/watch?v=${movieData?.youtube_trailer_key}`}
                  />
                )}
              </div>
              <div className="sinopsis">
                <h4 style={{ marginTop: "100px" }}>Synopsis</h4>
                <h5>{movieData.overview}</h5>
                <div className="deskripsi">
                  <div>
                    <strong>Director</strong>{" "}
                    {movieData?.directors && movieData?.directors.join(", ")}
                  </div>
                  <div>
                    <strong>Casts</strong>{" "}
                    {movieData?.stars && movieData?.stars.join(", ")}
                  </div>
                  <div> </div>
                </div>
              </div>
              <div className="genre">
                <h4>Genres:</h4>
                <div className="category">
                  {movieData?.genres?.map((item) => (
                    <div key={item}>{item}</div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Detail;
