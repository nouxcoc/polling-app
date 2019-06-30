import React from 'react';

const QuestionForm = ({ question, onSave, onChange, saving }) => {
	return (
		<div className="container">
			<form>
				<div className="field">
					<input
						type="text"
						className="form-control mb-3"
						name="value"
						placeholder="add your question"
						value={question.value}
            onChange={onChange}
					/>
					<input
						type="text"
						className="form-control mb-3"
						name="choices"
						placeholder="comma seperated choices"
						value={question.choices}
            onChange={onChange}
					/>

					<input
						type="submit"
						disabled={saving}
						value={saving ? 'Saving...' : 'Save'}
            className="btn btn-primary"
            onClick={onSave}
					/>

				</div>
			</form>
		</div>
	);
};

QuestionForm.propTypes = {
	// course: React.PropTypes.object.isRequired,
	// allAuthors: React.PropTypes.array,
	// onSave: React.PropTypes.func.isRequired,
	// onChange: React.PropTypes.func.isRequired,
	// saving: React.PropTypes.bool,
	// errors: React.PropTypes.object
};

export default QuestionForm;
