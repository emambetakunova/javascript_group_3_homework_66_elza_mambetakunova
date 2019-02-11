import React from 'react';
import NavigationItem from "../NavigationItem/NavigationItem";

import './NavigationItems.css';



const NavigationItems = () => (
    <ul className="NavigationItems">
        <NavigationItem to="/" exact>Home</NavigationItem>
        <NavigationItem to="/pages/about" exact>About</NavigationItem>
        <NavigationItem to="/pages/contacts" exact>Contacts</NavigationItem>
        <NavigationItem to="/pages/divisions" exact>Divisions</NavigationItem>
        <NavigationItem to="/pages/admin" exact>Admin</NavigationItem>
    </ul>
);



export default NavigationItems;