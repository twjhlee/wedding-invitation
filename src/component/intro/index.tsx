import { INTRO_IMAGE } from "../../images"
import { LazyDiv } from "../lazyDiv"
import "./index.scss"

export const Intro = () => {
  return (
    <LazyDiv className="card intro">
      <div className="image-wrapper">
        <img src={INTRO_IMAGE} alt="intro" />
      </div>
    </LazyDiv>
  )
}
