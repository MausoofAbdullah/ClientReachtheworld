import React from 'react'
import './Trendcard.css'
import { Trenddata } from '../../data/Trenddata'

const Trendcard = () => {
  return (
    <div className='Trendcard'>
      <h3>Trends for you</h3>
      {Trenddata.map((trend)=>{
        return(
            <div className="trend">
                <span>#{trend.name}</span>
                <span> {trend.shares}k shares</span>
            </div>
        )
      })}
    </div>
  )
}

export default Trendcard
