import { faMoon } from '@fortawesome/free-regular-svg-icons';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import ThemeContext from '../../Context/theme';

import Button from './Button/Button';

const ButtonDarkMode = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return <Button onClick={toggleTheme}>
        <FontAwesomeIcon className="text-xl" color='yellow' icon={theme === "dark" ? faMoon : faSun} />
    </Button>;
};

export default ButtonDarkMode;
