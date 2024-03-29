import React, { useRef, useEffect } from "react";
import Nav from "../assets/MovieDesc/Nav";
import "../style.css";
import { useNavigate } from "react-router-dom";
import ANTMAN from "../assets/Images/antman.png";
import GETHARD from "../assets/Images/gethard.png";
import MEGAN from "../assets/Images/megan.png";
import SHAZAM from "../assets/Images/shazam.png";
import defaultPicture from "../assets/Images/default.png";
import NoData from "../assets/Images/NotFound.png";
import { debounce } from "lodash";
import ReactGA from "react-ga";

const TRACKING_ID = "UA-270069478-1";

ReactGA.initialize(TRACKING_ID);

const Index = () => {
  const navigate = useNavigate();
  const [movieData, setMovieData] = React.useState([]);
  const [genre, setGenre] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const genreDropdownRef = useRef(null);
  const [scrollToMovieSelection, setScrollToMovieSelection] = React.useState(false);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  const handleChangeText = (text) => {
    setSearchText(text);
  };

  const debouncedSearch = React.useMemo(
    () => debounce(handleChangeText, 300),
    []
  );

  const getApi = async () => {
    setIsLoading(true);
    try {
      let url =
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
      if (genre !== false) {
        url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}`;
      } else if (searchText !== "") {
        url = `https://api.themoviedb.org/3/search/movie?query=${searchText}&include_adult=false&language=en-US&page=1`;
      }
      const response = await fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2N2I1NmU2ZmQzZWY0NDNiM2EyNGQxZmU2ODI0Yzc1NiIsInN1YiI6IjY0NjBhYjc3YTY3MjU0MDBlM2QxYzNmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mF92dZ4Jll99QJNHWJYX4yiFPckV6iqo87gpDowtOAs",
        },
      });
      const data = await response.json();
      setMovieData([...data?.results]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleToDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  React.useEffect(() => {
    getApi();
  }, [searchText, genre]);

  useEffect(() => {
    if (scrollToMovieSelection && genreDropdownRef.current) {
      genreDropdownRef.current.scrollIntoView({ behavior: "smooth" });
      setScrollToMovieSelection(false);
    }
  }, [scrollToMovieSelection]);

  const selectGenre = (genre) => {
    setGenre(genre);
    setScrollToMovieSelection(true);
  };

  return (
    <>
      <Nav
        home={true}
        searchByText={debouncedSearch}
        selectGenre={selectGenre}
        genre={genre}
        searchText={searchText}
      />
      <section>
        <div className="slideshow-container">
          <div className="mySlides fade">
            <img src={ANTMAN} style={{ width: "100%" }} />
          </div>

          <div className="mySlides fade">
            <img src={GETHARD} style={{ width: "100%" }} />
          </div>

          <div className="mySlides fade">
            <img src={MEGAN} style={{ width: "100%" }} />
          </div>

          <div className="mySlides fade">
            <img src={SHAZAM} style={{ width: "100%" }} />
          </div>

          <br />

          <div style={{ textAlign: "center" }}>
            <span className="dot" onclick="currentSlide(1)"></span>
            <span className="dot" onclick="currentSlide(2)"></span>
            <span className="dot" onclick="currentSlide(3)"></span>
            <span className="dot" onclick="currentSlide(4)"></span>
          </div>
        </div>
      </section>
      {isLoading ? (
        <div className="lds-container">
          <div class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : movieData.length === 0 ? <div className="container-notfound"><img className="notfound" src={NoData} alt="NotFound"/></div>: ( 
        <>
          <section id="card">
            <h2 ref={genreDropdownRef}>Movie Selection</h2>
            <div className="card-body">
              {movieData.map((item, index) => (
                <div className="body" key={item.id}>
                  {item?.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                      alt={item.title}
                    />
                  ) : (
                    <img src={defaultPicture} alt={item.title} />
                  )}

                  <div className="desc-home">
                    <span>Movie</span>
                    <h3>{item.title}</h3>
                    <div className="star">
                      <i className="ri-star-fill"></i>
                      <i className="ri-star-fill"></i>
                      <i className="ri-star-fill"></i>
                      <i className="ri-star-half-line"></i>
                      <i className="ri-star-s-line"></i>
                    </div>
                    <h4 className="Movie-Info" onClick={() => handleToDetail(item.id)}>
                      Movie Information
                    </h4>
                  </div>
                  <div className="youtube-play">
                    <a href="youtube.html">
                      <i className="ri-play-circle-line play"></i>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </>
  );
};

let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  if (slides[slideIndex - 1]) {
    slides[slideIndex - 1].style.display = "block";
  }

  setTimeout(showSlides, 4000); // Change image every 4 seconds
}

export default Index;
