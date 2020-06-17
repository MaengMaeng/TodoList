import React from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native'
import Heading from './Heading'
import Input from './Input'
import Button from './Button'
import TodoList from './TodoList'

let todoIndex = 0

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      inputValue : '',
      todos: [],
      type: 'All'
    }

    this.submitTodo = this.submitTodo.bind(this)
    this.toggleComplete = this.toggleComplete.bind(this)
    this.deleteTodo = this.deleteTodo.bind(this)
  }

  inputChange(inputValue) {
    this.setState({inputValue})
  }

  submitTodo() {
    const {inputValue} = this.state

    if (inputValue.match(/^\s*$/)) {
      return 
    }

    const todo = {
      title: inputValue,
      todoIndex,
      complete: false
    }

    todoIndex++

    const todos = [...this.state.todos, todo]

    this.setState({todos, inputValue:''})
  }

  deleteTodo(todoIndex) {
    let {todos} = this.state
    todos = todos.filter((todo) => todo.todoIndex !== todoIndex)
    this.setState({todos})
  }

  toggleComplete (todoIndex) {
    let {todos} = this.state
    todos.forEach((todo) => {
      if(todo.todoIndex === todoIndex) {
        todo.complete = !todo.complete
      }
    })

    this.setState({todos})
  }

  render() {
    const {inputValue, todos} = this.state

    return (
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps='always'
                    style={styles.content}>
          <Heading/>
          <Input
            inputValue={inputValue}
            inputChange={(text) => this.inputChange(text)}/>
          <TodoList 
            todos={todos}
            toggleComplete={this.toggleComplete}
            deleteTodo={this.deleteTodo}/>
          <Button
            submitTodo={this.submitTodo}/>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  content: {
    flex: 1,
    paddingTop: 60
  }
})

export default App;
