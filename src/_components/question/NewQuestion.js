import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as questionActions from '../../_actions/questionActions';
import { NavLink } from 'react-router-dom';
import QuestionForm from './QuestionForm';
import { history } from '../../_helpers/history';

class NewQuestion extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			question: {
				value: 'Favourite programming languages?',
				choices: []
			},
			selectedChoice: {},
			voteSubmitted: false,
			voteSuccess: false,
			saving: false
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
				this.setState({ saving: false });
				history.push('/questionslist');
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

	updateCourseState = (event) => {
		const field = event.target.name;
		let question = Object.assign({}, this.state.question);
		question[field] = event.target.value;
		return this.setState({ question: question });
	};

	saveQuestion = (event) => {
		event.preventDefault();
		this.setState({ saving: true });

		const choices = this.state.question.choices.split(',');
		const newquestion = {
			question: this.state.question.value,
			choices: choices
		};

		this.props.actions
			.addNewQuestion(newquestion)
			.then(() => {
				this.loadQuestions();
			})
			.catch((error) => {
				this.setState({ saving: false });
			});
	};

	render() {
		return (
			<div className="row">
				<div className="col-12">
					<h4 className="font-weight-light">
						<NavLink className="btn btn-outline-secondary rounded-50 px-4 mr-2" exact to="/questionslist">
							<small>BACK</small>
						</NavLink>
						ADD NEW QUESTION
					</h4>
					<div className="card border-0 py-4 px-5 mb-4">
						<QuestionForm
							question={this.state.question}
							onChange={this.updateCourseState}
							onSave={this.saveQuestion}
							saving={this.state.saving}
						/>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps() {
	return {};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(questionActions, dispatch)
	};
}

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(NewQuestion);
export { connectedApp as NewQuestion };
