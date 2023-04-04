import React from 'react'

export default function Box({ children, customclass, customstyle }) {
    return (
        <div className={`m-2 ${customclass}`} style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "5px",
            boxShadow: "0px 0px 10px #888888",
            height: "100%",
            ...customstyle
        }}>
            {children}
        </div>
    )
}
