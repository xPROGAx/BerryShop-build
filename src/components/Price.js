

const Price = () => {

  return (
    <div className="ml-auto mr-auto max-w-5/6 flex flex-col justify-center">
      <h1 className="ml-auto mr-auto font-[--font-montserrat] text-red-700 text-5xl font-semibold">PRICE</h1>
      <p className="ml-auto mr-auto font-[--font-great-vibes] mb-5">Наборы для клубники в шоколаде</p>
      <div className="flex flex-col max-w-1/3 mr-auto ml-auto mb-5">
        <div className="flex justify-between mb-2">
          <p className="font-bold text-amber-600">Набор 9 🍓</p>
          <p className="font-bold">1 900 RUB</p>
        </div>
        <div className="flex justify-between mb-2">
          <p className="font-bold text-amber-600">Набор 12 🍓</p>
          <p className="font-bold">2 400 RUB</p>
        </div>
        <div className="flex justify-between mb-2">
          <p className="font-bold text-amber-600">Набор 16 🍓</p>
          <p className="font-bold">3 000 RUB</p>
        </div>
        <div className="flex justify-between mb-2">
          <p className="font-bold text-amber-600">Набор 24 🍓</p>
          <p className="font-bold">3 900 RUB</p>
        </div>
        <div className="flex justify-between mb-2">
          <p className="font-bold text-amber-600">Набор 35 🍓</p>
          <p className="font-bold">4 500 RUB</p>
        </div>
        <div className="flex justify-between mb-2">
          <p className="font-bold text-amber-600">Набор 55 🍓</p>
          <p className="font-bold">6 500 RUB</p>
        </div>

        <div>
          <p className="text-red-700 font-semibold font-[--font-montserrat]">ДОП:</p>
          <div className="flex justify-between mb-2">
            <p className="font-bold text-blue-600">Голубика в шок / без</p>
            <p className="font-bold">450 / 350 RUB</p>
          </div>
        </div>
        <div className="flex justify-center text-center">
          <p className="flex">В стоимость входит: клубника в шоколаде, любой дизайн, коробочка, лента, пакетик</p>
        </div>
      </div>
    </div>
  )
}

export default Price;