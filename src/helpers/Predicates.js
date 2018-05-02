import * as R from 'ramda';
import Either from 'data.either';

const { Right, Left } = Either;

const makePredicate = ([predFn, e]) => a => predFn(a) ? Right(a) : Left(e);
const makePredicates = R.map(makePredicate);
export const runPredicates = ([input, validations]) =>
  R.map(predFn => predFn(input), makePredicates(validations));