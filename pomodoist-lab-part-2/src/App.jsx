import React from 'react';
import Timer from './components/Timer';
import TodoItem from './components/TodoItem';
import TodoInput from './components/TodoInput';
import ClearButton from './components/ClearButton';
import EmptyState from './components/EmptyState';

import './styles/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.clearCompletedItems = this.clearCompletedItems.bind(this);
    this.startSession = this.startSession.bind(this);
    this.increaseSessionsCompleted = this.increaseSessionsCompleted.bind(this);
    this.toggleItemIsCompleted = this.toggleItemIsCompleted.bind(this);

    this.state = {
      items: [],
      nextItemId: 0,
      sessionIsRunning: false,
      itemIdRunning: null,
    };
  }

  addItem(description) {
    const { nextItemId } = this.state;
    const newItem = {
      id: nextItemId,
      description,
      sessionsCompleted: 0,
      isCompleted: false
    };
    this.setState((prevState => ({
      items: prevState.items.concat([newItem]),
      nextItemId: prevState.nextItemId + 1,
      // TODO 2: append new items to list and increase nextItemId by 1
    })));
  }

  clearCompletedItems() {
    // TODO 6
  }

  increaseSessionsCompleted(itemId) {
    const copyitems = [...this.state.items]
    var i;
    for(i=0; i < copyitems.length; i++) {
      if(copyitems[i].id === itemId) {
        copyitems[i].sessionsCompleted +=1;
      }
    }
    this.setState({items: copyitems})
  }

  toggleItemIsCompleted(itemId) {
    const copyitems = [...this.state.items]
    var i; 
    for(i=0; i< copyitems.length; i++) {
      if(copyitems[i].id === itemId) {
        if(copyitems[i].isCompleted == true) {
          copyitems[i].isCompleted = false;
        } else {
          copyitems[i].isCompleted = true;
        }
      }
    }
    this.setState({items: copyitems})

  }

  startSession(id) {
    this.setState(
      {sessionIsRunning: true, 
      itemIdRunning: id,}
    )
  }

  render() {
    const {
      items,
      sessionIsRunning,
      itemIdRunning,
      areItemsMarkedAsCompleted,
    } = this.state;
    return (
      <div className="flex-wrapper">
        <div className="container">
          <header>
            <h1 className="heading">Today</h1>
            <ClearButton onClick={this.clearCompletedItems} />
          </header>
            {<Timer
              mode="WORK"
              onSessionComplete={() => this.increaseSessionsCompleted(itemIdRunning)}
              key = {itemIdRunning}
              autoPlays
            />}
            <div className="items-container">
            {this.state.items.map((item) => 
              <TodoItem 
                description = {item.description}
                sessionsCompleted = {item.sessionsCompleted}
                isCompleted = {() => this.toggleItemIsCompleted(itemIdRunning)}
                key={item.id}
                startSession = {() => this.startSession(item.id)}
                toggleIsCompleted
              />
              )
    
              /* TODO 3:  display todo items */
              }
            </div>
        </div>
        <footer>
          <TodoInput addItem={this.addItem} />
        </footer>
      </div>
    );
  }
}

export default App;
