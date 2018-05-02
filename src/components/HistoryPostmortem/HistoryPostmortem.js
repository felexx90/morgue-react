import React from 'react';
import { Table } from 'reactstrap';
import moment from 'moment';

const HistoryPostmortem = ({ history = [] }) => (
  <Table >
    <tbody >
    {history.map((hist) => (
      <tr key={hist.date} >
        <td >{hist.action} by {hist.user} @ {moment(hist.date).format('L LT')}</td >
      </tr >
    ))}
    </tbody >
  </Table >
);

export default HistoryPostmortem;