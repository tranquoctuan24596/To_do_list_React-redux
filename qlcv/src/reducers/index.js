import {combineReducers} from 'redux';  
import tasks from './tasks';
import isDisplayForm from './isDisplayForm';

const myReducer = combineReducers({  //reducer tổng
    tasks : tasks,
    isDisplayForm // isDisplayForm : isDisplayForm,
});

export default myReducer;