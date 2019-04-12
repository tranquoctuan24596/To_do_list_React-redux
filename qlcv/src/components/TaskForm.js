import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './../actions/index';
class TaskForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      id : '',
      name: '',                //state name trùng tên với name của input   | trùng nhau để khi setState
      status : false          // state status trùng tên với name của form  | [name] : value thì các state được cập nhật
    }
  }

  componentWillMount(){
     if(this.props.task){  //nếu this.props.taskEditing tồn tại
          this.setState({
            id : this.props.task.id,
            name : this.props.task.name,
            status: this.props.task.status
          });
     }
  }
  componentWillReceiveProps(nextProps){
      if(nextProps && nextProps.task){   //nếu nextProps và nextProps.task tồn tại
        this.setState({
            id : nextProps.task.id,
            name : nextProps.task.name,
            status : nextProps.task.status
        });
      }else if (nextProps && nextProps.task === null){
        this.setState({
          id : '',
          name: '',               
          status : false 
        });
      }
  }
  onExitForm = () =>{
    this.props.onCloseForm();
}

onChange = (event) =>{
  var target = event.target;
  var name = target.name;
  var value = target.value;           //value là gì trị người dùng nhập vào
  if(name==='status'){
      value = target.value === 'true' ? true : false;
  }
  this.setState({
    [name]: value
  });
}
 onSubmit = (event) => {
    event.preventDefault();
    this.props.onAddTask(this.state);
    //this.props.onSubmit(this.state);   //this.state lúc này chính là dữ liệu người dùng nhập vào 
                                      // Nó sẽ được truyền vào biến data ở onSubmit App.js
    //Cancel & Close Form
    this.onClear();
    this.onExitForm();
  }                                       
 onClear = () =>{
   this.setState({
      name : '',
      status : false
   });
 }
  render() {
    var { id } = this.state;
    return (

        <div className="panel panel-success">
        <div className="panel-heading">
          <h3 className="panel-title">
            {id !== '' ? 'Cập nhật công việc' : 'Thêm công việc'}
              <span
              className="fa fa-times-circle ml-btn"
              onClick = {this.onExitForm}
            ></span>
          </h3>
        </div>
        <div className="panel-body">
          <form onSubmit={this.onSubmit} >
            <div className="form-group">
              <label >Tên: </label>
              <input
                type="text"
                className="form-control"
                name="name"
                value = {this.state.name}
                onChange = {this.onChange}
              />
              <br />
              <label >Trạng thái: </label>
              <select name="status"
               className="form-control"
               value = {this.state.status}
               onChange={this.onChange}>
                <option value={true}>Kích hoạt</option>
                <option value={false}>Ẩn</option>
              </select><br />
              <div className="text-center">
                <button type="submit" className="btn btn-success"><i className="fa fa-plus mr-15"></i>Lưu lại</button>&nbsp;
                    <button type="button" 
                    className="btn btn-warning"
                    onClick={this.onClear}><i className="fa fa-times mr-15"></i>Hủy bỏ</button>
              </div>
            </div>
          </form>
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state) =>{
    return{

    }
};

const mapDispatchToProps = (dispatch,props) =>{
    return{
       onAddTask : (task) =>{  //onAddTask chính là props của component TaskForm
          dispatch(actions.addTask(task));
       },
       onCloseForm : () =>{
        dispatch(actions.closeForm())
      }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TaskForm);
