import React from 'react';
import styles from './Card.module.css';

function Card() {
    return (
        <div className={styles.card}>
            <img src="" alt="" />
            <span className={styles.title}>
                first image
            </span>
            <span className={styles.comments}>
                Number of comments:
            </span>
            <a href="#" className={styles.link}>Link</a>
        </div>
    );
}

export default Card;
