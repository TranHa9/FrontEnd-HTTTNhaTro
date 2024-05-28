import icons from "./icons";

const { FaPencilAlt, MdOutlinePostAdd, FaUserTag, MdOutlineContactMail, MdOutlineManageAccounts, GrUserManager, RiHeartFill, BiCategory } = icons;

const menuManage = [
    {
        id: '1',
        text: 'Đăng tin cho thuê',
        permissions: ['admin', 'user'],
        path: "/he-thong/tao-moi-bai-dang",
        icon: <FaPencilAlt />
    },
    {
        id: '2',
        text: 'Quản lý tin đăng',
        permissions: ['user'],
        path: "/he-thong/quan-ly-bai-dang",
        icon: <MdOutlinePostAdd />
    },
    {
        id: '3',
        text: 'Quản lý tin đăng',
        permissions: ['admin'],
        path: "/he-thong/quan-ly-tat-ca-bai-dang",
        icon: <MdOutlinePostAdd />
    },
    {
        id: '4',
        text: "Quản lý người dùng",
        permissions: ['admin'],
        path: "/he-thong/quan-ly-nguoi-dung",
        icon: <MdOutlineManageAccounts />
    },
    {
        id: '5',
        text: 'Thông tin tài khoản',
        permissions: ['admin', 'user'],
        path: "/he-thong/thong-tin-tai-khoan",
        icon: <GrUserManager />
    },
    {
        id: '6',
        text: 'Duyệt bài đăng',
        permissions: ['admin'],
        path: "/he-thong/duyet-bai-dang",
        icon: <FaUserTag />
    },
    {
        id: '7',
        text: 'Quản lý chuyên mục',
        permissions: ['admin'],
        path: "/he-thong/quan-ly-chuyen-muc",
        icon: <BiCategory />
    },
    {
        id: '8',
        text: 'Tin đã lưu',
        permissions: ['admin', 'user'],
        path: "/tin-da-luu",
        icon: <RiHeartFill />
    },
]
const menuSidebar = [
    {
        id: '1',
        text: 'Đăng tin cho thuê',
        permissions: ['admin', 'user'],
        path: "/he-thong/tao-moi-bai-dang",
        icon: <FaPencilAlt />
    },
    {
        id: '2',
        text: 'Quản lý tin đăng',
        permissions: ['user'],
        path: "/he-thong/quan-ly-bai-dang",
        icon: <MdOutlinePostAdd />
    },
    {
        id: '3',
        text: 'Quản lý tin đăng',
        permissions: ['admin'],
        path: "/he-thong/quan-ly-tat-ca-bai-dang",
        icon: <MdOutlinePostAdd />
    },
    {
        id: '4',
        text: "Quản lý người dùng",
        permissions: ['admin'],
        path: "/he-thong/quan-ly-nguoi-dung",
        icon: <MdOutlineManageAccounts />
    },
    {
        id: '5',
        text: 'Thông tin tài khoản',
        permissions: ['admin', 'user'],
        path: "/he-thong/thong-tin-tai-khoan",
        icon: <GrUserManager />
    },
    {
        id: '6',
        text: 'Duyệt bài đăng',
        permissions: ['admin'],
        path: "/he-thong/duyet-bai-dang",
        icon: <FaUserTag />
    },
    {
        id: '7',
        text: 'Quản lý chuyên mục',
        permissions: ['admin'],
        path: "/he-thong/quan-ly-chuyen-muc",
        icon: <BiCategory />
    },
    {
        id: '8',
        text: 'Liên hệ',
        permissions: ['admin', 'user'],
        path: "/lien-he",
        icon: <MdOutlineContactMail />
    },

]

export { menuManage, menuSidebar };