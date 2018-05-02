import React from 'react';
import { parse } from 'markdown';
import { branch, renderNothing, renderComponent } from 'recompose';

const MarkdownViewer = ({ markdown }) => (
  <div dangerouslySetInnerHTML={{ __html: parse(markdown) }} />
);

const markdownExist = (props) => {
  return !props.markdown;
};

export default branch(markdownExist, renderNothing, renderComponent(MarkdownViewer))();