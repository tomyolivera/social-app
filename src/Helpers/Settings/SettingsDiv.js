import React from 'react'
import styled from 'styled-components'

const SettingStyled = styled.div`
    padding: 12px;
    background: #dadada;
    border-radius: 12px;
    margin-bottom: 20px;
`

const SettingsDiv = ({ children }) => {
    return (
        <SettingStyled>
            { children }
        </SettingStyled>
    )
}

export default SettingsDiv
