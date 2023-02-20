import { FC, useEffect } from "react"
import Swiper, { Thumbs, Mousewheel, Keyboard } from "swiper"
import "swiper/css"
import "swiper/css/thumbs"

interface ISlider {
  onScaleing: () => void
}

const media = [
  "https://static.batnorton.com/image/38314-614df6709822a4.40566268/1072x1500-1_1970080914.jpg",
  "https://static.batnorton.com/image/9492-56d85aa6b427e4.79707556/1462x2048-1_3295013191.jpg",
  "https://static.batnorton.com/image/44831-6303af0030f848.32996494/1462x2048-1_3981762715.jpg",
  "https://static.batnorton.com/image/42231-627ba80dafaab0.64946494/1462x2048-1_2542632289.jpg",
]

export const Slider: FC<ISlider> = ({ onScaleing }) => {
  useEffect(() => {
    const swiperNav = new Swiper(".swiper-nav", {
      slidesPerView: 3,
      autoHeight: true,
      direction: "vertical",
      mousewheel: true,
      keyboard: true,
      modules: [Mousewheel, Keyboard],
      slidesPerGroup: 1,
      spaceBetween: 15,
    })
    new Swiper(".swiper-intro", {
      thumbs: { swiper: swiperNav },
      keyboard: true,
      slidesPerGroup: 1,
      modules: [Thumbs, Keyboard],
    })
  }, [])
  return (
    <div className="flex gap-[15px] w-full">
      <div className="swiper swiper-nav" style={{ width: 200 }}>
        <div className="swiper-wrapper">
          {media.map(el => (
            <div className="swiper-slide">
              <img className="w-full h-full object-cover" src={el} alt="" />
            </div>
          ))}
        </div>
      </div>
      <div
        className="swiper swiper-intro"
        style={{ width: "600px", minHeight: 300 }}>
        <div className="swiper-wrapper">
          {media.map(el => (
            <div className="swiper-slide">
              <img className="w-full h-full object-cover" src={el} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
