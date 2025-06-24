import React from 'react'
import Review from './Review'

const Reviews = () => {
  return (
    <div className='w-full relative mb-[3vh]   h-[80vh]'>
      <div className='w-full h-[.5px] absolute top-0 opacity-30 bg-white'></div>
      <div className=''>
        <div className='ml-[3vw]'>
        <h1 className='mt-[5vh] opacity-0  font-bold'>REVIEWS</h1>
        <div className='desc text-[1vw] opacity-50 '>Avg. Rating According to Google is 5.0</div>
        </div>
      
        <div className='w-full  absolute bottom-0 overflow-hidden'>
        <div className='w-full my-[3vh] h-[.5px] opacity-30 bg-white'></div>
          <div 
            className='flex gap-[2vw] animate-scroll'
            style={{
              animationName: 'scroll',
              animationDuration: '60s',
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
              width: 'fit-content'
            }}
          >
            
            <Review authorName='adam k' content='Klawiatura super wykonana, kontakt wzorowy, polecam każdemu kto chce sprawić sobie nietuzinkowy gadget :)' date='' title='Klawiatura super wykonana, kontakt wzorowy'rating={5.0} />
            <Review authorName='krzysztof kamiński' content='Z całego serca polecam. Jakość bardzo dobra, cena również. Komunikacja na najwyższym poziomie zarówno merytorycznym i odpowiedzi na wszystkie pytania. Na czas, a nawet przed czasem (co ważne gdy ma być prezentem urodzinowym). Dodatkowe punkty za informacje o aktualnym statusie prac. Klawiatura działa świetnie, firmware z opcją edycji przez vial.' date='' title='Jakość bardzo dobra, cena również'rating={5.0} />
            <Review authorName='benjamin pel' content='Klawiaturę oceniam bardzo pozytywnie. Jest solidnie wykonana i wygodnie się na niej pisze. Super, że oprogramowanie daje możliwość bezpośredniej edycji ułożenia klawiszy przez przeglądarkę i aktualizację w czasie rzeczywistym. Polecam! :)' date='' title='Jest solidnie wykonana i wygodnie się na niej pisze'rating={5.0} />
            <Review authorName='rollerupaint' content='dobrze wykonana, świetna klawiaturka, zwłaszcza w takiej cenie. Bardzo łatwo modyfikuje się keymapping. Jedyny mój problem z nią to brak hotswappingu, ale mogłem o to dopytać, haha.' date='' title='dobrze wykonana, świetna klawiaturka, zwłaszcza w takiej cenie.'rating={5.0} />
            <Review authorName='Martyna Libera' content='Bardzo polecam! Świetny kontakt ze sprzedającym (np. regularne updatey o stanie zamówienia) a przede wszystkim super klawiatura. Podoba się wszystkim którzy ją tylko zobaczą
Trzymam kciuki za dalszy rozwój działalności' date='' title='Bardzo polecam! Świetny kontakt ze sprzedającym ' rating={5.0} />
            {/* Duplicate reviews for seamless loop */}
            <Review authorName='adam k' content='Klawiatura super wykonana, kontakt wzorowy, polecam każdemu kto chce sprawić sobie nietuzinkowy gadget :)' date='' title='Klawiatura super wykonana, kontakt wzorowy'rating={5.0} />
            <Review authorName='krzysztof kamiński' content='Z całego serca polecam. Jakość bardzo dobra, cena również. Komunikacja na najwyższym poziomie zarówno merytorycznym i odpowiedzi na wszystkie pytania. Na czas, a nawet przed czasem (co ważne gdy ma być prezentem urodzinowym). Dodatkowe punkty za informacje o aktualnym statusie prac. Klawiatura działa świetnie, firmware z opcją edycji przez vial.' date='' title='Jakość bardzo dobra, cena również'rating={5.0} />
            <Review authorName='benjamin pel' content='Klawiaturę oceniam bardzo pozytywnie. Jest solidnie wykonana i wygodnie się na niej pisze. Super, że oprogramowanie daje możliwość bezpośredniej edycji ułożenia klawiszy przez przeglądarkę i aktualizację w czasie rzeczywistym. Polecam! :)' date='' title='Jest solidnie wykonana i wygodnie się na niej pisze'rating={5.0} />
            <Review authorName='rollerupaint' content='dobrze wykonana, świetna klawiaturka, zwłaszcza w takiej cenie. Bardzo łatwo modyfikuje się keymapping. Jedyny mój problem z nią to brak hotswappingu, ale mogłem o to dopytać, haha.' date='' title='dobrze wykonana, świetna klawiaturka, zwłaszcza w takiej cenie.'rating={5.0} />
            <Review authorName='Martyna Libera' content='Bardzo polecam! Świetny kontakt ze sprzedającym (np. regularne updatey o stanie zamówienia) a przede wszystkim super klawiatura. Podoba się wszystkim którzy ją tylko zobaczą
Trzymam kciuki za dalszy rozwój działalności' date='' title='Bardzo polecam! Świetny kontakt ze sprzedającym ' rating={5.0} />
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  )
}

export default Reviews
