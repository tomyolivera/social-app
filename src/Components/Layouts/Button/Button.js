import './index.css';
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


/**
 * 
 * @param {string} color transparent | hover | slate | gray | zinc | neutral | stone | red | orange | amber | yellow |
 *                       lime | green | emerald | teal | cyan | sky | blue | violet | indigo | purple | fuchsia | pink | rose 
 * 
 */
const Button = ({ id, color="transparent", icon, iconPosition="left", onClick, className, type, block=false, disabled, children, data_dropdown_toggle }) => {
    return (
        <button id={id} onClick={onClick} disabled={disabled} type={type} data-dropdown-toggle={data_dropdown_toggle}
                className={`button button-${color} flex justify-between ${block && "w-full"} items-center ${className}`}
            >
            <b className={`flex justify-${icon ? "between" : "center"} items-center w-full`}>
                { icon && iconPosition === "left" && <FontAwesomeIcon className="mx-2" icon={icon} /> }
                { children }
                { icon && iconPosition === "right" && <FontAwesomeIcon className="mx-2" icon={icon} /> }
            </b>
        </button>
    )
}

export default Button
