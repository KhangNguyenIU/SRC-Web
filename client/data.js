const majorData = [
    {
        charac: 'Realistic ',
        des: 'Realistic occupations frequently involve work activities that include practical, hands-on problems and solutions. They often deal with plants, animals and real-world materials like wood, tools and machinery. Many of the occupation',
        career: ['horticulturalist', 'builder', 'engineer', 'mechanic', 'electrician', 'computer technologist'],
        sugest: [
            {
                name: 'Electric Engineering',
                link: 'https://hcmiu.edu.vn/en/schools-and-departments/school-of-electrical-engineering/'
            },
            {
                name: 'Computer Science Engineering',
                link: 'https://hcmiu.edu.vn/en/schools-and-departments/school-of-computer-science-and-engineering/'
            },
            {
                name: 'Industrial Engineering and Management',
                link: 'https://hcmiu.edu.vn/en/schools-and-departments/department-of-industrial-and-systems-engineering/'
            }
        ],
        question: {
            vn: [
                'Tôi có tính tự lập'
                , 'Tôi suy nghĩ thực tế'
                , 'Tôi là người thích nghi với môi trường mới'
                , 'Tôi có thể vận hành, điều khiển các máy móc thiết bị'
                , 'Tôi làm các công việc thủ công như gấp giấy, đan, móc'
                , 'Tôi thích tiếp xúc với thiên nhiên, động vật, cây cỏ'
                , 'Tôi thích những công việc sử dụng tay chân hơn là trí óc'
                , 'Tôi thích những công việc thấy ngay kết quả'
                , 'Tôi thích làm việc ngoài trời hơn là trong phòng học, văn phòng'
            ]
        },
        img: 'realistics.svg'
    },
    {
        charac: 'Investigative',
        des: 'Investigative occupations frequently involve working with ideas, and require an extensive amount of thinking. These occupations can involve searching for facts and figuring out problems mentally.',
        career: ['scientist', 'chemist', 'doctor', 'lawyer', 'mathematician', 'professor'],
        sugest: [
            {
                name: 'Mathematics',
                link: 'https://hcmiu.edu.vn/en/schools-and-departments/department-of-mathematics/'
            },
            {
                name: 'Physics',
                link: 'https://hcmiu.edu.vn/en/schools-and-departments/department-of-physics/'
            },
            {
                name: 'Biotechnology',
                link: 'https://hcmiu.edu.vn/en/schools-and-departments/school-of-biotechnology/'
            },
            {
                name: 'Computer Science Engineering',
                link: 'https://hcmiu.edu.vn/en/schools-and-departments/school-of-computer-science-and-engineering/'
            },
            {
                name: 'Chemistry',
                link: 'https://hcmiu.edu.vn/en/schools-and-departments/department-of-environmental-engineering/'
            }
        ],
        question: {
            vn: [
                ' Tôi có tìm hiểu khám phá nhiều vấn đề mới'
                , ' Tôi có khả năng phân tích vấn đề'
                , ' Tôi biết suy nghĩ một cách mạch lạc, chặt chẽ'
                , ' Tôi thích thực hiện các thí nghiệm hay nghiên cứu'
                , ' Tôi có khả năng tổng hợp, khái quát, suy đoán những vấn đề'
                , ' Tôi thích những hoạt động điều tra, phân loại, kiểm tra, đánh giá'
                , ' Tôi tự tổ chức công việc mình phái làm'
                , ' Tôi thích suy nghĩ về những vấn đề phức tạp, làm những công việc phức tạp'
                , ' Tôi có khả năng giải quyết các vấn đề'
            ]
        },
        img: 'investigate.svg'
    },
    {
        charac: 'Artistic',
        des: 'Artistic occupations frequently involve working with forms, designs and patterns. They often require self-expression and the work can be done without following a clear set of rules.',
        career: ['artist', 'musician', 'writer', 'designer', 'actor', 'architect'],
        sugest: [
            {
                name: 'English Languages',
                link: 'https://hcmiu.edu.vn/en/schools-and-departments/department-of-english/'
            }
        ],
        question: {
            vn: [
                'Tôi là người dễ xúc động'
                , 'Tôi có óc tưởng tượng phong phú'
                , 'Tôi thích sự tự do, không theo những quy định , quy tắc'
                , 'Tôi có khả năng thuyết trình, diễn xuất'
                , 'Tôi có thể chụp hình hoặc vẽ tranh, trang trí, điêu khắc'
                , 'Tôi có năng khiếu âm nhạc'
                , 'Tôi có khả năng viết, trình bày những ý tưởng của mình'
                , 'Tôi thích làm những công việc mới, những công việc đòi hỏi sự sáng tạo'
                , 'Tôi thoải mái bộc lộ những ý thích'
            ]
        },
        img: 'aristics.svg'
    },
    {
        charac: 'Social',
        des: 'Social occupations frequently involve working with, communicating with, and teaching people. These occupations often involve helping or providing service to others.',
        career: ['teacher', 'nurse', 'psychologist', 'social worker', 'counselor', 'coach'],
        sugest: [
            {
                name: 'Business Administration',
                link: 'https://hcmiu.edu.vn/en/schools-and-departments/school-of-business/'
            },
            {
                name: 'Economics, Finance and Accounting',
                link: 'https://hcmiu.edu.vn/en/schools-and-departments/school-of-economics-finance-and-accounting/'
            },
            {
                name: 'English Languages',
                link: 'https://hcmiu.edu.vn/en/schools-and-departments/department-of-english/'
            }
        ],
        question: {
            vn: [
                ' Tôi là người thân thiện, hay giúp đỡ người khác'
                , ' Tôi thích gặp gỡ, làm việc với con người'
                , ' Tôi là người lịch sự, tử tế'
                , ' Tôi thích khuyên bảo, huấn luyện hay giảng giái cho người khác'
                , ' Tôi là người biệt lắng nghe'
                , ' Tôi thích các hoạt động chăm sóc sức khỏe của bản thân và người khác'
                , ' Tôi thích các hoạt độngvì mục tiêu chung của công đồng, xã hội'
                , ' Tôi mong muốn mình có thể đóng góp để xã hội tốt đẹp hơn'
                , ' Tôi mong muốn mình có thể đóng góp để xã hội tốt đẹp hơn'
            ]
        },
        img: 'social.svg'
    },
    {
        charac: 'Enterprising',
        des: 'Enterprising occupations frequently involve starting up and carrying out projects. These occupations can involve leading people and making many decisions. Sometimes they require risk taking and often deal with business.',
        career: ['business owner', 'manager', 'politician', 'salesperson', 'lawyer', 'real estate agent'],
        sugest: [
            {
                name: 'Business Administration',
                link: 'https://hcmiu.edu.vn/en/schools-and-departments/school-of-business/'
            },
            {
                name: 'Economics, Finance and Accounting',
                link: 'https://hcmiu.edu.vn/en/schools-and-departments/school-of-economics-finance-and-accounting/'
            },
        ],
        question: {
            vn: [
                ' Tôi là người có tính phiêu lưu, mạo hiểm'
                , ' Tôi có tính quyết đoán'
                , ' Tôi là người năng động'
                , ' Tôi có khả năng diễn đạt, tranh luận, và thuyết phục người khác'
                , ' Tôi thích các việc quản lý, đánh giá'
                , ' Tôi thường đặt ra các mục tiêu, kế hoạch trong cuộc sống'
                , ' Tôi thích gây ảnh hưởng đến người khác'
                , ' Tôi là người thích cạnh tranh, và muốn mình giói hơn người khác'
                , ' Tôi muốn người khác phải kính trọng, nể phục tôi'
            ]
        },
        img: 'enterprising.svg'
    },
    {
        charac: 'Conventional',
        des: 'Conventional occupations frequently involve following set procedures and routines. These occupations can include working with data and details more than with ideas. Usually there is a clear line of authority to follow.',
        career: ['Secretary', 'receptionist', 'office worker', 'librarian', 'bank clerk', 'computer operator'],
        sugest: [
            {
                name: 'Business Administration',
                link: 'https://hcmiu.edu.vn/en/schools-and-departments/school-of-business/'
            },
            {
                name: 'Economics, Finance and Accounting',
                link: 'https://hcmiu.edu.vn/en/schools-and-departments/school-of-economics-finance-and-accounting/'
            },
        ],
        question: {
            vn: [
                'Tôi là người có đầu óc sắp xếp, tổ chức'
                , 'Tôi có tính cẩn thận'
                , 'Tôi là người chu đáo, chính xác và đáng tin cậy'
                , 'Tôi thích công việc tính toán sổ sách, ghi chép số liệu'
                , 'Tôi thích các công việc lưu trữ, phân loại, cập nhất thông tin'
                , 'Tôi thường đặt ra những mục tiêu, kế hoạch trong cuộc sống'
                , 'Tôi thích dự kiến các khoản thu chi'
                , 'Tôi thích lập thời khóa biểu, sắp xếp lịch làm việc'
                , 'Tôi thích làm việc với các con số, làm việc theo hướng dẫn, quy trình'
            ]
        },
        img: 'conventional.svg'
    },
]

