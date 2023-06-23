import Layout from '@components/Layout';
import TitleLayout from '@components/Layout/TitleLayout';
import { PostCardList } from '@components/Post/PostCardList';
import { Container } from '@mui/material';
import PostService from '@services/post';
import React from 'react';

/**
 * @author
 * @function PostByCatePage
 **/

const NewsPage = ({ socket, posts }) => {
  return (
    <React.Fragment>
      <Layout socket={socket}>
        <TitleLayout h2="Posts" h1="News">
          <Container maxWidth="md">
            <PostCardList posts={posts} />
          </Container>
        </TitleLayout>
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
