import React, { useState } from 'react'
import styles from './Counter.module.css';

// useSelector: grab stuff from store based on selector written in slice
//   required because components can't access store directly (to avoid mutating, 
//     eg store.value = 5)
//   any time action dispatched & store updated, useSelector re-renders component
// useDispatch: dispatch actions
//   required because we don't have access to the store, eg store.dispatch(increment())
import { useSelector, useDispatch } from 'react-redux'
import {
    decrement,
    increment,
    incrementByAmount,
    incrementAsync,
    selectCount
} from './counterSlice'

export function Counter() {
    const count = useSelector(selectCount)
    const dispatch = useDispatch()

    // Not all state should go into redux store
    // GLOBAL / cross component state should go in redux store
    // state like forms and things should stay within component
    const [incrementAmount, setIncrementAmount] = useState('2')

    return (
        <div>
        <div className={styles.row}>
          <button
            className={styles.button}
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
          >
            +
          </button>
          <span className={styles.value}>{count}</span>
          <button
            className={styles.button}
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            -
          </button>
        </div>
        <div className={styles.row}>
          <input
            className={styles.textbox}
            aria-label="Set increment amount"
            value={incrementAmount}
            onChange={e => setIncrementAmount(e.target.value)}
          />
          <button
            className={styles.button}
            onClick={() =>
              dispatch(incrementByAmount(Number(incrementAmount) || 0))
            }
          >
            Add Amount
          </button>
          <button
            className={styles.asyncButton}
            onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
          >
            Add Async
          </button>
        </div>
      </div>
    )
}

export default Counter;