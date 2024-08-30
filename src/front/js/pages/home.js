import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import GirlImg from "../../../../public/images/girl-ph.jpg";
import NutriImg from "../../../../public/images/chicken-plate.jpg";
import SportsImg from "../../../../public/images/chicken-plate.jpg";
import ScrollBanner from "../../../../public/images/scroll-banner-bg.png";
import ScrollToTopButton from "../component/ScrollToTopButton.jsx";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Product from "../component/product.jsx";


export const Home = () => {
	const { store, actions } = useContext(Context);
	const { products } = store;
	const navigate = useNavigate();

	const [isGirlImgLoaded, setIsGirlImgLoaded] = useState(false);

	const handleNavigate = () => {
        navigate(`/products`);
    };

	useEffect(() => {
		actions.getProducts();
	}, []);

	return (
		<div className="home-container mx-auto w-100 row">
			{/* **********___BANNER___********** */}
			<div className="banner w-100 p-0">
				<div className="title-container text-center">
					<h1>Bienvenid@</h1>
					<h2>{store.auth && store.currentUser.name}</h2>

				</div>
				{!isGirlImgLoaded && <Skeleton height={600} width="100%" />}
				<img src={GirlImg}
					className="banner-img"
					alt="banner-img"
					onLoad={() => setIsGirlImgLoaded(true)}
					style={{ display: isGirlImgLoaded ? 'block' : 'none' }} />
			</div>
			{/* **********___PRIMER___SECCION___********** */}
			<section className="first-section mx-auto col-10">
				<article className="d-flex flex-column align-center justify-content-between">
					<h1 className="border-bottom">
						Nutrición
					</h1>
					<div className="text-container">
						<p className="fs-5">
							¡Hola a todos!
							Espero que este mensaje los encuentre bien y llenos de energía. Hoy quiero invitarles a unirse a un viaje muy especial, uno que nos lleva hacia un bienestar integral y duradero: el de cuidarnos desde el punto de vista nutricional. A menudo, en medio de nuestras ajetreadas vidas, olvidamos la importancia de nutrir nuestro cuerpo de manera adecuada. Pero, ¿qué pasaría si les dijera que un cambio en nuestra alimentación podría no solo transformar nuestra salud física, sino también nuestra energía, estado de ánimo y calidad de vida en general?
							Imaginen por un momento un jardín. Si lo cuidamos adecuadamente, regando las plantas, dándoles luz y nutrientes, florecerá espléndido y vibrante. Nuestro cuerpo es muy similar. Es un jardín interno que requiere de los nutrientes adecuados para crecer fuerte y saludable. Cada elección alimentaria que hacemos es como una semilla que plantamos: algunas contribuyen a nuestro bienestar y otras pueden llevarnos por un camino menos favorable. Aquí es donde el conocimiento y la intención juegan un papel crucial.
							Explorando el Poder de los Alimentos
							Cada alimento tiene un propósito en nuestro cuerpo. Los vegetales frescos, las frutas jugosas, las legumbres llenas de fibra, y las proteínas magras no son solo ingredientes en nuestras comidas, sino potentes aliados en nuestra búsqueda de salud. Al explorar el mundo de la nutrición, descubrimos que cada grupo de alimentos ofrece beneficios únicos. Por ejemplo, los vegetales de hojas verdes como la espinaca y la col rizada están cargados de vitaminas y antioxidantes que apoyan el sistema inmunológico y combaten el estrés oxidativo. Las bayas, por su parte, no solo son deliciosas, sino que están llenas de antioxidantes que pueden mejorar nuestra memoria y mantener nuestra piel radiante.
							Cambiando Hábitos sin Sacrificio
							Es común pensar que adoptar una alimentación saludable significa hacer grandes sacrificios o renunciar a nuestras comidas favoritas. Sin embargo, cambiar nuestros hábitos alimenticios no tiene por qué ser un proceso doloroso ni restrictivo. Se trata de encontrar un equilibrio y hacer ajustes que se alineen con nuestros gustos y estilo de vida. Por ejemplo, si amas las pastas, puedes explorar alternativas integrales o hacerlas con vegetales. Si disfrutas de los postres, puedes probar versiones con menos azúcar y más ingredientes nutritivos, como los dulces a base de frutas o yogur.
							La clave es experimentar y encontrar lo que funciona mejor para ti. No se trata de seguir una dieta estricta, sino de adoptar un enfoque equilibrado que te permita disfrutar de tus alimentos mientras te proporcionan los nutrientes que tu cuerpo necesita.
							La Nutrición y el Bienestar Emocional
							La relación entre la nutrición y nuestro bienestar emocional es profunda y fascinante. ¿Sabías que los alimentos que consumes pueden influir en tu estado de ánimo y niveles de energía? Por ejemplo, los ácidos grasos omega-3, que se encuentran en el pescado y las nueces, son conocidos por sus efectos positivos sobre el estado de ánimo. Además, alimentos ricos en vitaminas del grupo B, como los granos enteros y las legumbres, están relacionados con una mayor estabilidad emocional.
							Tomarse el tiempo para elegir alimentos que no solo nutran el cuerpo, sino que también eleven el ánimo, puede marcar una gran diferencia en nuestra vida cotidiana. Imagina cómo te sentirías al saber que cada comida que disfrutas también está contribuyendo a un estado de ánimo más positivo y a una mente más clara.
							Educación y Autoconocimiento: Tu Herramienta Más Poderosa
							Para empezar a hacer cambios significativos en tu dieta, es fundamental educarte y conocerte a ti mismo. Investigar sobre los nutrientes, aprender a leer etiquetas y entender las necesidades específicas de tu cuerpo son pasos clave. Por ejemplo, si tienes una condición de salud específica como diabetes o hipertensión, aprender qué alimentos pueden ayudarte a manejarla es crucial. Del mismo modo, si eres muy activo, tu cuerpo tendrá necesidades nutricionales distintas a las de alguien que lleva un estilo de vida más sedentario.
							Inspiración y Recursos
							Afortunadamente, vivimos en una era donde la información y los recursos están al alcance de nuestras manos. Desde blogs y libros sobre nutrición hasta aplicaciones que te ayudan a rastrear tus hábitos alimenticios, hay muchas herramientas disponibles para ayudarte a tomar decisiones informadas. También puedes considerar trabajar con un nutricionista o dietista que pueda ofrecerte asesoramiento personalizado y apoyo en tu camino hacia una alimentación más saludable.
							Además, no olvides que la comunidad juega un papel importante en este viaje. Compartir tus metas con amigos y familiares, y buscar apoyo en grupos o foros puede hacer que el proceso sea más agradable y menos solitario. ¡Invita a tus seres queridos a unirse a ti en esta aventura! Juntos pueden descubrir nuevas recetas, experimentar con ingredientes frescos y celebrar cada pequeño logro en el camino hacia una mejor salud.
							Haciendo de la Nutrición una Aventura
							Recuerda que este viaje hacia una nutrición óptima no es un destino final, sino una aventura continua. A medida que explores diferentes alimentos, recetas y hábitos, descubrirás un mundo de posibilidades y placeres que quizás nunca habías imaginado. La nutrición es una forma de autocuidado y un acto de amor hacia ti mismo. Es una oportunidad para aprender, crecer y sentirte mejor en todos los aspectos de tu vida.
							Así que, te invito a dar el primer paso. Comienza explorando los alimentos que te brindan bienestar y energía. Experimenta con nuevas recetas, escucha a tu cuerpo y haz ajustes que se alineen con tus necesidades y preferencias. Recuerda que cada pequeño cambio cuenta y que estás construyendo un futuro más saludable y vibrante para ti mismo.
							Tu jardín interno merece florecer en su máximo esplendor. ¡Atrévete a nutrirlo y disfruta del viaje hacia un bienestar integral!
						</p>
					</div>
					<Link to="/professionals#nutricionists" className="more-link" >
						<h5>
							Más...
						</h5>
					</Link>
				</article>
				<div className="img-container">
					<img src={NutriImg} className="float-end" />
				</div>
			</section>
			<div className="parallax parallax-container-1 w-100"></div>

			{/* **********___SEGUNDA___SECCION___********** */}
			<section className="second-section mx-auto col-10">
				<div className="img-container">
					<img className="rounded-5 object-fit-cover" src="https://i.pinimg.com/736x/32/dc/77/32dc7737da3054d0933bb59254bebb35.jpg" />
				</div>
				<article className="d-flex flex-column align-center">
					<h1 className="border-bottom sports-title">
						Deportes
					</h1>
					<div className="text-container">
						<p className="fs-5">
							¡Imagina un mundo lleno de energía y vitalidad, donde cada movimiento te acerca a una versión más fuerte y saludable de ti mismo! Hacer deporte no es solo una forma de mantenerte en forma, sino una celebración de lo que tu cuerpo puede lograr. Desde el primer estiramiento hasta la última carrera, el ejercicio te ofrece una oportunidad única para desafiarte, liberar el estrés y descubrir nuevas habilidades. Ya sea que estés buscando una forma divertida de mantenerte activo, quieras mejorar tu rendimiento o simplemente desees sentirte más enérgico en tu vida diaria, el deporte te invita a explorar tu potencial y a disfrutar de cada paso del viaje. ¡Atrévete a moverte, diviértete en el proceso y celebra cada logro en el camino hacia una vida más saludable y vibrante!
						</p>
					</div>
					<Link to="/professionals#trainers" className="more-link" >
						<h5>
							Más...
						</h5>
					</Link>
				</article>
			</section>
			<div className="parallax parallax-container-2 w-100"></div>

			{/* **********___SECCION___FINAL___********** */}
			<section className="second-section mx-auto col-10">
				<article className="d-flex flex-column align-center w-75-lg">
					<h1 className="border-bottom">
						Tips
					</h1>
					<div className="text-container">
						<ul className="fs-4">
							<li>Incorpora una Variedad de Alimentos en tu Dieta</li>
							<li>Opta por Granos Enteros en Lugar de Refinados</li>
							<li>Elige Fuentes de Proteínas Saludables</li>
							<li>Mantén una Hidratación Adecuada</li>
							<li>Escucha a tu Cuerpo y Come con Atención</li>
						</ul>
					</div>
				</article>
			</section>
			<div className="parallax parallax-container-1 w-100"></div>
			<section className="mx-auto col-10 d-flex justify-content-center">
				<article className="d-flex flex-column align-center text-center">
					<h1 className="border-bottom">
						Nuestros productos
					</h1>
					<div className="products-home-container mx-auto">
						{products && products.length > 0 ? (
							products.slice(0, 4).map((product, index) => (
								<Product
									key={index}
									id={product.id}
									name={product.name}
									cost={product.cost}
									image_url={product.image_url}
								/>
							))
						) : (
							<h4 className="text-center text-danger m-4">No hay productos disponibles</h4>
						)}
					</div>
					<div className="btn-container w-100 d-flex justify-content-center mt-5">
						<button className="btn-see-more px-5 py-3 rounded" onClick={handleNavigate}>
							Ver catalogo
						</button>
					</div>
				</article>
			</section>
			<ScrollToTopButton />
		</div>
	);
};
