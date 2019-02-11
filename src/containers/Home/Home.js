import React, {Component} from 'react';
import axios from '../../axis-services';

import Spinner from "../../components/UI/Spinner/Spinner";

class Home extends Component {
    state = {
        page: null,
        loading: true
    };


    getData() {

        let url = 'pages.json';
        let pageId = this.props.match.params.id;
        if (!pageId) {
            pageId = 'home'
        }

        axios.get(url).then(response => {
            const { data } = response;
            const obj = data[pageId];
            this.setState({loading: false, page: obj});
        });

    }

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.getData();
        }
    }

    render() {
        return (
            this.state.loading ?
                <Spinner/> :
                <div className="Home">
                    <h2>{this.state.page.title}</h2>
                    <p>{this.state.page.content}</p>
                </div>
        );
    }
}

export default Home;