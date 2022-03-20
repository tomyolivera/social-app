import React, { useEffect } from 'react'
import styled from 'styled-components';
import $ from 'jquery';

const LoadingStyled = styled.div`
    background:black;
    color:white;

    position:absolute;
    top:0;
    z-index:100000;

    width:100%;
    height:100%;

    display:flex;
    justify-content: center;
    align-items: center;

`;

const LoadingPage = ({ loading }) => {
    useEffect(() => {
        if(!loading) $(".loading-page").fadeOut(1000);
    }, [loading])

    return (
        <LoadingStyled className="loading-page">
            <h3>
                <div className="spinner" />
                Loading
            </h3>
        </LoadingStyled>
    )
}

export default LoadingPage
