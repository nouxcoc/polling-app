import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cartActions from '../../_actions/questionActions';
import QuestionCard from './QuestionCard';
import { NavLink } from 'react-router-dom';

class QuestionsPage extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			products: Object.assign({}, props.products),
			pincodes: Object.assign({}, props.pincodes),
			random_images: [ 'phone.png', 'Earphone.png', 'stick.png' ],
			pincode: '',
			validpincode: false
		};
	}

	onIncrement = (id) => {
		this.setState({ value: this.state.value + 1 });
	};

	onDecrement = (id) => {
		this.setState({ value: this.state.value > 0 ? this.state.value - 1 : 0 });
	};

	onChangeInput = (event) => {
		this.setState({
			validpincode: false
		});
		let val = event.target.value;
		let pincodes = Object.assign({}, this.state.pincodes);
		for (let key in pincodes) {
			if (event.target.value === key) {
				this.setState({
					validpincode: event.target.value === key && true
				});
				break;
			}
		}
		this.setState({ pincode: val });
	};

	render() {
		const { questions } = this.props;
		return (
			<div className="row">
				<div className="col-12">
					<h1 className="font-weight-light">POLL APP</h1>
					<NavLink className="btn btn-info rounded-50 px-4 mb-3" exact to="/newquestion">
						<small>+ ADD NEW QUESTION</small>
					</NavLink>
					
					{questions.map((question, i) => <QuestionCard question={question} key={i} />)}
				</div>
			</div>
		);
	}
}

QuestionsPage.propTypes = {
	questions: PropTypes.array.isRequired
};

function mapStateToProps(state) {
	return {
		questions: state.questions
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(cartActions, dispatch)
	};
}

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(QuestionsPage);
export { connectedApp as QuestionsPage };
