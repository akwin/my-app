import React, { Component } from 'react';
import classes from './App.module.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Aux';
 

class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js constructor]');
  }


  state = {
    persons: [
      {id: 'asf', name: 'Akanksha', age: 25 },
      {id: 'asdf', name: 'Amol', age: 24 },
      {id: 'asdfg', name: 'Akhilesh', age: 21 }
    ],
    showPersons: false,
    showCockpit: true,
    changeCounter: 0
  }

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] get derived state from props', props);
    return state;
  }

  componentDidMount () {
    console.log('[App.js] component did mount ;)');
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js should component update?]');
    return true;
  }


  componentDidUpdate () {
    console.log('[App.js] component did update');
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;


    this.setState((prevState, props) => {
      return { 
        persons: persons,
        changeCounter: prevState.changeCounter + 1
      };
    });
  };

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice();
    // use the above method or the spread operator described below
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons})
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render() {
    console.log('[App.js has rendered!]');
    let persons = null;

    if (this.state.showPersons) {
      persons = 
          <Persons
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler} />
    }
    
    return (
   
      <Aux> 
      <button onClick={() => {
          this.setState({ showCockpit: false });
          }}
          > 
          Remove Cockpit 
      </button> 
      {this.state.showCockpit ? <Cockpit 
          title={this.props.appTitle}
          showPersons={this.state.showPersons}
          personsLength={this.state.persons.length}
          clicked={this.togglePersonsHandler} /> : null
          }
        {persons}
      </Aux>
   
    );
  }
}

export default withClass(App, classes.App);
