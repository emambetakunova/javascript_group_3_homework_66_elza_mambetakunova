import React, {Fragment} from 'react';
import Toolbar from "../Navigation/Toolbar/Toolbar";
import './Layout.css'
import Footer from "../Footer/Footer";

const Layout = props => (
    <Fragment>
        <Toolbar/>
        <main className="Layout-Content">
            {props.children}
        </main>
        <Footer/>
    </Fragment>
);

export default Layout;