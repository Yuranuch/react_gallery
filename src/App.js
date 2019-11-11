import React, {Component} from 'react';
import './App.css';
import Card from "./Card";
import {connect} from "react-redux";
import {getItems, isLoading} from "./redux/reducer";
import * as axios from "axios";

class App extends Component {
    state = {
        isLoading: false,
        refresh: false
    }

    getAllItems = () => {
        this.setState({
            isLoading: true
        })
        axios.get("https://www.reddit.com/r/reactjs.json?limit=100")
            .then (response => {
                this.setState({
                    isLoading: false
                })
                this.props.getItems(response.data.data.children)
            })
    }
    componentDidMount() {
       this.getAllItems()
    }

    // onInterval = () => {
    //     this.autoRefresh = setInterval(()=>{this.getAllItems()},3000)
    // }

    activateRefresh = () => {
        if(this.state.refresh===false){
            this.setState({refresh: true})
            this.autoRefresh = setInterval(()=>{this.getAllItems()},3000)
        }else {
            this.setState({refresh: false})
            clearInterval(this.autoRefresh)
        }
    }

    deActivateRefresh = () => {
        if(this.state.refresh===true){
            this.setState({refresh: false})
            clearInterval(this.autoRefresh)

        }else {
            this.setState({refresh: true})
            this.autoRefresh = setInterval(()=>{this.getAllItems()},3000)
        }
    }

    render() {
        const commentsSort = this.props.items.sort((a,b)=>b.data.num_comments - a.data.num_comments)
        const itemElements = commentsSort.map(i =><Card
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
                <div className="buttonWrap">
                    {!this.state.refresh?<button onClick={this.activateRefresh}>Start auto-refresh</button>
                :<button onClick={this.deActivateRefresh}>Stop</button> }
                <div>
                    <input
                        className="topFilter"
                        type="range"
                        value={0}
                        min={0}
                        max={500}
                        step={5}
                    />
                </div>
                </div>
                {this.state.isLoading? <p>...LOADING</p> :
                    <div className="galleryWrap">
                        {itemElements}
                    </div>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    debugger
    return {
        items: state.items,
        isLoading: state.isLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getItems: (data) => {
            dispatch(getItems(data))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App) ;

