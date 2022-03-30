import React, { createContext, useContext } from 'react';
import { useBusinessReducer } from './reducers';

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
    const [ state, dispatch] = useBusinessReducer({
        business: [],
        votes: [],
        thoughts: [],
        currentBusiness: " ",
        businessProp: " ",
        location: " ",
        title: " ",
        me: {}
    });
    // use this to confirm it works!
    console.log(state);
    return <Provider value={[state,dispatch]} {...props} />;
};

const useStoreContext = () => {
    return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };