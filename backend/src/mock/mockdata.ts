import { ROLE } from '@enums';

const imgs = {
  facultyImg: [
    'https://images.pexels.com/photos/276452/pexels-photo-276452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/8326467/pexels-photo-8326467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/4339335/pexels-photo-4339335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/159581/dictionary-reference-book-learning-meaning-159581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/3781338/pexels-photo-3781338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/714699/pexels-photo-714699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'


  ],
  userImg: [
    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1036627/pexels-photo-1036627.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1821095/pexels-photo-1821095.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/372042/pexels-photo-372042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/247322/pexels-photo-247322.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/975657/pexels-photo-975657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  ],
};

const mockData = {
  faculty: [
    {name:'Computer Science Engineering',avatar: imgs.facultyImg[0]},
    {name:'Biotechnology',avatar:imgs.facultyImg[1] },
    {name:'Electrical Engineering',avatar:imgs.facultyImg[2] },
    {name:'Business Administration',avatar:imgs.facultyImg[3] },
    {name:'English Languages',avatar:imgs.facultyImg[4] },
    {name:'Mathematics',avatar:imgs.facultyImg[5] },
    {name:'Physics',avatar:imgs.facultyImg[6] }
  ],
  users: [
    {
      role: ROLE.staff,
      email: 'cse@gmail.com',
      facultyId: 1,
      username: 'Computer Science Engineering',
      phone: '0123456789',
      avatar: imgs.userImg[0],
    },
    {
      role: ROLE.staff,
      email: 'bt@gmail.com',
      facultyId: 2,
      username: 'Biotechnology',
      phone: '012656789',
      avatar: imgs.userImg[1],
    },
    {
      role: ROLE.staff,
      email: 'ee@gmail.com',
      facultyId: 3,
      username: 'Electrical Engineering',
      phone: '0908293743',
      avatar: imgs.userImg[2],
    },
    {
      role: ROLE.staff,
      email: 'ba@gmail.com',
      facultyId: 4,
      username: 'Business Administration',
      phone: '083478012',
      avatar: imgs.userImg[3],
    },
    {
      role: ROLE.staff,
      email: 'eng@gmail,com',
      facultyId: 5,
      username: 'English Languages',
      phone: '0908009705',
      avatar: imgs.userImg[4],
    },
    {
      role: ROLE.staff,
      email: 'math@gmail.com',
      facultyId: 6,
      username: 'Mathematics',
      phone: '073462829',
      avatar: imgs.userImg[5],
    },
    {
      role: ROLE.staff,
      email: 'phy@gmail.com',
      facultyId: 7,
      username: 'Physics',
      phone: '034278324',
      avatar: imgs.userImg[6],
    },
    {
      role: ROLE.admin,
      email: 'admin@gmail.com',
      username: 'admin',
      avatar: imgs.userImg[7],
    },
    {
      role: ROLE.user,
      email: 'khag@gmail.com',
      firstName: 'khang',
      lastName: 'nguyen',
      avatar: imgs.userImg[8]

    },
    {
      role: ROLE.user,
      email: 'john@gmail.com',
      firstName: 'John',
      lastName: 'Doe',
      avatar: imgs.userImg[9]

    },
    {
      role: ROLE.user,
      email: 'mary@gmail.com',
      firstName: 'Mary',
      lastName: 'Doe',
      avatar: imgs.userImg[10]

    },
  ],
};

export { mockData as MockData };
