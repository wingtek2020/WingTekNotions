"use strict";
exports.__esModule = true;
exports.password = exports.email = exports.name = void 0;
/*
 * name validation
 * accepted: letters & spaces, minimum 3 chars, maximum 15 chars
 */
exports.name = /[a-zA-Z\ ]{3,15}/;
/*
 * email validation
 */
exports.email = /^[^\s@]+@[^\s@]+\.([^\s@]{2,})+$/;
/*
 * password validation, should contain:
 * (?=.*\d): at least one digit
 * (?=.*[a-z]): at least one lower case
 * (?=.*[A-Z]): at least one uppercase case
 * [0-9a-zA-Z]{6,}: at least 6 from the mentioned characters
 */
exports.password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;
