// import heartIcon from "../../assets/shop/heart.png";
import FavoriteButton from "../../components/button/FavoriteButton";
import phoneIcon from "../../assets/shop/phone.png";
import KakaoMap from "../main/Kakaomap";
import { useEffect, useState } from "react";
import ShopInformation from "./ShopInformation";
import ShopReview from "./ShopReview";
import ShopMenu from "./ShopMenu";
import { useParams } from "react-router-dom";
import ShopInfoGetForm from "../../services/shops/ShopInfoGetService";
import { ShopInfo } from "../../types/ShopInfoType";
import ShoptFavoritePostForm from "../../services/favorites/ShopFavoritePostService";
import ShopDetailGetForm from "../../services/shops/ShopDetailGetService";

const mapHeight = "105px"; // 예시 높이값
const updateCounter = 0;

const Shop = () => {
  const [activeTab, setActiveTab] = useState("details");
  const { Id } = useParams();
  const [shopInfo, setShopInfo] = useState<ShopInfo>({
    name: "",
    tel: "",
    address: "",
    roadAddress: "",
    latitude: 0,
    longitude: 0,
    imageURL: "",
    operatingTime: "",
    reviewCnt: 0,
    favoriteCnt: 0,
    opened: false,
  });

  const makePhoneCall = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handlePhoneClick = () => {
    makePhoneCall(shopInfo.tel);
  };

  const [isFavorite, setIsFavorite] = useState(true);

  const handleToggle = async (newIsFavorite: boolean) => {
    try {
      if (newIsFavorite) {
        // 찜 등록 API 호출
        await ShoptFavoritePostForm({ Id });
      } else {
        // 찜 삭제 API 호출
        await ShopDetailGetForm({ Id });
      }
      setIsFavorite(newIsFavorite);
    } catch (error) {
      // 에러 처리
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ShopInfoGetForm({ Id });
        setShopInfo(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching shop info:", error);
      }
    };

    fetchData();
  }, [Id]);

  return (
    <div className="sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
      {/* Header image container */}
      <div className="h-[150px] center mb-8 ">
        <img
          src={shopInfo.imageURL}
          alt="가게 대표 이미지"
          className="object-cover w-full h-[150px]"
        />
      </div>

      <div className="my-4 text-center">
        {/* Shop Details */}
        <h1 className="text-xl font-bold">{shopInfo.name}</h1>

        {/* Icons and details */}
        <div className="flex items-center justify-center mt-2 space-x-3">
          <div onClick={handlePhoneClick} className="flex items-center">
            <img src={phoneIcon} alt="Phone" className="w-5 h-5 mr-1" />
            <span className="text-sm">전화</span>
          </div>

          <div className="flex items-center">
            {/* 토글 버튼 */}
            <FavoriteButton isFavorite={isFavorite} onToggle={handleToggle} />
            <span className="text-sm">{shopInfo.favoriteCnt}</span>
          </div>
        </div>

        {/* Other details */}
        <div className="flex flex-col items-center mt-2 ">
          <span className="text-sm text-gray-600">
            리뷰 수 {shopInfo.reviewCnt} | 마감 시간 {shopInfo.operatingTime}
          </span>
        </div>
      </div>
      {/* 위치 정보 */}
      <div className="flex mb-2 w-[330px] border-2 rounded-xl px-4 py-2 shadow-xl mx-auto">
        <div className="mr-5">
          <p className="text-sm font-semibold whitespace-nowrap ">위치안내</p>
        </div>
        <div>
          <p className="text-xs text-gray-600">{shopInfo.roadAddress}</p>
        </div>
      </div>
      {/* 지도 정보 */}
      <div className="flex mb-2 w-[330px] h-32 border-2 rounded-xl px-4 py-2 shadow-xl mt-5 mx-auto">
        <div className="mr-5">
          <p className="text-sm font-semibold whitespace-nowrap ">지도안내</p>
        </div>
        <div className="z-0 w-full border border-black">
          <KakaoMap
            height={mapHeight}
            lat={shopInfo.latitude}
            lng={shopInfo.longitude}
            updateCounter={updateCounter}
            isShop={true}
          />
        </div>
      </div>
      {/* 탭 버튼 */}
      <div className="flex justify-around w-full mt-5 mb-0.5">
        <button
          className={`my-1 py-2 px-10 text-xs ${activeTab === "details" ? "bg-orange-400 text-white" : "bg-gray-200 text-black"}`}
          onClick={() => setActiveTab("details")}
        >
          메뉴
        </button>
        <button
          className={`my-1 py-2 px-10 text-xs ${activeTab === "menu" ? "bg-orange-400 text-white" : "bg-gray-200 text-black"}`}
          onClick={() => setActiveTab("menu")}
        >
          정보ㆍ원산지
        </button>
        <button
          className={`my-1 py-2 px-10 text-xs ${activeTab === "review" ? "bg-orange-400 text-white" : "bg-gray-200 text-black"}`}
          onClick={() => setActiveTab("review")}
        >
          리뷰
        </button>
      </div>

      {/* 탭 내용 */}
      <div>
        {activeTab === "details" && (
          <div className="pb-16">
            <ShopMenu />
          </div>
        )}
        {activeTab === "menu" && (
          <div className="pb-16">
            <ShopInformation />
          </div>
        )}
        {activeTab === "review" && (
          <div className="pb-16">
            <ShopReview />
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
