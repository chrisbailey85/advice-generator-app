import { useState } from "react";
import dividerImgMobile from './images/pattern-divider-mobile.svg'
import dividerImgDesktop from './images/pattern-divider-desktop.svg'
import diceIcon from './images/icon-dice.svg'
import { useEffect } from "react";
const Card = () => {
    const [advice, setAdvice] = useState({})
    const [anime, setAnime] = useState(false)
    const getAdvice = () => {
        fetch('https://api.adviceslip.com/advice')
        .then(res => res.json())
        .then(res => res.slip)
        .then(res => {
            setAdvice(res)
        })
    }
    const newAdvice = () => {
        setAnime(true)
        setTimeout(() => {
            getAdvice();
            setAnime(false)
        }, 1000)
    }
    
    useEffect(() => {
        getAdvice()
    },[])

    return ( 
        <div className="card">
            <h1 className="heading">Advice #{advice.id}</h1>
            <p className="advice">"{advice.advice}"</p>
            <div className="divider">
                <picture>
                    <source srcSet={dividerImgDesktop} media="(min-width: 768px)"/>
                    <img src={dividerImgMobile} alt="" />
                </picture>
            </div>
            <button className="btn" onClick={newAdvice}><span className="sr-only">Get random advice</span><img src={diceIcon} className={anime ? 'anime' : ''} alt="" /></button>
        </div>
     );
}
 
export default Card;