import React from 'react'

const Pagination = ({personPerPage, totalPersons,paginate}) => {
    const pageNumbers=[]

    for(let i=1; i<=Math.ceil(totalPersons/personPerPage);i++){
        pageNumbers.push(i)
    }

  return (
    <nav style={{display:"flex",flexDirection:"row",alignSelf:"center",gap:"5px"}}>
     {/* <ul className='pagination'>
        {pageNumbers.map((number)=>{
            <li key={number} className='page-item'>
                <a href='!#' className='page-link'>
                    {number}
                </a>
            </li>
        })}
        </ul>  */}
         {pageNumbers.map(number => (
          <div key={number}>
            <button className='button ' onClick={() => paginate(number)}>{number}</button>
            </div>
            
          
        ))}

    </nav>
  )
}

export default Pagination
