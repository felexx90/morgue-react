import React from 'react';
import { connect } from 'react-redux';
import { Button, ButtonGroup, Col, Row, Table } from 'reactstrap';
import { branch, compose, renderComponent, withHandlers, mapProps, withState } from 'recompose';
import { removePostmortem } from '../actions/postmortem.action';
import FilterTags from '../components/FilterTags/FilterTags';
import moment from 'moment';
import * as R from 'ramda';

const EmptyTable = () => (
  <Table >
    <thead >
    <tr >
      <th >Title</th >
      <th >Start Date</th >
      <th >End Date</th >
      <th >Detected Date</th >
      <th >Severity</th >
      <th >Actions</th >
    </tr >
    </thead >
    <tbody >
    <tr >
      <td colSpan={5} >No Data</td >
    </tr >
    </tbody >
  </Table >
);

const renderEmptyTableIfEmpty = branch(({ postmortems }) => {
    return postmortems && postmortems.isEmpty();
  },
  renderComponent(EmptyTable)
  )
;

const ListPostmortem = renderEmptyTableIfEmpty(({ selectedTags, postmortems, onEdit, onDelete, search }) => (
  <Table striped hover >
    <thead >
    <tr >
      <th >Title</th >
      <th >Start Date</th >
      <th >End Date</th >
      <th >Detected Date</th >
      <th >Severity</th >
      <th >Actions</th >
    </tr >
    </thead >
    <tbody >
    {postmortems.toArray().
      filter((postmortem) => selectedTags.length === 0 || R.without(selectedTags)(postmortem.get('tags')).length === 0).
      filter((postmortem) => search === null || postmortem.get('title').includes(search)).
      map((postmortem) => {
        return (
          <tr key={postmortem.get('id')} >
            <td >{postmortem.get('title')}</td >
            <td >{moment(postmortem.get('startDate')).format('L LT')}</td >
            <td >{moment(postmortem.get('endDate')).format('L LT')}</td >
            <td >{moment(postmortem.get('detectedDate')).format('L LT')}</td >
            <td >{postmortem.get('severity')}</td >
            <td >
              <ButtonGroup >
                <Button color="primary" onClick={() => {onEdit(postmortem);}} >Edit</Button >
                <Button color="danger" onClick={() => {onDelete(postmortem);}} >Delete</Button >
              </ButtonGroup >
            </td >
          </tr >
        );
      })}
    </tbody >
  </Table >
));

const Container = (props) => (
  <Row >
    <Col xs={9} >
      <ListPostmortem {...props}/>
    </Col >
    <Col xs={3} >
      <FilterTags {...props}/>
    </Col >
  </Row >
);

const mapStateToProps = state => {
  return {
    postmortems: state.postmortems.get('postmortems'),
    search: state.postmortems.get('search')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removePostmortem: (postmortem) => dispatch(removePostmortem(postmortem))
  };
};

const enhance = compose(
  withState('selectedTags', 'updateState', []),
  mapProps(({ postmortems, ...rest }) => ({
    tags: R.ifElse(R.compose(R.not, R.isNil),
      (postmortems) => R.compose(R.dropRepeats, R.flatten)(postmortems.toArray().map(postmortem => postmortem.get('tags'))),
      () => [])(
      postmortems),
    postmortems,
    ...rest
  })),
  withHandlers({
    onEdit: ({ history }) => postmortem => {
      history.push(`/postmortem/${postmortem.get('id')}`);
    },
    onDelete: ({ removePostmortem }) => postmortem => {
      removePostmortem(postmortem);
    },
    onClickTag: ({ updateState }) => (tag) => {
      updateState(
        selectedTags => R.ifElse(R.contains(tag), R.dropLastWhile(selectedTag => R.equals(selectedTag, tag)),
          R.compose(R.dropRepeats, R.append(tag)))(selectedTags));
    },
    onClearTags: ({ updateState }) => () => {
      updateState(() => []);
    }
  })
  )
;

export default connect(mapStateToProps, mapDispatchToProps)(enhance(Container));