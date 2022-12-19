import Layout from '@components/Layout';
import { Container } from '@mui/system';
import PostService from '@services/post';
import React from 'react';
import { useEffect } from 'react';
import renderHTML from 'react-render-html';
/**
 * @author
 * @function PostPage
 **/

export const PostPage = ({ post }) => {
  console.log({ post });

  return <React.Fragment>
    <Layout>
        <Container maxWidth="md">
            {renderHTML(post.body)}
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
