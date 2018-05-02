import React, { Fragment } from 'react';
import { Badge, Button } from 'reactstrap';

const FilterTags = ({ selectedTags = [], tags = [], onClickTag = () => {}, onClearTags = () => {} }) => {
  console.log(selectedTags);
  return (
    <Fragment >
      <span >
        <b >Filter by Tags {selectedTags.length > 0 ?
          <Button color="link" className="c-pointer"
                  onClick={() => onClearTags()} >(Clear)</Button > : null}
        </b >
      </span >

      <hr />
      <h4 >
        {tags.map((tag) => (
          <span className='c-pointer' key={tag} onClick={() => {onClickTag(tag);}} >{selectedTags.includes(tag) ? <Badge
              color='primary' >{tag}</Badge > :
            <Badge >{tag}</Badge >} </span >
        ))}
      </h4 >
    </Fragment >
  );
};

export default FilterTags;