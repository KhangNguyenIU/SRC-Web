import React from 'react';
import styles from '@styles/Post/PostCard.module.scss';
import moment from 'moment';
import Link from 'next/link';
/**
 * @author
 * @function PostCard
 **/

export const PostCard = ({ post }) => {
  return (
    <React.Fragment>
      <div className={styles.card}>
        <div className={styles.time}>
          <span className="date">{moment(post.created_at).format('LL')}</span>
          <span className="duration">1 min read</span>
        </div>

        <div className={styles.title}>
          <Link href={`/post/${post.slug}`}>{post.title}</Link>
        </div>

        <span className={styles.button}>
          <Link href={`/post/${post.slug}`}>Read more</Link>
        </span>
      </div>
    </React.Fragment>
  );
};
