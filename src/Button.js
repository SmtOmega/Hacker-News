import React from 'react'
import {useGlobalContext} from './context'

const Button = () => {
    const {isLoading, handlePage, page, nbPages} = useGlobalContext()
    return <section className="btn-section">
        <div className="btn-container">
        <button disabled={isLoading} onClick={()=> handlePage('dec')} className="btn">prev</button>
        <p>{page + 1} of {nbPages}</p>
        <button disabled={isLoading} onClick={()=> handlePage('inc')} className="btn">next</button>
    </div>
    </section>
}
export default Button