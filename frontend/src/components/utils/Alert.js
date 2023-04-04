import React from 'react'

export default function Alert({ alert }) {
    const captialize = (word) => {
        const lower = word.toLowerCase();
        return lower[0].toUpperCase() + lower.slice(1)
    }
    return (
        <>

            {alert && <div className={`alert alert-${alert.type}`} role="alert">
                <strong>{captialize(alert.title)} </strong> : {alert.msg}
            </div>}


        </>

    )
}
