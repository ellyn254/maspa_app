import React from 'react'
import { Link } from 'react-router-dom';
import '../lowerdiv.css'

const LowerDiv = () => {
  return (
    <>
    <div className="lowerdiv">
      <p className="text">
        These are our feedbacks from esteemed customers. <br />
        Allan Kheyt, customer
      </p>
      <div className="div">
        <Link to={`/contact`} className="button">
          TALK TO US
        </Link>
      </div>
    </div></>
  )
}

export default LowerDiv