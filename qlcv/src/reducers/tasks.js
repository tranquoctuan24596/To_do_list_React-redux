import * as types from './../constants/ActionType';

var s4 = () => {         
    return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
  }
  // tạo một phương thức s4 để tạo chuỗi random(để đưa vào id)hoặc có thể dùng randomstring

var gerenateID =()=>{
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +s4() + '-' + s4() + '-' +s4() + '-'+ s4() + '-' + s4() +s4();
}

var findIndex = (tasks,id) =>{
    var result = -1
    tasks.forEach((task,index)=>{
        if(task.id === id)
        {
            result = index;
        }
    });
    return result;
}

var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = data ? data : [];

var myReducer = (state = initialState, action) =>{
    switch(action.type){
        case types.LIST_ALL:
            return state;
        case types.ADD_TASK:
            var NewTask = {
                id : gerenateID(),
                name : action.task.name,
                status : action.task.status === 'true' ? true : false
            }
            state.push(NewTask); //bởi vì state ban đầu là Mảng, nên push NewTask(là một phần tử) vào state ban đầu
            localStorage.setItem('task',JSON.stringify(state));
            return [...state];
        case types.UPDATE_STATUS_TASK:
                var id = action.id
                var index = findIndex(state,id);
                state[index] = {
                    ...state[index],
                    status : !state[index].status
                };
                // var cloneTask = {...state[index]} // là cái task cũ
                // cloneTask.status = !cloneTask.status;
                // state[index] = cloneTask;
                // state[index].status = !state[index].status;
                localStorage.setItem('tasks',JSON.stringify(state));
            return [...state];
        default : return state;
    }
};

export default myReducer;