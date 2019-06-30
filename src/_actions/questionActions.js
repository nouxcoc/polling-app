import * as types from './actionTypes';

const proxyurl = 'https://cors-anywhere.herokuapp.com/';
const apiurl = 'https://polls.apiblueprint.org/questions';

export function loadQuestionsSuccess(questions) {
	return { type: types.LOAD_QUESTIONS_SUCCESS, questions };
}

export function loadQuestions() {
	return function(dispatch) {
		return fetch(proxyurl + apiurl)
			.then((response) => response.json(), (error) => console.log('An error occurred.', error))
			.then((json) => {
				dispatch(loadQuestionsSuccess(json));
			});
	};
}

export function voteOnChoice(questionId, choiceId) {
	return function() {
		const url = `${apiurl}/${questionId}/choices/${choiceId}`;
		return fetch(proxyurl + url, { method: 'post' })
			.then((response) => response.json(), (error) => console.log('An error occurred.', error))
			.then((json) => {
				return json;
			});
	};
}

export function addNewQuestion(question) {
	return function() {
		return fetch(proxyurl + apiurl, { method: 'post', body: JSON.stringify(question) })
			.then((response) => response.json(), (error) => console.log('An error occurred.', error))
			.then((json) => {
				return json;
			});
	};
}
