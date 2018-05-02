import React, { Fragment } from 'react';
import MarkdownEditor from './MarkdownEditor';
import { Col } from 'reactstrap';
import MarkdownViewer from './MarkdownViewer';

const Markdown = ({ value = '', onChange = () => {} }) => (
  <Fragment >
    <Col xs={6} >
      <MarkdownEditor markdown={value} onChange={onChange} />
    </Col >
    <Col xs={6} >
      <MarkdownViewer markdown={value} />
    </Col >
  </Fragment >
);

export default Markdown;