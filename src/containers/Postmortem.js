import React from 'react';
import uuidv4 from 'uuid/v4';
import * as R from 'ramda';
import { Button, Form, FormFeedback, FormGroup, Input, InputGroupAddon, InputGroupText, Label, Row } from 'reactstrap';
import { compose, mapProps, withHandlers, withState } from 'recompose';
import { connect } from 'react-redux';
import { runPredicates } from '../helpers/Predicates';
import { isLengthGreaterThan, isNotEmpty, isNotEmptyComponent, isValidDate } from '../helpers/Validators';
import Either from 'data.either';
import DateTime from '../components/DateTime';
import Markdown from '../components/Markdown';
import Chips from '../components/Chips/Chips';
import { addPostmortem, editPostmortem } from '../actions/postmortem.action';
import HistoryPostmortem from '../components/HistoryPostmortem/HistoryPostmortem';
import moment from 'moment';

const validate = R.map(R.compose(R.sequence(Either.of), runPredicates));
const makeValidationObject = R.mergeWithKey((k, l, r) => [l, r]);
const getErrors = R.compose(validate, makeValidationObject);

const HocValidate = (initialState, validationRules) => compose(
  withHandlers({
    onCreate: ({ addPostmortem, history }) => (postmortem) => {
      addPostmortem(postmortem);
      history.push('/postmortem');
    },
    onEdit: ({ editPostmortem, history }) => (postmortem) => {
      editPostmortem(postmortem);
      history.push('/postmortem');
    },
    calcImpactTime: () => ({ postmortem }) => {
      if (moment(postmortem.startDate).isValid() && moment(postmortem.endDate).isValid()) {
        return moment(postmortem.startDate).to(moment(postmortem.endDate), true);
      } else {
        return '0 hours';
      }
    },
    calcUndetectedTime: () => ({ postmortem }) => {
      if (moment(postmortem.detectedDate).isValid() && moment(postmortem.startDate).isValid()) {
        return moment(postmortem.startDate).to(moment(postmortem.detectedDate), true);
      } else {
        return '0 hours';
      }
    },
    calcResolveTime: () => ({ postmortem }) => {
      if (moment(postmortem.detectedDate).isValid() && moment(postmortem.endDate).isValid()) {
        return moment(postmortem.detectedDate).to(moment(postmortem.endDate), true);
      } else {
        return '0 hours';
      }
    }
  }),
  withState('state', 'updateState',
    ({ postmortem, calcImpactTime, calcUndetectedTime, calcResolveTime }) => {
      return {
        errors: {},
        postmortem,
        impactTime: calcImpactTime({ postmortem }),
        undetectedTime: calcUndetectedTime({ postmortem }),
        resolveTime: calcResolveTime({ postmortem })
      };
    }),
  mapProps(({ updateState, state, calcImpactTime, calcUndetectedTime, calcResolveTime, postmortem, match, ...rest }) => ({
    onChange: R.curry((name, value) =>
      updateState(state => {
        const newState = R.assocPath(['postmortem', name], value, state);
        const impactTime = calcImpactTime(newState);
        const undetectedTime = calcUndetectedTime(newState);
        const resolveTime = calcResolveTime(newState);
        const errors = R.map(ErrorComponent, getErrors(R.prop('postmortem', newState), validationRules));
        return R.compose(
          R.assoc('errors', errors),
          R.assoc('impactTime', impactTime),
          R.assoc('undetectedTime', undetectedTime),
          R.assoc('resolveTime', resolveTime),
        )(newState);
      })
    ),
    postmortem: R.prop('postmortem', state),
    errors: R.prop('errors', state),
    create: R.isNil(R.path(['params', 'id'], match)),
    impactTime: R.prop('impactTime', state),
    undetectedTime: R.prop('undetectedTime', state),
    resolveTime: R.prop('resolveTime', state),
    match,
    ...rest,
  }))
);

// Error Component
const ErrorComponent = result =>
  result.cata({
    Right: () => null,
    Left: errorMsg => <FormFeedback >{errorMsg}</FormFeedback >
  });

// helper
const getValue = R.path(['target', 'value']);

const getValueObject = content => content;

const getValueDate = date => R.ifElse(R.compose(R.not, R.is(String)), (date) => date.format(), (date) => date)(date);

const validatedErrors = (errors) => {
  console.log(errors);
  return R.not(R.isEmpty(R.filter((error) => R.not(R.isNil(error)), R.values(errors))));
};

