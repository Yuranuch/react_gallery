import React, {Component} from "react"
import styles from "./Card.module.css"

class Card extends Component {
    constructor (props) {
        super(props)
    }
    render() {
        return (

            <div className={styles.card}>
                <div>
                    <img src={(this.props.srcImg !== ("self"))? this.props.srcImg : "http://zabavnik.club/wp-content/uploads/2018/07/net_foto_1_20174641.jpg"}
                         alt=""/>
                    <a href={`https://www.reddit.com${this.props.permalink}`} className={styles.link}>
                        {this.props.title}
                    </a>
                </div>
                <div>
                    <span className={styles.comments}>comments: <b>{this.props.comments}</b></span>
                </div>
            </div>

        );
    }
}

export default Card
