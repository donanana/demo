import React from 'react'

export const SearchBox = ({searchChange}) => {
    return (
            <input className='search'
            type="search" 
            placeholder='   search demos'
            onChange={searchChange}
            />
    )
}
export default SearchBox