const Postmortem = ({ create, onCreate, onEdit, impactTime, resolveTime, undetectedTime, postmortem, historyPostmortem, onChange, onSubmit, errors = {} }) => {
  return (
    <Form >
      <FormGroup >
        <Label >Title</Label >
        <Input invalid={isNotEmptyComponent(errors.title)}
               value={postmortem.title}
               onChange={R.compose(onChange('title'), getValue)} />
        {errors.title}
      </FormGroup >
      <FormGroup >
        <Label >Start Date</Label >
        <DateTime value={postmortem.startDate}
                  onChange={R.compose(onChange('startDate'), getValueDate)}
                  errors={errors.startDate} >
          <InputGroupAddon addonType="append" >
            <InputGroupText >Total impact time: {impactTime}</InputGroupText >
          </InputGroupAddon >
          {errors.startDate}
        </DateTime >
      </FormGroup >
      <FormGroup >
        <Label >End Date</Label >
        <DateTime value={postmortem.endDate}
                  onChange={R.compose(onChange('endDate'), getValueDate)}
                  errors={errors.endDate} >
          <InputGroupAddon addonType="append" >
            <InputGroupText >Time undetected: {undetectedTime}</InputGroupText >
          </InputGroupAddon >
          {errors.endDate}
        </DateTime >
      </FormGroup >
      <FormGroup >
        <Label >Detected Date</Label >
        <DateTime value={postmortem.detectedDate}
                  onChange={R.compose(onChange('detectedDate'), getValueDate)}
                  errors={errors.detectedDate} >
          <InputGroupAddon addonType="append" >
            <InputGroupText >Time to resolve: {resolveTime}</InputGroupText >
          </InputGroupAddon >
          {errors.detectedDate}
        </DateTime >
      </FormGroup >
      <FormGroup >
        <Label >Severity</Label >
        <Input type="select" value={postmortem.severity}
               onChange={R.compose(onChange('severity'), getValue)}
               invalid={isNotEmptyComponent(errors.severity)}
               errors={errors.severity} >
          <option value={null} />
          <option value={1} >1-Complete outage or degradation so severe that core functionality is unusable</option >
          <option value={2} >2-Functional degradation for a subset of members or loss of some core functionality for all members</option >
          <option value={3} >3-Noticeable degradation or loss of minor functionality</option >
          <option value={4} >4-No member-visible impact; loss of redundancy or capacity</option >
          <option value={5} >5-Anything worth mentioning not in the above levels</option >
        </Input >
        {errors.severity}
      </FormGroup >
      <p >What happened?</p >
      <hr />
      <Row >
        <Markdown value={postmortem.whyhappened} onChange={R.compose(onChange('whyhappened'), getValueObject)} />
      </Row >
      <p >Why were we surprised?</p >
      <hr />
      <Row >
        <Markdown value={postmortem.summary} onChange={R.compose(onChange('summary'), getValueObject)} />
      </Row >
      <p >Tags</p >
      <hr />
      <FormGroup >
        <Chips placeholder="Add a Tag..." chips={postmortem.tags} onChange={R.compose(onChange('tags'), getValueObject)} />
      </FormGroup >
      <p >History</p >
      <FormGroup >
        <HistoryPostmortem history={historyPostmortem} />
      </FormGroup >
      <FormGroup >
        {create ? <Button disabled={validatedErrors(errors)} onClick={() => {onCreate(postmortem);}} >Create</Button > : <Button
          disabled={validatedErrors(errors)} onClick={() => {onEdit(postmortem);}} >Edit</Button >}
      </FormGroup >
    </Form >
  );
};

const validationRules = {
  id: [],
  title: [
    [isNotEmpty, 'Title should not be  empty.'],
    [isLengthGreaterThan(2), 'Minimum Title length of 3 is required.'],
  ],
  startDate: [
    [isNotEmptyComponent, 'Start Date should not be empty.'],
    [isValidDate, 'Start Date is not a valid date.'],
  ],
  endDate: [
    [isNotEmptyComponent, 'End Date should not be  empty.'],
    [isValidDate, 'End Date is not a valid date.'],
  ],
  detectedDate: [
    [isNotEmptyComponent, 'Detected Date should not be  empty.'],
    [isValidDate, 'Detected Date is not a valid date.'],
  ],
  severity: [
    [isNotEmpty, 'Severity should not be  empty.'],
  ],
  whyhappened: [],
  summary: [],
  tags: []
};
const initialState = {
  id: undefined,
  title: '',
  startDate: null,
  endDate: null,
  detectedDate: null,
  severity: '',
  whyhappened: '',
  summary: '',
  tags: []

};

const mapStateToProps = ({ postmortems, historyPostmortem }, { match }) => {

  return {
    postmortem: R.ifElse(
      R.pathSatisfies(id => id === undefined || id === null, ['params', 'id']),
      () => initialState,
      () => postmortems.get('postmortems').get(R.path(['params', 'id'], match)).toJS())(match),
    historyPostmortem: R.ifElse(
      R.pathSatisfies(id => id === undefined || id === null, ['params', 'id']),
      () => [],
      () => historyPostmortem.get((R.path(['params', 'id'], match))).toJS())(match),
  };
};

const dispatchToProps = dispatch => {
  return {
    addPostmortem: (postmortem) => dispatch(addPostmortem({ ...postmortem, id: uuidv4() })),
    editPostmortem: (postmortem) => dispatch(editPostmortem(postmortem))
  };
};

const enhanced = HocValidate(initialState, validationRules);
export default connect(mapStateToProps, dispatchToProps)(enhanced(Postmortem));