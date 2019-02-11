import React, {Component} from 'react';
import {CATEGORYPAGES} from "../../constants";
import axios from '../../axios-services';

import './EditorForm.css'
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class EditorForm extends Component {

    state = {
        title: '',
        content: '',
        pageId: CATEGORYPAGES[0],
        loading: true
    };

    getData = (pageId) => {

        let url = 'services.json';

        axios.get(url).then(response => {
            const { data } = response;
            const obj = data[pageId];
            const title = obj.title;
            const content = obj.content;
            this.setState({loading: false, title: title, content: content, pageId: pageId});
        });

    };

    componentDidMount() {
        this.getData(this.state.pageId);
    }

    valueChanged = event => {
        const {name, value} = event.target;

        this.setState({[name]: value})
    };

    submitHandler = (event) => {
        const item = {
            title: this.state.title,
            content: this.state.content
        };
        event.preventDefault();
        axios.put('services/' + this.state.pageId + '.json', item).then(() => {
            this.props.history.push({
                pathname: '/services/' + this.state.pageId
            });
        })
    };

    idChanged = event => {
        this.getData(event.target.value);
    };

    onFocus = event => {
        const {name} = event.target;

        this.setState({[name]: ''})
    };

    render() {
        return (
            <form className="EditorForm" onSubmit={event => this.submitHandler(event)}>
                <p>Select page: </p>
                <select name="categoryPage" onChange={this.idChanged} value={this.state.pageId} className="SelectEditor">
                    {CATEGORYPAGES.map(categoryId => (
                        <option key={categoryId} value={categoryId}>{categoryId}</option>
                    ))}
                </select>
                <p>Title: </p>
                <input type="text" name="title" placeholder="Title" value={this.state.title}
                       onChange={this.valueChanged} onFocus={this.onFocus}  className="InputEditor" />
                <p>Content: </p>
                <textarea name="content" placeholder="Content" value={this.state.content}
                          onChange={this.valueChanged} onFocus={this.onFocus}  className="InputEditor"/>
                <button type="submit" className="Save">Save</button>
            </form>
        );
    }
}

export default withErrorHandler(EditorForm, axios);