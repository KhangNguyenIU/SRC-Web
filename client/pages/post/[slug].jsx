import Layout from '@components/Layout';
import Post from '@components/Post';
import { Container } from '@mui/system';
import PostService from '@services/post';
import React from 'react';
/**
 * @author
 * @function PostPage
 **/

export const PostPage = ({ post,socket }) => {

  return <React.Fragment>
    <Layout socket={socket}>
        <Container maxWidth="md">
            <Post post={post}/>
        </Container>
    </Layout>
  </React.Fragment>;
};

export default PostPage;
export async function getStaticPaths() {
  const posts = await PostService.getPostList();
  const paths = posts?.data?.posts?.map((post) => {
    return {
      params: {
        slug: `${post.slug}`,
      },
    };
  });

  return {
    paths: paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  let post = await PostService.getPostBySlug(params.slug);
  post = post.data.post;
  return {
    props: {
      post,
    },
  };
}
