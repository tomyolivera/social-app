/**
 * String with the first character capitalized 
 * @param {String} str
 * @return {String}
 */
export function CapitalizeFirstCharacter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}