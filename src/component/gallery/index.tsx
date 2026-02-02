import { useEffect, useState } from "react"
import { LazyDiv } from "../lazyDiv"
import { useModal } from "../modal"
import { GALLERY_IMAGES } from "../../images"

const IMAGES_PER_PAGE = 9

export const Gallery = () => {
  const { openModal, closeModal } = useModal()
  const [page, setPage] = useState(0)
  const totalPages = Math.ceil(GALLERY_IMAGES.length / IMAGES_PER_PAGE)

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

  const currentImages = GALLERY_IMAGES.slice(
    page * IMAGES_PER_PAGE,
    (page + 1) * IMAGES_PER_PAGE
  )

  return (
    <LazyDiv className="card gallery">
      <h2 className="english">Gallery</h2>
      <div className="gallery-container">
        <button
          className="gallery-nav prev"
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 0}
        >
          ‹
        </button>
        <div className="gallery-grid">
          {currentImages.map((image, idx) => (
            <div
              key={page * IMAGES_PER_PAGE + idx}
              className="gallery-item"
              onClick={() => openImagePopup(image)}
            >
              <img src={image} alt={`gallery-${idx}`} draggable={false} />
            </div>
          ))}
        </div>
        <button
          className="gallery-nav next"
          onClick={() => setPage((p) => p + 1)}
          disabled={page === totalPages - 1}
        >
          ›
        </button>
      </div>
      <div className="gallery-dots">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <span
            key={idx}
            className={`dot ${idx === page ? "active" : ""}`}
            onClick={() => setPage(idx)}
          />
        ))}
      </div>
    </LazyDiv>
  )
}
