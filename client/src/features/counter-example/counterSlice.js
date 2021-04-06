import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    increment: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    }
  }
})

// good for complex synchronous logic, or async fetches and things
// can't do async stuff in reducer, it's supposed to be 'pure'
//
// hence thunk: it looks at every action, and if it's a function (instead of 
// a plain old javascript object, like many actions are), it calls it
//
// thunk included automatically with redux-toolkit
export const incrementAsync = amount => dispatch => {
    setTimeout(() => {
        dispatch(incrementByAmount(amount))
    }, 1000)
}

export const { increment, decrement, incrementByAmount } = counterSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = state => state.counter.value

export default counterSlice.reducer

// Excerpt: https://redux.js.org/tutorials/essentials/part-2-app-structure
// 
// We know that actions are plain objects with a type field, that the type 
// field is always a string, and that we typically have "action creator" 
// functions that create and return the action objects. So where are those 
// action objects, type strings, and action creators defined?
// 
// We could write those all by hand, every time. But, that would be tedious. 
// Besides, what's really important in Redux is the reducer functions, and the 
// logic they have for calculating new state.
// 
// Redux Toolkit has a function called createSlice, which takes care of the 
// work of generating action type strings, action creator functions, and action 
// objects. All you have to do is define a name for this slice, write an object 
// that has some reducer functions in it, and it generates the corresponding 
// action code automatically. The string from the name option is used as the 
// first part of each action type, and the key name of each reducer function is 
// used as the second part. So, the "counter" name + the "increment" reducer 
// function generated an action type of { type: "counter/increment" }.
// (After all, why write this by hand if the computer can do it for us!)
//
// For example, the above creates:
//   counterSlice.actions.increment  // action creator
//   reducer:
//     const newState = counterSlice.reducer (
//       { value: 10 }, counterSlice.actions.increment()  // ie, state and action
//     )