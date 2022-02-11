// onDragStart={e => dragStartHandler(e, card)} // срабатывает в тот момент, когда мы взяли карточку
// onDragLeave={e => dragEndHandler(e)} // срабатывает в тот момент, когда мы вышли за пределы другой карточки
// onDragEnd={e => dragEndHandler(e)} // срабатывает, если мы отпустили перемещение
// onDragOver={e => dragOverHandler(e)} // если, мы находимся на каким то другим объектом
// onDrop={e => dropHandler(e, card)} // если мы отпустили карточку, и расчитываем что после этого должно произойти какое-то свзанное действие
// draggable={true}

import React, {useState} from 'react';
import './App.css';

type CardType = {
    id: number
    order: number
    text: string
}

const App = () => {
    const [cardList, setCardList] = useState<CardType[]>([
        {id: 1, order: 1, text: 'КАРТОЧКА 1'},
        {id: 2, order: 2, text: 'КАРТОЧКА 2'},
        {id: 3, order: 3, text: 'КАРТОЧКА 3'},
        {id: 4, order: 4, text: 'КАРТОЧКА 4'},
    ])
    const [currentCard, setCurrentCard] = useState<CardType | any>(null)

    const handlerStartDrag = (e: React.DragEvent<HTMLDivElement>, card: CardType) => {
        setCurrentCard(card)
    }
    const handlerEndDrag = (e: React.DragEvent<HTMLDivElement>) => {
        e.currentTarget.style.background = 'white'
    }
    const handlerEndOverDrag = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.currentTarget.style.background = 'red'
    }
    const handlerDrop = (e: React.DragEvent<HTMLDivElement>, card: CardType) => {
        e.preventDefault()
        setCardList(cardList.map(c => {
            if (c.id === card.id) return {...c, order: currentCard.order}
            if (c.id === currentCard.id) return {...c, order: card.order}
            return c
        }))
        e.currentTarget.style.background = 'white'
    }

    const sortCards = (a: CardType, b: CardType) => (a.order > b.order) ? 1 : -1

    // Components before rendering
    const componentCardList = cardList.sort(sortCards).map(card => {
        return (
            <div key={card.id}
                 className={'card'}
                 draggable
                 onDragStart={e => handlerStartDrag(e, card)}
                 onDragLeave={e => handlerEndDrag(e)}
                 onDragEnd={e => handlerEndDrag(e)}
                 onDragOver={e => handlerEndOverDrag(e)}
                 onDrop={e => handlerDrop(e, card)}
            >
                {card.text}
            </div>
        )
    })
    return (
        <div className={'App'}>
            {componentCardList}
        </div>
    )
}
export default App;