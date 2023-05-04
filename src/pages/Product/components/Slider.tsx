import { type FC, useState } from "react"
import { Thumbs, Mousewheel, Keyboard, type Swiper as SwiperType } from "swiper"
import "swiper/css"
import "swiper/css/thumbs"
import { Swiper, SwiperSlide } from "swiper/react"
import { v4 } from "uuid"

interface ISlider {
  onScaleing: () => void
  onAddMedia: () => void
}

const media = [
  "https://static.batnorton.com/image/38314-614df6709822a4.40566268/1072x1500-1_1970080914.jpg",
  "https://static.batnorton.com/image/9492-56d85aa6b427e4.79707556/1462x2048-1_3295013191.jpg",
  "https://static.batnorton.com/image/44831-6303af0030f848.32996494/1462x2048-1_3981762715.jpg",
  "https://static.batnorton.com/image/42231-627ba80dafaab0.64946494/1462x2048-1_2542632289.jpg",
]

export const Slider: FC<ISlider> = ({ onScaleing, onAddMedia }) => {
  const [swiper, setSwiper] = useState<SwiperType>()

  const navigation = {
    slidesPerView: 3,
    autoHeight: true,
    mousewheel: true,
    keyboard: true,
    modules: [Mousewheel, Keyboard],
    slidesPerGroup: 1,
    spaceBetween: 15,
    noSwipingSelector: "#a",
  }

  const main = {
    thumbs: { swiper },
    keyboard: true,
    slidesPerGroup: 1,
    modules: [Thumbs, Keyboard],
  }

  return (
    <div className="flex gap-[15px] w-full">
      <div style={{ width: 200, height: "100%" }}>
        <Swiper
          {...navigation}
          direction="vertical"
          onSwiper={sw => {
            setSwiper(sw)
          }}
          style={{ height: "100%" }}>
          {media.map(el => (
            <SwiperSlide key={v4()}>
              <img className="w-full h-full object-cover" src={el} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div
        className="swiper swiper-intro"
        style={{ width: "600px", minHeight: 300 }}>
        <Swiper {...main}>
          {media.map(el => (
            <SwiperSlide key={v4()}>
              <img className="w-full h-full object-cover" src={el} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
