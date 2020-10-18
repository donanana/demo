import React from 'react'

const Card = ({link,img,demoName,date}) => {

    return (
        <div className='demo'>
            <a href={`${link}`} className="link">
                <div className="main">
                    <img src={`${img}`} className="image"/>      
                    <h2 className="demoName">{demoName}</h2>
                    <p className="date">{date}</p>
                </div>
            </a>
        </div>
    )
}
export default Card;