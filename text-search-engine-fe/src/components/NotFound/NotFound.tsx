import "./NotFound.css";

import Header from "../Header/Header";

const NotFound: React.FC = () => {
	return (
		<div className='not-found-container'>
			<Header />
			<div className='main-content'>
				<h1>404</h1>
				<p>Sorry, we were unable to find that page.</p>
			</div>
		</div>
	);
};

export default NotFound;
