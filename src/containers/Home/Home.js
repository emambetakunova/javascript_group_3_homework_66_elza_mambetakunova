import React, {Component, Fragment} from 'react';
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
        let url = `services.json?orderBy="id"&equalTo="${pageId}"`

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
        if (prevProps.isLoading !== this.props.isLoading && this.props.isLoading === false) {
            this.setState({loading: false})
        }
    }

    renderPage(page) {
        return (
            <Fragment>
                <h2>{page.title}</h2>
                <p>{page.content}</p>
            </Fragment>
        )
    }

    render() {
        const innerNull = (
            <Fragment>
                <h2>Sorry</h2>
                <p>No content available</p>
            </Fragment>
        );
        return (
            this.state.loading ?
                <Spinner/> :
                <div className="Home">
                    {this.state.page ? this.renderPage(this.state.page) : innerNull}
                </div>
        );
    }
}

export default withErrorHandler(Home, axios);