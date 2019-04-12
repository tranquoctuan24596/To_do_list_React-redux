import React, { Component } from 'react';
import TaskItem from './TaskItem';
import {connect} from 'react-redux';

class TaskList extends Component {
    constructor(props){
        super(props);
        this.state = {
            filterName : '',
            filterStatus: -1 // all : -1, active : 1, deactive :0  
        }
    }
    onChange = (event)=>{
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.props.onFilter(
            name === 'filterName' ? value : this.state.filterName,
            name === 'filterStatus' ? value : this.state.filterStatus,
        )
        this.setState({
            [name] : value
        });
    }
    render() {
        var { tasks } = this.props;
        var {tasks} = this.props; // var tasks = this.props.tasks
        var {filterName,filterStatus} = this.state;
        var elmTasks = tasks.map((task,index)=>{
            return <TaskItem 
                     key={task.id} 
                     index={index} 
                     task = {task} 
                    
                    onDelete ={this.props.onDelete}
                    onUpdate = {this.props.onUpdate}
            />
        });
        return (
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td><input
                            type="text"
                            className="form-control"
                            name="filterName"
                            value = {filterName}
                            onChange = {this.onChange}
                        />
                        </td>
                        <td>
                            <select className="form-control"
                            name = "filterStatus"
                            value = {filterStatus}
                            onChange = {this.onChange} >
                                <option value ={-1}>Tất cả</option>
                                <option value ={0}>Ẩn</option>
                                <option value ={1}>Kích hoạt</option>
                            </select>
                        </td>
                        <td></td>
                    </tr>
                   { elmTasks }
            </tbody>
            </table>
        );
    }
}

const mapStateToProps = (state) => {
      return {
          tasks : state.tasks
       }      
};         //có nghĩa là các State của store nó sẽ chuyển thành các props của state này

export default connect(mapStateToProps,null)(TaskList);
// Link tham khảo mapStateToProps, connect : https://viblo.asia/p/phan-tich-connect-va-mapstatetoprops-trong-redux-L4x5xN0rZBM
