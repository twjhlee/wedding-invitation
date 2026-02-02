import { useEffect } from "react"
import { LazyDiv } from "../lazyDiv"
import { useModal } from "../modal"
import { GALLERY_IMAGES } from "../../images"

export const Gallery = () => {
  const { openModal, closeModal } = useModal()

  useEffect(() => {
    // preload images
    GALLERY_IMAGES.forEach((image) => {
      const img = new Image()
      img.src = image
    })
  }, [])

  const openImagePopup = (image: string) => {
    openModal({
      className: "image-popup-modal",
      closeOnClickBackground: true,
      content: (
        <div className="image-popup-content" onClick={closeModal}>
          <img src={image} alt="gallery" draggable={false} />
        </div>
      ),
    })
  }

  return (
    <LazyDiv className="card gallery">
      <h2 className="english">Gallery</h2>
      <div className="gallery-grid">
        {GALLERY_IMAGES.slice(0, 9).map((image, idx) => (
          <div
            key={idx}
            className="gallery-item"
            onClick={() => openImagePopup(image)}
          >
            <img src={image} alt={`gallery-${idx}`} draggable={false} />
          </div>
        ))}
      </div>
    </LazyDiv>
  )
}
