import React from 'react';
import { CreatePost } from '@components/Dashboard/Post/CreatePost';
import CategoryService from '@services/category';
import { DashboardLayout } from '@components/Dashboard/Layout';
/**
 * @author
 * @function CreatePostPage
 **/

export default function CreatePostPage({ categories }) {
  return (
    <React.Fragment>
      <DashboardLayout>
        <CreatePost categories={categories} />
      </DashboardLayout>
    </React.Fragment>
  );
}
export async function getServerSideProps() {
  const res = await CategoryService.getAll();
  console.log({ res: res.data });

  return {
    props: {
      categories: res.data,
    },
  };
}

// export default CreatePostPage
