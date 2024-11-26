import CanhGa from "../assets/Shop/Chickens/Chicken_CanhGa.jpg";
import ChanGa from "../assets/Shop/Chickens/Chicken_ChanGa.jpg";
import DuiGa from "../assets/Shop/Chickens/Chicken_DuiGa.jpg";
import DuiGaRutXuong from "../assets/Shop/Chickens/Chicken_DuiGaRutXuong.jpg";
import GaDen from "../assets/Shop/Chickens/Chicken_GaDen.jpg";
import GaNguyenCon from "../assets/Shop/Chickens/Chicken_GaNguyenCon.jpg";
import UcGa from "../assets/Shop/Chickens/Chicken_UcGa.jpg";
import GaBam from "../assets/Shop/Chickens/Chicken_GaBam.jpg";
import BapCai from "../assets/Shop/ShopHotDeal/hotdeal_BapCai.jpg";
import BongCaiXanh from "../assets/Shop/ShopHotDeal/hotdeal_BongCaiXanh.jpg";
import BupCai from "../assets/Shop/ShopHotDeal/hotdeal_BupCai.jpg";
import DauHuNho from "../assets/Shop/ShopHotDeal/hotdeal_DauHuNho.jpg";
import DauHuLon from "../assets/Shop/ShopHotDeal/hotdeal_DauHuLon.jpg";
import ChanLon from "../assets/Shop/Porks/Pork_ChanLon.jpg";
import MoLon from "../assets/Shop/Porks/Pork_MoLon.jpg";
import ThitLonBaChi from "../assets/Shop/Porks/Pork_ThitLonBaChi.jpg";
import ThitLonBam from "../assets/Shop/Porks/Pork_ThitLonBam.jpg";
import ThitLonThan from "../assets/Shop/Porks/Pork_ThitLonThan.jpg";
import ThitLonTuoi from "../assets/Shop/Porks/Pork_ThitLonTuoi.jpg";
import ThitLonVai from "../assets/Shop/Porks/Pork_ThitLonVai.jpg";
import XuongLon from "../assets/Shop/Porks/Pork_XuongLon.jpg";
const dataProducts = [
  {
    id: 9,
    imageProduct: CanhGa,
    title: "Cánh gà",
    price_old: 200000,
    price_sale: null,
    discount: 30,
    categoryId: 2, // gà
  },
  {
    id: 10,
    imageProduct: ChanGa,
    title: "Chân gà",
    price_old: 50000,
    price_sale: null,
    discount: 30,
    categoryId: 2, // gà
  },
  {
    id: 11,
    imageProduct: DuiGa,
    title: "Đùi gà",
    price_old: 40000,
    price_sale: 37000,
    discount: 30,
    categoryId: 2, // gà
  },
  {
    id: 12,
    imageProduct: DuiGaRutXuong,
    title: "Đùi gà rút xương",
    price_old: 60000,
    price_sale: null,
    discount: 30,
    categoryId: 2, // gà
  },
  {
    id: 13,
    imageProduct: GaDen,
    title: "Gà đen",
    price_old: 240000,
    price_sale: 230000,
    discount: 30,
    categoryId: 2, // gà
  },
  {
    id: 14,
    imageProduct: GaNguyenCon,
    title: "Gà nguyên con",
    price_old: 240000,
    price_sale: null,
    discount: 30,
    categoryId: 2, // gà
  },
  {
    id: 15,
    imageProduct: UcGa,
    title: "Ức gà",
    price_old: 24000,
    price_sale: null,
    discount: 30,
    categoryId: 2, // gà
  },
  {
    id: 16,
    imageProduct: GaBam,
    title: "Gà băm",
    price_old: 24000,
    price_sale: 20000,
    discount: 30,
    categoryId: 2, // gà
  },
  {
    id: 1,
    imageProduct: BapCai,
    title: "Bắp cải",
    price_old: 30000,
    price_sale: 25000,
    discount: 30,
    categoryId: 1, // hot deal
  },
  {
    id: 2,
    imageProduct: BongCaiXanh,
    title: "Bông cải xanh",
    price_old: 20000,
    price_sale: null,
    discount: 30,
    categoryId: 1, // hot deal
  },
  {
    id: 3,
    imageProduct: BupCai,
    title: "Búp cải",
    price_old: 15000,
    price_sale: 12000,
    discount: 30,
    categoryId: 1, // hot deal
  },
  {
    id: 4,
    imageProduct: CanhGa,
    title: "Cánh gà",
    price_old: 200000,
    price_sale: null,
    discount: 30,
    categoryId: 1, // hot deal
  },
  {
    id: 5,
    imageProduct: ChanGa,
    title: "Chân gà",
    price_old: 50000,
    price_sale: null,
    discount: 30,
    categoryId: 1, // hot deal
  },
  {
    id: 6,
    imageProduct: DauHuNho,
    title: "Đậu hủ nhỏ",
    price_old: 10000,
    price_sale: 9000,
    discount: 30,
    categoryId: 1, // hot deal
  },
  {
    id: 7,
    imageProduct: DauHuLon,
    title: "Đậu hủ lớn",
    price_old: 15000,
    price_sale: null,
    discount: 30,
    categoryId: 1, // hot deal
  },
  {
    id: 8,
    imageProduct: DuiGa,
    title: "Đùi gà",
    price_old: 40000,
    price_sale: 37000,
    discount: 30,
    categoryId: 1, // hot deal
  },
  {
    id: 17,
    imageProduct: ChanLon,
    title: "Chân lợn",
    price_old: 200000,
    price_sale: null,
    discount: 30,
    categoryId: 3, // pork
  },
  {
    id: 18,
    imageProduct: MoLon,
    title: "Mỡ lợn",
    price_old: 50000,
    price_sale: null,
    discount: 30,
    categoryId: 3, // pork
  },
  {
    id: 19,
    imageProduct: ThitLonBaChi,
    title: "Ba chỉ",
    price_old: 40000,
    price_sale: 37000,
    discount: 30,
    categoryId: 3, // pork
  },
  {
    id: 20,
    imageProduct: ThitLonBam,
    title: "Thịt lợn bằm",
    price_old: 60000,
    price_sale: null,
    discount: 30,
    categoryId: 3, // pork
  },
  {
    id: 21,
    imageProduct: ThitLonThan,
    title: "Thịt lợn thăn",
    price_old: 240000,
    price_sale: 230000,
    discount: 30,
    categoryId: 3, // pork
  },
  {
    id: 22,
    imageProduct: ThitLonTuoi,
    title: "Thịt lợn tươi",
    price_old: 350000,
    price_sale: 30000,
    discount: 30,
    categoryId: 3, // pork
  },
  {
    id: 23,
    imageProduct: ThitLonVai,
    title: "Thịt lợn vai",
    price_old: 24000,
    price_sale: null,
    discount: 30,
    categoryId: 3, // pork
  },
  {
    id: 24,
    imageProduct: XuongLon,
    title: "Xương lợn",
    price_old: 24000,
    price_sale: 20000,
    discount: 30,
    categoryId: 3, // pork
  },
];

export default dataProducts;
