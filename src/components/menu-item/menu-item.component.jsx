import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import "./menu-item.styles.scss";

const MenuItem = ({ title, imageUrl, size, linkUrl }) => {
	const history = useHistory();
	const match = useRouteMatch();
	return (
		<div
			className={`${size} menu-item`}
			onClick={() => history.push(`${match.url}${linkUrl}`)}
		>
			<div
				className="background-image"
				style={{
					backgroundImage: `url(${imageUrl})`,
				}}
			></div>
			<div className="content">
				<div className="title">{title.toUpperCase()}</div>
				<span className="subtitle">SHOP NOW</span>
			</div>
		</div>
	);
};

export default MenuItem;
