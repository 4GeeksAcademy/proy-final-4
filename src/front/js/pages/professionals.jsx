import React, { useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/professionals.css";
import NutricionistCard from '../component/nutricionistCard.jsx';
import PersonalTrainerCard from '../component/personalTrainerCard.jsx';

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
    />
  );
}

const Professionals = () => {

  const { store, actions } = useContext(Context);
  const { nutritionists, personalTrainers } = store;

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    swipeToSlide: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    appendDots: dots => (
      <div
        style={{
          backgroundColor: "transparent",
        }}
      >
        <ul style={{ margin: "0px 4px" }}> {dots} </ul>
      </div>
    ),
    customPaging: i => (
      <div
        style={{
          width: "30px",
          padding: "2px",
          color: "#394B3F",
          border: "1px solid #394B3F",
          borderRadius: "50%",
        }}
      >
        {i + 1}
      </div>
    ),
    responsive: [
      {
        breakpoint: 2580,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1510,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 644,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  useEffect(() => {
    actions.getNutritionists();
    actions.getPersonalTrainers();
  }, []);

  return (
    <div className='professionals-container'>
      <div className="invisible-header-box"></div>
      <div className="top-banner parallax w-100 p-0">
        <h1>Profesionales</h1>
      </div>
      <section>
        <div className="slider-container">
          <h2 id='nutricionists'>Nutricionistas</h2>
          <div className='professionals-carousel'>
            <Slider {...settings}>
            {nutritionists && nutritionists.length > 0 ? (
                    nutritionists.map((nutricionist, index) => (
                      console.log(nutricionist),
                      
                        <NutricionistCard
                            key={index}
                            id={nutricionist.id}
                            name={nutricionist.name}
                            calendly_name={nutricionist.calendly_name}
                            description={nutricionist.description}
                            // image_url={nutricionist.image_url}
                            // calendlyLink={nutricionist.calendly_link}
                        />
                    ))
                ) : (
                    <h4 className="text-center text-danger m-4">No hay nutricionistas disponibles</h4>
                )}
            </Slider>
          </div>
        </div>
      </section>
      <div className="parallax w-100"></div>
      <section className='p-t-section'>
        <div className="slider-container">
          <h2 id='trainers'>Personal Trainers</h2>
          <div className='professionals-carousel '>
            <Slider {...settings}>
              {personalTrainers && personalTrainers.length > 0 ? (
                    personalTrainers.map((trainers, index) => (
                        <PersonalTrainerCard
                            key={index}
                            id={trainers.id}
                            name={trainers.name}
                            calendly_name={trainers.calendly_name}
                            description={trainers.description}
                            // image_url={trainers.image_url}
                            // calendlyLink={trainer.calendly_link}
                        />
                    ))
                ) : (
                    <h4 className="text-center text-danger m-4">No hay personal trainers disponibles</h4>
                )}
            </Slider>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Professionals;