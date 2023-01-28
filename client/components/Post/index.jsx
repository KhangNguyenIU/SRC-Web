import React from 'react'
import renderHTML from 'react-render-html';
import styles from '@styles/Post.module.scss'
import moment from 'moment'
export default function Post({post}) {
    console.log(post)
    console.log(moment(post.created_at).format('LL'))
  return (
    <React.Fragment>
        <div className={styles.header}>
            <div className={styles.publised}>
                <span>Published on {moment(post.created_at).format('LL')} </span>
            </div>

            <div className={styles.heading}>
                {post.title}
            </div>
        </div>
        <div className='body'>
        {renderHTML(post.body)}
        </div>
    </React.Fragment>
  )
}
