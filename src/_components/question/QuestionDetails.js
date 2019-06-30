import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as questionActions from '../../_actions/questionActions';
import { NavLink } from 'react-router-dom';

class QuestionDetails extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			selectedChoice: {},
			voteSubmitted: false,
			voteSuccess: false
		};
	}

	selectChoice = (choice) => {
		this.setState({ selectedChoice: choice });
	};

	voteOnChoice = () => {
		const idFromUrl = this.state.selectedChoice.url.split('/').pop();
		this.setState({ voteSubmitted: true });
		this.props.actions
			.voteOnChoice(this.props.questionId, idFromUrl)
			.then(() => {
				this.loadQuestions();
			})
			.catch((error) => {
				// error handling
			});
	};

	loadQuestions = () => {
		this.props.actions
			.loadQuestions()
			.then(() => {
				this.setState({ voteSuccess: true });
			})
			.catch((error) => {
				// error handling
			});
	};

	getPercentage = (choices, votes) => {
		let totalVotes = 0;
		choices.forEach((choice) => {
			totalVotes = totalVotes + choice.votes;
		});
		return Math.round(votes / totalVotes * 100);
	};

	render() {
		const { question } = this.props;
		return (
			<div className="row">
				<div className="col-12">
					<h4 className="font-weight-light">
						<NavLink className="btn btn-outline-secondary rounded-50 px-4 mr-2" exact to="/questionslist">
							<small>BACK</small>
						</NavLink>
						QUESTION DETAIL
					</h4>
					<div className="card border-0 py-4 px-5 mb-4">
						<h3 className="font-weight-normal">{question.question}</h3>
						{question.choices && (
							<div className={this.state.voteSuccess ? 'voted' : ''}>
								<ul className="list-unstyled choices-list">
									{question.choices.map((choice, i) => (
										<li
											key={i}
											className={
												'd-flex align-items-center cursor-pointer py-2 ' +
												(this.state.selectedChoice.choice === choice.choice ? 'selected' : '')
											}
											onClick={() => this.selectChoice(choice)}>
											<div className="d-block">
												{choice.choice}
												{this.state.voteSuccess && (
													<span className="badge badge-light ml-1">{choice.votes}</span>
												)}
												{this.state.voteSuccess && (
													<div className="p-bar bg-light">
														<span
															className="bg-primary"
															style={{
																width: this.getPercentage(
																	question.choices,
																	choice.votes
																)
															}}
														/>
													</div>
												)}
											</div>
										</li>
									))}
								</ul>
								{this.state.voteSuccess && (
									<div class="alert alert-success" role="alert">
										Thank you your Vote !
									</div>
								)}
								{!this.state.voteSuccess && (
									<button
										disabled={!this.state.selectedChoice.choice || this.state.voteSubmitted}
										className="btn btn-primary rounded-50 px-4"
										onClick={() => {
											this.voteOnChoice();
										}}>
										SUBMIT
									</button>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}

QuestionDetails.propTypes = {
	question: PropTypes.object.isRequired
};

function getQuestionById(questions, id) {
	const question = questions.find((question) => {
		const idFromUrl = question.url.split('/').pop();
		return idFromUrl === id;
	});
	if (question) return question;
	return null;
}

function mapStateToProps(state, ownProps) {
	console.log(state);
	const questionId = ownProps.match.params.id;
	let question = {};

	if (questionId && state.questions.length > 0) {
		question = getQuestionById(state.questions, questionId);
	}

	return {
		question,
		questionId
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(questionActions, dispatch)
	};
}

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(QuestionDetails);
export { connectedApp as QuestionDetails };
