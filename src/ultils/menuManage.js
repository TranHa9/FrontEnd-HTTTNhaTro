import icons from "./icons";

const { ImPencil2, MdOutlinePostAdd, FaUserTag } = icons;

const menuManage = [
    {
        id: 1,
        text: "Đăng tin cho thuê",
        path: "/he-thong/tao-moi-bai-dang",
        icon: <ImPencil2 />
    },
    {
        id: 2,
        text: "Quản lý tin đăng",
        path: "/he-thong/quan-ly-bai-dang",
        icon: <MdOutlinePostAdd />
    },
    {
        id: 3,
        text: "Thông tin tài khoản",
        path: "/he-thong/thong-tin-tai-khoan",
        icon: <FaUserTag />
    },
]
const menuSidebar = [
    {
        id: '1',
        text: 'Đăng tin cho thuê',
        permissions: ['R1', 'R2'],
        path: "/he-thong/tao-moi-bai-dang",
        icon: <ImPencil2 />
    },
    {
        id: '2',
        text: 'Quản lý tin đăng',
        permissions: ['R2'],
        path: "/he-thong/quan-ly-bai-dang",
        icon: <MdOutlinePostAdd />
    },
    {
        id: '3',
        text: 'Quản lý tin đăng',
        permissions: ['R1'],
        path: "/he-thong/quan-ly-tat-ca-bai-dang",
        icon: <MdOutlinePostAdd />
    },
    {
        id: '4',
        text: "Quản lý người dùng",
        permissions: ['R1'],
        path: "/he-thong/quan-ly-nguoi-dung",
        icon: <FaUserTag />
    },
    {
        id: '5',
        text: 'Thông tin tài khoản',
        permissions: ['R1', 'R2'],
        path: "/he-thong/thong-tin-tai-khoan",
        icon: <FaUserTag />
    },
    {
        id: '6',
        text: 'Liên hệ',
        permissions: ['R1', 'R2'],
        path: "/lien-he",
        icon: <FaUserTag />
    },
    {
        id: '7',
        text: 'Duyệt bài đăng',
        permissions: ['R1'],
        path: "/he-thong/duyet-bai-dang",
        icon: <FaUserTag />
    },

]

export { menuManage, menuSidebar };