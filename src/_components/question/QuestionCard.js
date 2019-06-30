import React from 'react';
import { NavLink } from 'react-router-dom';

const QuestionCard = ({ question }) => {
	return (
		<div className="card border-0 py-4 px-5 mb-4">
			<h3 className="font-weight-light">{question.question}</h3>
			<ul className="list-unstyled">
				{question.choices.map((choice, i) => (
					<li key={i} className="py-1">
						{choice.choice}
					</li>
				))}
			</ul>
			<span>
				<NavLink className="btn btn-primary rounded-50 px-4" exact to={question.url}>
					<small>VOTE</small>
				</NavLink>
			</span>
		</div>
	);
};

export default QuestionCard;
