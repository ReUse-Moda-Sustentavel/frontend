import { ArrowCircleLeft, ArrowCircleRight, DotOutline } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import ListaProdutos from "../../components/produto/listaProduto/ListaProdutos";

function Home() {
  const slides = [
    {
      url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      url: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      url: "https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // 5000 ms = 5 segundos

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, [currentIndex]);

  return (
    <>
      <div className="max-w-[100%] h-[400px] w-full m-auto pb-16 relative group pt-2 ">
        <div
          style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
          className="w-full h-full bg-center bg-cover duration-500" // rounded-2xl
        >
          <div className="hidden group-hover:block absolute top-50% -translate-x-0 translate-y-[300%] left-4 text-2xl rounded full p-2  text-white cursor-pointer">
            <ArrowCircleLeft size={32} onClick={prevSlide} />
          </div>
          <div className="hidden group-hover:block absolute top-50% -translate-x-0 translate-y-[300%] right-4 text-2xl rounded full p-2  text-white cursor-pointer">
            <ArrowCircleRight size={32} onClick={nextSlide} />
          </div>
        </div>
        <div className="flex top-2 justify-center py-2">
          {slides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className="text-2xl cursor-pointer">
              <DotOutline size={28} />
            </div>
          ))}
        </div>
      </div>
      <ListaProdutos isHome={false} />
    </>
  )
}

export default Home