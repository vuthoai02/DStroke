import Conversations from '../../src/View/Chat/Conversations';
import Message from '../../src/View/Chat/message';
import Home from '../../src/View/Home/home';
import Login from '../../src/View/Login/login';
import Register from '../../src/View/Register/register';
import Service from '../../src/View/Service';
import User from '../../src/View/User';
import HoSoCaNhan from '../../src/View/HoSoCaNhan/HoSoCaNhan';
import DanhBa from '../../src/View/DanhBa/DanhBa';
import BenhVien from '../../src/View/BenhVien';
import MapView from '../../src/View/BenhVien/map';
import CamNang from '../../src/View/CamNang';
import AnUong from '../../src/View/CamNang/AnUong';
import NguNghi from '../../src/View/CamNang/NguNghi';
import SoCuu from '../../src/View/CamNang/SoCuu';
import NhanBiet from '../../src/View/CamNang/NhanBiet';
import TheoDoi from '../../src/View/TheoDoi';
import TuVan from '../View/TuVan';
import DoctorList from '../View/TuVan/DoctorList';
import Recover from '../View/Recover/index'
import XetNghiem from '../View/XetNghiem';


const routes = [
  {name: 'Home', component: Home, options: {title: '', headerShown: false}},
  {name: 'Login', component: Login, options: {title: 'Đăng nhập'}},
  {name: 'Register', component: Register, options: {title: 'Đăng kí'}},
  {
    name: 'Service',
    component: Service,
    options: {
      title: '',
      headerShown: false,
    },
    type: 'private',
  },
  {
    name: 'User',
    type: 'private',
    component: User,
    options: {title: '', headerShown: false},
  },
  {
    name: 'Details',
    type: 'private',
    component: HoSoCaNhan,
    options: {title: 'Hồ sơ cá nhân'},
  },
  {
    name: 'Relatives',
    type: 'private',
    component: DanhBa,
    options: {
      title: 'Người thân',
    },
  },
  {
    name: 'Hospitals',
    component: BenhVien,
    type: 'private',
    options: {
      title: 'Bệnh viện gần nhất',
    },
  },
  {
    name: 'MapView',
    component: MapView,
    options: {
      title: 'Bệnh viện gần nhất',
    },
  },
  {
    name: 'HandBook',
    component: CamNang,
    type: 'private',
    options: {
      title: 'Cẩm nang sức khỏe',
    },
  },
  {
    name: 'Conversations',
    component: Conversations,
    options: {title: 'Tin nhắn'},
  },
  {
    name: 'Message',
    component: Message,
    options: {title: 'Tin nhắn'},
  },
  {
    name: 'Food',
    component: AnUong,
    options: {title: 'Chế độ ăn uống'},
  },
  {
    name: 'Sleep',
    component: NguNghi,
    options: {title: 'Chế độ sinh hoạt'},
  },
  {
    name: 'FirstAid',
    component: SoCuu,
    options: {title: 'Hướng dẫn sơ cứu'},
  },
  {
    name: 'Know',
    component: NhanBiet,
    options: {title: 'Dấu hiệu nhận biết'},
  },
  {
    name: 'Follow',
    component: TheoDoi,
    options: {title: 'Theo dõi sức khỏe'},
  },
  {
    name: 'Consulting',
    component: TuVan,
    options: {title: 'Tư vấn online'},
  },
  {
    name: 'DoctorList',
    component: DoctorList,
    options: {title: 'Danh sách bác sĩ'},
  },
  {
    name: 'Recover',
    component: Recover,
    options: {title: 'Phục hồi'},
  },
  {
    name: 'XetNghiem',
    component: XetNghiem,
    options: {title: 'Xét Nghiệm tại nhà'},
  },
];

export default routes;