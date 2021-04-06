import { configureStore } from '@reduxjs/toolkit'
import scientistsReducer from '../features/scientists/scientistsSlice'
import counterReducer from '../features/counter-example/counterSlice'

export default configureStore({
  reducer: {
    scientists: scientistsReducer,
    counter: counterReducer,
  }
})