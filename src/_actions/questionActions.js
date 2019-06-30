import * as types from './actionTypes';

export function loadQuestionsSuccess(questions) {
	return { type: types.LOAD_QUESTIONS_SUCCESS, questions };
}

export function loadQuestions() {
	return function(dispatch) {
		const proxyurl = 'https://cors-anywhere.herokuapp.com/';
		const url = 'https://polls.apiblueprint.org/questions';
		return fetch(proxyurl + url)
			.then((response) => response.json(), (error) => console.log('An error occurred.', error))
			.then((json) => {
				dispatch(loadQuestionsSuccess(json));
			});
	};
}

export function voteOnChoice(questionId, choiceId) {
	console.log(questionId + '' + choiceId);
	return function() {
		const proxyurl = 'https://cors-anywhere.herokuapp.com/';
		const url = `https://polls.apiblueprint.org/questions/${questionId}/choices/${choiceId}`;
		return fetch(proxyurl + url, { method: 'post' })
			.then((response) => response.json(), (error) => console.log('An error occurred.', error))
			.then((json) => {
				return json;
			});
	};
}

export function addNewQuestion(question) {
	return function() {

		const proxyurl = 'https://cors-anywhere.herokuapp.com/';
        const url = `https://polls.apiblueprint.org/questions`;
        
        console.log(question);

		return fetch(proxyurl + url, { method: 'post', body: JSON.stringify(question) })
			.then((response) => response.json(), (error) => console.log('An error occurred.', error))
			.then((json) => {
				return json;
			});
	};
}
