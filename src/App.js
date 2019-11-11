import React, {PureComponent} from 'react';
import './App.css';
import Card from "./Card";
import {connect} from "react-redux";
import {getItems} from "./redux/reducer";
import * as axios from "axios";

class App extends PureComponent {
    state = {
        isLoading: false,
        refresh: false,
        minComments: 0
    }

    getAllItems = () => {
        this.setState({
            isLoading: true
        })
        axios.get("https://www.reddit.com/r/reactjs.json?limit=100")
            .then(response => {
                this.setState({
                    isLoading: false
                })
                this.props.getItems(response.data.data.children)
            })
    }

    componentDidMount() {
        this.getAllItems()
    }

    activateRefresh = () => {
        if (this.state.refresh === false) {
            this.setState({refresh: true})
            this.autoRefresh = setInterval(() => {
                this.getAllItems()
            }, 3000)
        } else {
            this.setState({refresh: false})
            clearInterval(this.autoRefresh)
        }
    }

    deActivateRefresh = () => {
        if (this.state.refresh === true) {
            this.setState({refresh: false})
            clearInterval(this.autoRefresh)

        } else {
            this.setState({refresh: true})
            this.autoRefresh = setInterval(() => {
                this.getAllItems()
            }, 3000)
        }
    }

    onchangeMinComments = (e) => {
        this.setState({
            minComments: Number(e.currentTarget.value)
        })
    }

    render() {
        const commentsSort = this.props.items.sort((a, b) => b.data.num_comments - a.data.num_comments)
            .filter(i => i.data.num_comments >= this.state.minComments)
        const itemElements = commentsSort.map(i => <Card
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
                    {!this.state.refresh ? <button onClick={this.activateRefresh}>Start auto-refresh</button>
                        : <button onClick={this.deActivateRefresh}>Stop</button>}
                    <div>
                        <span>Current Filter: {this.state.minComments}</span>
                    </div>
                    <div>
                        <input
                            className="topFilter"
                            type="range"
                            value={this.state.minComments}
                            min={0}
                            max={500}
                            onChange={this.onchangeMinComments}
                        />
                    </div>
                </div>
                {this.state.isLoading ? <p>...LOADING</p> :
                    <div className="galleryWrap">
                        {itemElements.length > 0 ? itemElements : <p>No result</p>}
                    </div>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(App);

