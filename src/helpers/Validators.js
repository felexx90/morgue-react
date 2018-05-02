import * as R from 'ramda';
import moment from 'moment';

// validations
export const isNotEmpty = a => a && a.trim().length > 0;
export const isNotEmptyComponent = a => a !== null && a !== undefined;
export const isValidDate = a => a && moment(a).isValid();
export const hasCapitalLetter = a => /[A-Z]/.test(a);
export const isGreaterThan = R.curry((len, a) => (a > len));
export const isLengthGreaterThan = len => R.compose(isGreaterThan(len), R.prop('length'));