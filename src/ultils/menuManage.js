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
    {
        id: 4,
        text: "Liên hệ",
        path: "/lien-he",
        icon: <FaUserTag />
    },
    {
        id: 5,
        text: "Thông tin người dùng",
        path: "/he-thong/thong-tin-nguoi-dung",
        icon: <FaUserTag />
    },

]

export { menuManage, menuSidebar };