import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const LinksStyled = styled.div`
    display: flex;
    flex-direction: column;
`

const LinkStyled = styled.div`
    color: #fff;
    background: ${ p => p.active ? "rgba(0, 160, 165, 1)" : "rgba(75, 75, 75, 1)" };
    width: 100%;
    text-decoration: "none";
    padding: 12px;
    border-radius: ${ p => p.borderedTop ? "12px 12px 0 0" : p.borderedBottom ? "0 0 12px 12px" : "0" };
    
    :hover{
        background: rgba(75, 75, 75, 0.8);
    }
`

const text = { textDecoration: "none" }

const Links = [
    "edit", "security", "password", "developers"
]

const ProfileLinks = ({ section }) => {
    return (
        <LinksStyled>
            {
                Links.map((link, i) => (
                    <div key={i}>
                        { i !== 0 && <hr className="my-0 bg-light" /> }
                        <Link style={text} to={`/settings/profile/${link}`}>
                            <LinkStyled borderedTop={i === 0} borderedBottom={Links.length === i + 1} active={link === section}>
                                { link.charAt(0).toUpperCase() + link.slice(1) }
                            </LinkStyled>
                        </Link>
                    </div>
                ))

            }
        </LinksStyled>
    )
}

export default ProfileLinks
