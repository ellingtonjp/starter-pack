// A "slice" is a collection of Redux reducer logic and actions for a single
// feature in your app, typically defined together in a single file. The
// name comes from splitting up the root Redux state object into multiple
// "slices" of state.

// Example for blogging app:
//  import { configureStore } from '@reduxjs/toolkit'
//  import usersReducer from '../features/users/usersSlice'
//  import postsReducer from '../features/posts/postsSlice'
//  import commentsReducer from '../features/comments/commentsSlice'
//
//  export default configureStore({
//    reducer: {
//      users: usersReducer,
//      posts: postsReducer,
//      comments: commentsReducer
//    }
//  })

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  scientists: [],
  status: "idle",
  error: null,
};

// These blankify methods are a dumb way to handle the fact that the API
// can return null for some columns. This way each component doesn't have
// to handle the null case.
const blankifyObject = (obj) => {
  for (const [key, value] of Object.entries(obj)) {
    if (!value) {
      obj[key] = "";
    }
  }
  return obj;
};

const blankifyObjects = (objs) => {
  objs.forEach((obj) => {
    blankifyObject(obj);
  });
  return objs;
};

// for some reason, setting the proxy in package.json wasn't working with containers
// absolute URL is working
const API_URL = "http://localhost:3000/api/v1/scientists";

// createAsyncThunk handles the started/success/error stuff, so we don't have to
// write four action creators (actual fetch + started/success/error)
//
// createAsyncThunk takes two args:
//   1. String prefix for created actions
//   2. "payload creator", callback returning a Promise with data (or error)
export const fetchScientists = createAsyncThunk(
  "scientists/fetchScientists",
  async () => {
    const response = await axios.get(API_URL);
    return blankifyObjects(response.data);
  }
);

export const addNewScientist = createAsyncThunk(
  "scientists/addNewScientist",
  // payload creator receives
  async (scientist) => {
    const response = await axios.post(API_URL, {
      scientist: scientist,
    });
    return blankifyObject(response.data);
  }
);

export const updateScientist = createAsyncThunk(
  "scientists/updateScientist",
  async (scientist) => {
    const response = await axios.patch(`${API_URL}/${scientist.id}`, {
      scientist: scientist,
    });
    return blankifyObject(response.data);
  }
);

export const deleteScientist = createAsyncThunk(
  "scientists/deleteScientist",
  async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return blankifyObject(response.data);
  }
);

export const scientistsSlice = createSlice({
  name: "scientists", // reducer "state" arg only receives "scientists" state; nothing else from store
  initialState,
  reducers: {
    scientistAdded: {
      reducer(state, action) {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        state.scientists.push(action.payload);
      },

      // createSlice() creates action creators for us, but sometimes we want
      // custom logic; for example, generating an ID. You don't want to have to
      // do that from the react component that's dispatching the action.
      // Instead, createSlice() offers prepare()
      //
      // When creating reducers this way, use { reducer, prepare } object
      prepare(name, fields, dob, bio) {
        return {
          payload: {
            name,
            fields,
            dob,
            bio,
          },
        };
      },
    },
    scientistUpdated: (state, action) => {
      const { id, name, fields, dob, bio } = action.payload;
      const scientist = state.scientists.find((scientist) => {
        return scientist.id === id;
      });
      scientist.name = name;
      scientist.fields = fields;
      scientist.dob = dob;
      scientist.bio = bio;
    },
  },
  extraReducers: {
    // extraReducers gives us a way to listen for other types of actions, (those
    // not made with createSlice), such as the ones generated by
    // createAsyncThunk.
    //
    // extraReducers takes an object whose keys should be action types strings.
    // We don't have to manually type these strings (though we could) as
    // createAsyncThunk generated action creators have toString(), and we can
    // use the bracket syntax to compute the string.
    [fetchScientists.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchScientists.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.scientists = state.scientists.concat(action.payload);
    },
    [fetchScientists.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [addNewScientist.fulfilled]: (state, action) => {
      state.scientists.push(action.payload);
    },
    [updateScientist.fulfilled]: (state, action) => {
      const { id, name, fields, dob, bio } = action.payload;
      const scientist = state.scientists.find((scientist) => {
        return scientist.id === id;
      });
      scientist.name = name;
      scientist.fields = fields;
      scientist.dob = dob;
      scientist.bio = bio;
    },
    [deleteScientist.fulfilled]: (state, action) => {
      state.scientists = state.scientists.filter(
        (scientist) => scientist.id !== parseInt(action.payload.id)
      );
    },
  },
});

export const { scientistAdded, scientistUpdated } = scientistsSlice.actions;

export default scientistsSlice.reducer;

// Extracting selectors to decouple data access and components
// Components access data in a consistent way, defined here
// Data can change freely without having to rewrite components
export const selectAllScientists = (state) => state.scientists.scientists;
export const selectScientistById = (state, id) => {
  return state.scientists.scientists.find(
    (scientist) => scientist.id === parseInt(id)
  );
};