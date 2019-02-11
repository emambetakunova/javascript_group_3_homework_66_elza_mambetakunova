import React, {Component, Fragment} from 'react';
import Modal from "../../components/UI/Modal/Modal";


const withErrorHandler = (WrappedComponent, axios) => {
    return class WithErrorHOC extends Component {
        constructor(props) {
            super(props);

            this.state = {
                error: null,
                isLoading: null
            };

            this.state.interceptorId = axios.interceptors.response.use(res => res, error => {
                this.setState({error, isLoading: true});
                throw error;
            });
        }

        componentWillUnmount() {
            axios.interceptors.response.eject(this.state.interceptorId)
        }

        errorDismissed = () => {
            this.setState({error: null, isLoading: false});
        };

        render() {
            return (
                <Fragment>
                    <Modal show={this.state.error} close={this.errorDismissed}>
                        {this.state.error && this.state.error.message}
                    </Modal>
                    <WrappedComponent {...this.props} isLoading={this.state.isLoading} />
                </Fragment>
            )
        }
    };
};


export default withErrorHandler;