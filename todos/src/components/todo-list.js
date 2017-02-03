import React from 'react'
import _ from 'lodash'
import TodoListHeader from './todo-list-header.js'
import TodosListItem from './todos-list-item.js'
import axios from 'axios'
export default class TodoList extends React.Component{
  renderItems(){
    const props=_.omit(this.props,'todos')
    return _.map(this.props.todos,(todo,index)=>
      <TodosListItem key={index} {...todo} {...props}/>);
  }
  callIt(){
    axios.get('localhost:3500/api/todo/all')
    .then(function(response) {
      console.log('response',response);
    })
  }
  componentWillMount(){
    console.log('entered');
    axios.get('localhost:3500/api/todo/all')
    .then(function(response) {
      console.log('response',response);
    }).catch(function(err) {
      console.log('err',err);
    })

  }
  render(){

    return(
      <table>
        <TodoListHeader/>
        <tbody>
          {this.renderItems()}
        </tbody>

      </table>



    );
  }
}
