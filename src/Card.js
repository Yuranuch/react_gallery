import React from 'react';
import styles from './Card.module.css';

function Card(props) {
    return (
        <div className={styles.card}>
            id: {props.id}
            <img src={props.srcImg} alt="" />
            <span className={styles.title}>
                {props.title}
            </span>
            <span className={styles.comments}>
                Number of comments: {props.comments}
            </span>
            <a href={`https://www.reddit.com${props.permalink}`} className={styles.link}>Link</a>
        </div>
    );
}

export default Card;
