import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import HomePage from './pages/HomePage';
import BuyRentMovie from './pages/BuyRentMovie';
import StreamMovie from './pages/StreamMovie';
import OrderPage from './pages/OrderPage';
import CustomerPage from "./pages/CustomerPage";
import CategoriesPage from "./pages/CategoriesPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import EditCustomer from "./pages/EditPages/EditCustomer";
import EditCategories from "./pages/EditPages/EditCategories";
import EditBuyRentMovie from "./pages/EditPages/EditBuyRentMovie";
import EditOrder from "./pages/EditPages/EditOrder";
import EditStreamMovie from "./pages/EditPages/EditStreamMovie";
import EditSubscription from "./pages/EditPages/EditSubscription";

function App() {
  
  return (
    <>
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={HomePage}/>
        <Route path="/physical-movies" exact component={BuyRentMovie}/>
        <Route path="/stream-movies" exact component={StreamMovie}/>
        <Route path="/orders" exact component={OrderPage}/>
        <Route path="/customers" exact component={CustomerPage}/>
        <Route path="/categories" exact component={CategoriesPage}/>
        <Route path="/subscriptions" exact component={SubscriptionPage}/>
      </Switch>
      <Route path="/customers/update/:customer_id" component={EditCustomer}/>
      <Route path="/categories/update/:category_id" component={EditCategories}/>
      <Route path="/physical-movies/update/:pmovie_id" component={EditBuyRentMovie}/>
      <Route path="/stream-movies/update/:smovie_id" component={EditStreamMovie}/>
      <Route path="/orders/update/:order_id" component={EditOrder}/>
      <Route path="/subscriptions/update/:subscription_id" component={EditSubscription}/>
    </Router>
    </>
  );
}

export default App;
