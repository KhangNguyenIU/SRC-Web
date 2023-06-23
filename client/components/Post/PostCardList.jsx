import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React, { useEffect, useMemo } from 'react';
import { PostCard } from './PostCard';
import PostService from '@services/post';
import { useDispatch } from 'react-redux';
import { setLoading, stopLoading } from 'slices/util/loading.slice';
import { showNotification } from 'slices/util/notification.slice';
import { useRouter } from 'next/router';

/**
 * @author
 * @function PostCardList
 **/

export const PostCardList = ({ posts }) => {
  const [postList, setPostList] = React.useState([]);
  const [order, setOrder] = React.useState('new');
  const dispatch = useDispatch();
  const router = useRouter();

  const cate = useMemo(() => {
    const routeLength = router.route.split('/').length;
    return router.route.split('/')[routeLength - 1];
  }, []);
  useEffect(() => {
    setPostList(posts);
  }, [posts]);

  const handleChange = async (event, cate) => {
    dispatch(setLoading());
    setOrder(event.target.value);
    let orderObj = {};
    switch (event.target.value) {
      case 'new':
        orderObj = {
          order: 'date',
          orderSign: 'DESC',
        };
        break;
      case 'old':
        orderObj = {
          order: 'date',
          orderSign: 'ASC',
        };
        break;
      case 'a-z':
        orderObj = {
          order: 'alphabet',
          orderSign: 'ASC',
        };
        break;
      case 'z-a':
        orderObj = {
          order: 'alphabet',
          orderSign: 'DESC',
        };
        break;
      default:
        orderObj = {
          order: 'date',
          orderSign: 'DESC',
        };
        break;
    }
    const res = await PostService.getPostByCateSlug(cate, orderObj);
    if (res.status === 200) {
      setPostList(res.data.posts);
    } else {
      dispatch(
        showNotification({ message: 'Error in load posts list', type: 'error' })
      );
    }
    dispatch(stopLoading());
  };

  return (
    <React.Fragment>
      <div
        style={{ display: 'flex', flexDirection: 'column', marginTop: '2rem' }}
      >
        {/* <div
          style={{
            width: '100%',
            padding: '4rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{fontSize:'3rem'}}>{cate}</div>
        </div> */}
        <div>
          {/* Filter by{' '} */}
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              defaultValue={order}
              value={order}
              onChange={(e) => handleChange(e, cate)}
              label="order"
            >
              <MenuItem value={'new'}>New</MenuItem>
              <MenuItem value={'old'}>Old</MenuItem>
              <MenuItem value={'a-z'}>A-Z</MenuItem>
              <MenuItem value={'z-a'}>Z-A</MenuItem>
            </Select>
          </FormControl>
        </div>
        {!!postList.length &&
          postList.map((post, index) => <PostCard key={index} post={post} />)}
      </div>
    </React.Fragment>
  );
};
