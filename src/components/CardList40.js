import React from 'react'
import Card from './Card40'

const CardList = ({demos}) => {
    return(
        <div>
        {
            demos.map((user,i) => {
                return(
                    <Card 
                    key={i}
                    img={user.img}
                    link={user.link}
                    demoName={user.demoName}
                    date={user.date}
                    />
                )
            })
        }
      </div>
    )
}
export default CardList


