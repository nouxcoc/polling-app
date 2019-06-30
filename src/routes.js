import { QuestionsPage } from './_components/question/QuestionPage';
import { QuestionDetails } from './_components/question/QuestionDetails';
import { NewQuestion } from './_components/question/NewQuestion';

const routes = [
	{
		path: '/questionslist',
		component: QuestionsPage
	},
	{
		path: '/questions/:id',
		component: QuestionDetails
	},
	{
		path: '/newquestion',
		component: NewQuestion
	},
	{
		path: '/',
		component: QuestionsPage
	}
];

export default routes;
