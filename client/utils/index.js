import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import MoneyIcon from '@mui/icons-material/Money';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import SendIcon from '@mui/icons-material/Send';
import DashboardIcon from '@mui/icons-material/Dashboard';


export const isAuth = user => user.email != "" && user.role != "" && user.id != "" && user.firstName != ""


export const santinizedFB = (feedbacks, feedBackRange) => {
    if (!feedbacks || !feedbacks.length) return { avg: 0, total: 0, percentObj: [] }
    const sumObj = feedbacks.reduce((acc, fb) => {
        acc.total += Number(fb.rating)
        acc.count += Number(fb.count)
        return acc
    }, { total: 0, count: 0 })

    const percentObj = feedBackRange.reduce((acc, fb) => {
        const fbObj = feedbacks.find(f => f.feedback_rating === Number(fb))
        acc[fb - 1] = fbObj ? parseInt(Number(fbObj.count) / sumObj.count * 100) : 0
        return acc
    }, [])

    return {
        avg: Number(parseFloat(sumObj.total / sumObj.count).toFixed(1)),
        total: Number(sumObj.count),
        percentObj
    }
}

export const santinizeUserStatData = (data) => {
    let obj = {}
    for (let [keys, values] of Object.entries(data)) {
        obj[keys] = [[], []]
        values.map((item) => {
            let [key, value] = Object.entries(item)
            obj[keys][0].push(key[1])
            obj[keys][1].push(value[1])
        })
    }
    return obj
}


export const roleStatData = (labels, data) => {
    return {
        labels: labels,
        datasets: [
            {
                label: 'Number of account',
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
}

export const roleStatOptions = {
    plugins: {
        title: {
            text: 'Number of account by role',
            display: true,
        },
    },
};


export const locationStatData = (labels, data) => {
    return {
        labels: labels,
        datasets: [
            {
                label: 'Province',
                data: data,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };
};

export const locationStatOptions = {
    plugins: {
        title: {
            text: 'Location of student account',
            display: true,
        },
    },
    scales: {
        y: {
            min: 0,
            max: 20,
            ticks: {
                stepSize: 1,
            },
        },
    },
};



export const SchoolStatData = (labels, data) => {
    return {
        labels: labels,
        datasets: [
            {
                label: 'School',
                data: data,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };
};

export const SchoolStatOptions = {
    plugins: {
        title: {
            text: 'School of student account',
            display: true,
        },
    },
    scales: {
        y: {
            min: 0,
            max: 20,
            ticks: {
                stepSize: 1,
            },
        },
    },
};

export const meanStatData = (labels, data) => {
    return {
        labels: labels,
        datasets: [
            {
                label: 'Mean',
                data: data,
                backgroundColor: 'rgba(255, 206, 86, 0.5)',
            },
        ],
    };
}

export const meanStatOptions = {
    plugins: {
        title: {
            text: 'Mean of student know about us',
            display: true,
        },
    },
    scales: {
        y: {
            min: 0,
            max: 20,
            ticks: {
                stepSize: 1,
            },
        },
    },
}


export const interestLvStatData = (labels, data) => {
    return {
        labels: labels,
        datasets: [
            {
                label: 'Mean',
                data: data,
                backgroundColor: '#408E91',
            },
        ],
    };
}

export const interestLvStatOptions = {
    plugins: {
        title: {
            text: 'level of interest of student',
            display: true,
        },
    },
    scales: {
        y: {
            min: 0,
            max: 20,
            ticks: {
                stepSize: 1,
            },
        },
    },
}

export const navItems = [
    { item: 'Home', link: '/', icon: <HomeIcon sx={{ color: '#7F8487' }} /> },
    {
        item: 'Recruiment',
        link: '/post/category/recruitment',
        icon: <ArticleIcon sx={{ color: '#7F8487' }} />,
    },
    {
        item: 'News',
        link: '/post/category/news',
        icon: <NewspaperIcon sx={{ color: '#7F8487' }} />,
    },
    { item: 'Benchmart', link: '/post/category/benchmark', icon: <MoneyIcon /> },
    {
        item: 'Enrollment Project',
        link: '/post/category/enrollment-project',
        icon: <AppRegistrationIcon />,
    },
    { item: 'Contact', link: '/contact', icon: <ContactMailIcon /> },
];

export const privateItems = [
    {
        item: 'Message',
        link: '/private/message',
        icon: <SendIcon sx={{ color: '#7F8487' }} />,
    },
];

export const adminItems = [
    {
        item: 'Dashboard',
        link: '/private/dashboard',
        icon: <DashboardIcon sx={{ color: '#7F8487' }} />,
    },
];
