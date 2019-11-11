import React, {Component} from 'react';
import './App.css';
import Card from "./Card";
import {connect} from "react-redux";

class App extends Component {


    render() {
        debugger
        const itemElements = this.props.items.map(t =><Card id={t.id} title={t.title} srcImg={t.srcImg} comments={t.comments} />)
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
    debugger
    return {
        items: state.items
    }
}

export default connect(mapStateToProps, null)(App) ;
