import React, {Component} from 'react';
import './App.css';
import Card from "./Card";
import {connect} from "react-redux";
import {getItems} from "./redux/reducer";
import * as axios from "axios";

class App extends Component {

    componentDidMount() {
        axios.get("https://www.reddit.com/r/reactjs.json?limit=100")
            .then (response => {
                debugger
                this.props.getItems(response.data.data.children)
            })
            //     return response.json();
            // })
            // .then(data => {
            //     console.log(data)
            // })
    }

    render() {
        const itemElements = this.props.items.map(i =><Card
            id={i.data.id}
            key={i.data.id}
            title={i.data.title}
            srcImg={i.data.thumbnail}
            comments={i.data.num_comments}
            permalink={i.data.permalink}
        />)
        return (
            <div className="App">
                <div><h3>Commented</h3></div>
                <div className="galleryWrap">
                    {/*<Card id={this.props.id} title={this.props.title} srcImg={this.props.srcImg} comments={this.props.comments} />*/}
                    {itemElements}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.items
    }
}
const mapDispatchToProps = (dispatch) => {

    return {
        getItems: (data) => {
            dispatch(getItems(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App) ;

