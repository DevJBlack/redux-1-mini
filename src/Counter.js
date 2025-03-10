import React, { Component } from 'react';
import store from './store'

import { INCREMENT, DECREMENT, UNDO, REDO } from './store'


class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store: store.getState()
    };
  }

  componentDidMount(){
    store.subscribe(() => {
      this.setState({
        store: store.getState()
      })
    })
  }

  increment(amount) {
    store.dispatch({ type: INCREMENT, payload: amount })
  }

  decrement(amount){
    store.dispatch({ type: DECREMENT, payload: amount})
  }

  undo(){
    store.dispatch({ type: UNDO})
  }

  redo(){
    store.dispatch({ type: REDO })
  }


  render() {
    return (
      <div className="app">
        <section className="counter">
          <h1 className="counter__current-value">{this.state.store.currentValue}</h1>
          <div className="counter__button-wrapper">
            <button
              className="counter__button increment-one"
              onClick={() => this.increment(1)}
            >
              +1
            </button>
            <button
              className="counter__button increment-five"
              onClick={() => this.increment(5)}
            >
              +5
            </button>
            <button
              className="counter__button decrement-one"
              onClick={() => this.decrement(1)}
            >
              -1
            </button>
            <button
              className="counter__button decrement-five"
              onClick={() => this.decrement(5)}
            >
              -5
            </button>
            <br />
            <button
              className="counter__button undo"
              disabled={this.state.store.previousValues.length === 0}
              onClick={() => this.undo()}
            >
              Undo
            </button>
            <button
              className="counter__button redo"
              disabled={this.state.store.futureValues.length === 0}
              onClick={() => this.redo()}
            >
              Redo
            </button>
          </div>
        </section>
        <section className="state">
          <pre>{JSON.stringify(this.state, null, 2)}</pre>
        </section>
      </div>
    );
  }
}

export default Counter;