const authData = {
    signin: {
        admin: {
            email: "admin@gmail.com",
            password: "123456"
        },
        staff: [
            {
                email: 'cse@gmail.com',
                facultyId: 1,
                username: 'Computer Science Engineering',
                phone: '0123456789',

            },
            {
                email: 'bt@gmail.com',
                facultyId: 2,
                username: 'Biotechnology',
                phone: '012656789',

            },
            {
                email: 'ee@gmail.com',
                facultyId: 3,
                username: 'Electrical Engineering',
                phone: '0908293743',
            },
            {
                email: 'ba@gmail.com',
                facultyId: 4,
                username: 'Business Administration',
                phone: '083478012',
            },
            {
                email: 'eng@gmail,com',
                facultyId: 5,
                username: 'English Languages',
                phone: '0908009705',
            },
            {
                email: 'math@gmail.com',
                facultyId: 6,
                username: 'Mathematics',
                phone: '073462829',
            },
            {
                email: 'phy@gmail.com',
                facultyId: 7,
                username: 'Physics',
                phone: '034278324',
            },
        ],
        user: [
            {
                email: 'khag@gmail.com',
                firstName: 'khang',
                lastName: 'nguyen',
            },
            {
                email: 'john@gmail.com',
                firstName: 'John',
                lastName: 'Doe',
            },
            {
                email: 'mary@gmail.com',
                firstName: 'Mary',
                lastName: 'Doe',
            },
        ]
    },
}
export { authData, majorData }