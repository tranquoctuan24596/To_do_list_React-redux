import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import {connect} from 'react-redux';  // kết nối redux store với react.
import * as actions from './actions/index';
class App extends Component {

  constructor(props){
    super(props);
    this.state = {
     // tasks: [],      // id: duy nhất, name, status.
      // isDisplayForm : false,
      taskEditing : null,   // là taskItem cẩn sửa
      filter : {
        name : '',
        status : -1
      },
      keyword: '',
      sortBy : 'name',
      sortValue : 1            //1 sắp xếp tăng dần, -1 sắp xếp giảm dần.
    }
    this.onToggleForm = this.onToggleForm.bind(this);
  }

  // componentWillMount(){
  //     if(localStorage && localStorage.getItem('tasks_data')){
  //         var tasks_data = JSON.parse(localStorage.getItem('tasks_data'));
  //         this.setState({
  //             tasks : tasks_data    // lúc này tasks_data là một đối tượng.
  //         });
  //     }
  // }
 
  onToggleForm(){
    // if(this.state.isDisplayForm && this.state.taskEditing !== null){
    //     this.setState({
    //       isDisplayForm : true,
    //       taskEditing :null
    //     })
    // }
    //   this.setState({
    //     isDisplayForm : !this.state.isDisplayForm,
    //     taskEditing : null
    //   });
    this.props.onToggleForm();
  }

  onShowForm = () =>{
    this.setState({
        isDisplayForm : true
    });
  }
  // onSubmit = (data) =>{        // data chính là 1 task.
  //   var { tasks } = this.state;
  //   if(data.id === ''){
  //     data.id = this.gerenateID();  
  //     tasks.push(data);    // đẩy những gì người dùng nhập ở input vào mảng tasks
  //   }else{
  //     //Editing
  //     var index = this.findIndex(data.id)
  //     tasks[index] = data;
  //   }
  //   this.setState({
  //      tasks: tasks,
  //      taskEditing : null
  //   });
  //    localStorage.setItem('tasks',JSON.stringify(tasks));
  // }

  findIndex = (id) =>{
      var {tasks} = this.state;
      var result = -1
      tasks.forEach((task,index)=>{
          if(task.id === id)
          {
              result = index;
          }
      });
      return result;
  }
  onDelete = (id) =>{
      var {tasks} = this.state;
      var index = this.findIndex(id);
      if(index !== -1){
        tasks.splice(index,1) // index: xóa phẩn tử ở index thứ. số 1: 1 phần tử cần xóa.
        this.setState({
            tasks : tasks
        });
      }
      localStorage.setItem('tasks',JSON.stringify(tasks));
  }
  onUpdate = (id) =>{
      var {tasks} = this.state;
      var index = this.findIndex(id);
      var taskEditing = tasks[index];
      this.setState({
        taskEditing : taskEditing,
      });
      this.onShowForm();
  }
  onFilter = (filterName,filterStatus) =>{
      console.log(filterName , '-' ,filterStatus);
      filterStatus = parseInt(filterStatus,10);
      this.setState({
          filter: {
             name : filterName.toLowerCase(),
             status : filterStatus
          }
      });
  }
  onSearch = (keyword) =>{
      this.setState({
          keyword : keyword
      });
  }
  onSort = (sortBy, sortValue) => {
    this.setState({
      sortBy : sortBy,
      sortValue : sortValue
    });
    console.log(this.state.sortBy)
  }
  render() {
    var {taskEditing, filter,keyword, sortBy, sortValue} = this.state; //Tương đồng với cách viết: var tasks = this.state.tasks
    var {isDisplayForm} = this.props;
    // if(filter){
    //     if(filter.name) //Nếu filter.name tồn tại
    //     {
    //         tasks = tasks.filter((task) =>{
    //             return task.name.toLowerCase().indexOf(filter.name) !== -1
    //         });
    //     }
    //       // k dung if. Như vậy nó sẽ kiếm tra filter.status !== null !== undefined đồng thời !==0 // vì khác 0 nên nó sẽ không tính cả trường hợp option Ẩn
    //         tasks = tasks.filter((task)=>{
    //             if(filter.status === -1){
    //               return task
    //             }else{
    //               return task.status === (filter.status === 1 ? true : false)
    //             }
    //         });
    //   }
      // if(sortBy === 'name'){
      //    tasks.sort()
      // }
      // if(keyword)
      // { 
      //   tasks = tasks.filter((task) =>{
      //     return task.name.toLowerCase().indexOf(keyword) !== -1
      //    });
      // }
    var elmTaskForm = isDisplayForm === true ? <TaskForm 
    task = {taskEditing}  //props có thể là object, function, string, number,....
    /> :  '';
    return (

      <div className="container">
        <div className="text-center">
          <h1>Quản lý công việc</h1><hr />
        </div>

        <div className="row">
          <div className={isDisplayForm === true ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
              {elmTaskForm}
          </div>

          <div className={isDisplayForm === true ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
            <button 
            type="button" 
            className="btn btn-primary"
            onClick = { this.onToggleForm }>
              Thêm công việc
          </button>
            {/*Search - Sort*/}
            <div className="row mt-15">
               <Control onSearch = {this.onSearch}
                 onSort = {this.onSort}
                 sortBy = {sortBy}
                 sortValue = {sortValue}
               />
            </div>

            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <TaskList 
                    //tasks = {tasks} 
                    // onUpdateStatus={this.onUpdateStatus}
                    onDelete = {this.onDelete}
                    onUpdate = {this.onUpdate}
                    onFilter = {this.onFilter}
                  />
              </div>
            </div>

          </div>
        </div>
      </div>

    );
  }
}
const mapStateToProps = (state) =>{
    return{
        isDisplayForm : state.isDisplayForm //state ở đây là state trên store
    };
};  

const mapDispatchToProps = (dispatch,props) =>{
   return{
      onToggleForm : () =>{
          dispatch(actions.toggleForm())
      }
   };
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
