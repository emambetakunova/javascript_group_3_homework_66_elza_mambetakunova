import React, {Component} from 'react';
import axios from '../../axios-services';

import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Home extends Component {
    state = {
        page: null,
        loading: true
    };


    getData() {

        let pageId = this.props.match.params.id;
        if (!pageId) {
            pageId = 'home'
        }
        let url = `services.jsodn?orderBy="id"&equalTo="${pageId}"`

        axios.get(url).then(response => {
            const {data} = response;
            const obj = data ? data[pageId] : {};
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

export default withErrorHandler(Home, axios);