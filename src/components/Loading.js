import React from 'react';
import { RotatingLines } from 'react-loader-spinner'

const Loading = () => {
    return (
        <RotatingLines
            visible={true}
            height="56"
            width="56"
            color="#E03C31"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            strokeColor="#E03C31"
        />
    )
}

export default Loading