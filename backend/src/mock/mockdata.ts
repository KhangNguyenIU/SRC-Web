import { ROLE } from '@enums';

const mockData = {
  faculty: [
    'Computer Science Engineering',
    'Biotechnology',
    'Electrical Engineering',
    'Business Administration',
    'English Languages',
    'Mathematics',
    'Physics',
  ],
  users: [
    {
      role: ROLE.staff,
      email: 'cse@gmail.com',
      facultyId: 1,
      username: 'Computer Science Engineering',
    },
    {
      role: ROLE.staff,
      email: 'bt@gmail.com',
      facultyId: 2,
      username: 'Biotechnology',
    },
    {
      role: ROLE.staff,
      email: 'ee@gmail.com',
      facultyId: 3,
      username: 'Electrical Engineering',
    },
    {
      role: ROLE.staff,
      email: 'ba@gmail.com',
      facultyId: 4,
      username: 'Business Administration',
    },
    {
      role: ROLE.staff,
      email: 'eng@gmail,com',
      facultyId: 5,
      username: 'English Languages',
    },
    {
      role: ROLE.staff,
      email: 'math@gmail.com',
      facultyId: 6,
      username: 'Mathematics',
    },
    {
      role: ROLE.staff,
      email: 'phy@gmail.com',
      facultyId: 7,
      username: 'Physics',
    },
    { role: ROLE.admin, email: 'admin@gmail.com', username: 'admin' },
    {
      role: ROLE.user,
      email: 'khag@gmail.com',
      firstName: 'khang',
      lastName: 'nguyen',
    },
    {
      role: ROLE.user,
      email: 'john@gmail.com',
      firstName: 'John',
      lastName: 'Doe',
    },
    {
      role: ROLE.user,
      email: 'mary@gmail.com',
      firstName: 'Mary',
      lastName: 'Doe',
    },
  ],
};

export { mockData as MockData };
