import React from 'react';
import { RotatingLines } from 'react-loader-spinner'

const Loading = () => {
    return (
        <RotatingLines
            visible={true}
            height="56"
            width="56"
            color="#23A8F2"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            strokeColor="#23A8F2"
        />
    )
}

export default Loading