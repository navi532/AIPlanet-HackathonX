import React, { Component } from 'react'

import loading from './loader.gif'

export class Spinner extends Component {
    render() {
        return (
            <div className="my-3 text-center z-1">
                <img src={loading} alt="Loading.." />
            </div>
        )
    }
}

export default Spinner