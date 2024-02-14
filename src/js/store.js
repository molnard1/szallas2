import { configureStore, createSlice } from '@reduxjs/toolkit';
import { rememberReducer, rememberEnhancer } from 'redux-remember';

const pizzaDataSlice = createSlice({
    name: 'pizzaData',
    initialState: [],
    reducers: {
        setPizzaData: (state, action) => {
            state = action.payload;
            return state;
        },
        editPizzaLocal: (state, action) => {
            const editedPizza = action.payload;
            return state.map((pizza) =>
                pizza.id === editedPizza.id ? editedPizza : pizza
            );
        },
        deletePizzaLocal: (state, action) => {
            const postId = action.payload;
            return state.filter((post) => post.id != postId);
        }
    }
});

const loggedInSlice = createSlice({
    name: 'loggedIn',
    initialState: false,
    reducers: {
        setLoggedIn: (state, action) => {
            state = action.payload;
            return state;
        }
    }
})

const reducers = {
    pizzaData: pizzaDataSlice.reducer,
    loggedIn: loggedInSlice.reducer
};

const rememberedKeys = [ 'loggedIn' ];

const reducer = rememberReducer(reducers);
const store = configureStore({
  reducer,
  enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(
    rememberEnhancer(
      window.localStorage,
      rememberedKeys
    )
  )
});

export const { setPizzaData, deletePizzaLocal, editPizzaLocal } = pizzaDataSlice.actions;
export const { setLoggedIn } = loggedInSlice.actions;

export default store;