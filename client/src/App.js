import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import{createUploadLink}from'apollo-upload-client'
import {from,HttpLink ,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Header from './components/Header';
// import Footer from './components/Footer';
// import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SingleThought from './pages/SingleThought';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from "./components/PaymentForm";
import { loadStripe } from "@stripe/stripe-js";
//IMPORT PAGES
import HomeMain from './pages/HomeMain';
import MainSearch from './pages/MainSearch';
import BusinessPage from './pages/BusinessPage';
import BusinessReview from './pages/BusinessReview';


//IMPORT COMPONENTS
import NavbarMain from './components/NavbarMain';
import HeroMain from './components/HeroMain';
import HeroBusiness from './components/HeroBusiness';
import Top5Card from './components/Top5Card';
import SearchBCard from './components/SearchBCard';
import Footer from './components/Footer';

import './index.css'



const stripePromise = loadStripe("pk_test_51KaouJLvQuwH79AnN7yEfoHv5B2ecn6fLOIgKx1siq59pTuioxmpCYDGsAMZtGWZ6eI63rSU9ckt9DZCPVjYNVnZ00iGHVuw44");

const httpLink = createHttpLink({
  uri: '/graphql',
});

const clientUpload =createUploadLink({
  link:createUploadLink({
    uri:'/graphql'
  })
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const additiveLink = from([
  createUploadLink(),
  
  authLink.concat(new HttpLink({ uri: '/graphql'}))
])


const client = new ApolloClient({
  link: authLink.concat(clientUpload),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        
          <NavbarMain />
      
            <Switch>
              <Route exact path="/" component={HomeMain} />
              <Route exact path="/search" component={MainSearch} />
              <Route exact path="/search/:filter" component={MainSearch} />
              <Route exact path="/bpage" component={BusinessPage} />
              <Route exact path="/bpage/:id" component={BusinessPage} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route path="/signup/pay" component={() => {
                return <Elements stripe={stripePromise}>
                  <PaymentForm />
                </Elements>
              }} />
              <Route exact path="/profile/:username?" component={Profile} />
              <Route exact path="/thought/:id" component={SingleThought} />
              <Route component={NoMatch} />
            </Switch>
          
          <Footer />
       
      </Router>
    </ApolloProvider>
  );
}

export default App;
