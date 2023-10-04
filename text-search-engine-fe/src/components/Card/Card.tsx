import "./Card.css";

type CardProps = {
	title: string;
	thumbnail: string;
	pdfURL: string;
};

const Card: React.FC<CardProps> = ({ title, thumbnail, pdfURL }) => {
	return (
		<div className='card' onClick={() => window.open(pdfURL, "_blank")}>
			<img src={thumbnail} alt={title} />
			<h4>{title}</h4>
		</div>
	);
};

export default Card;
