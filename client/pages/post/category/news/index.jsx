import Layout from '@components/Layout';
import { PostCardList } from '@components/Post/PostCardList';
import { Container } from '@mui/material';
import PostService from '@services/post';
import React from 'react';

/**
 * @author
 * @function PostByCatePage
 **/

const NewsPage = ({ socket,posts }) => {
  return (
    <React.Fragment>
      <Layout socket={socket}>
        <Container maxWidth="md">
            <PostCardList posts={posts}/>
        </Container>
      </Layout>
    </React.Fragment>
  );
};

export default NewsPage;

export async function getStaticProps(context) {
  let posts = await PostService.getPostByCateSlug('news');
  posts = posts.data.posts;
  return {
    props: {
      posts,
    },
  };
}