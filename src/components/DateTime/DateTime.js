import React from 'react';
import * as Datetime from 'react-datetime';
import { Input, InputGroup } from 'reactstrap';
import { isNotEmptyComponent } from '../../helpers/Validators';
import moment from 'moment';

function renderInput({ children, errors, ...rest }, openCalendar) {
  return (
    <InputGroup >
      <Input {...rest} invalid={isNotEmptyComponent(errors)} onClick={openCalendar} onFocus={openCalendar} />
      {children}
    </InputGroup >
  );
};

const DateTime = ({ children, errors, value, onChange }) => (
    <Datetime dateFormat="L" timeFormat="LT" value={moment(value)} onChange={onChange} inputProps={{ errors, children }}
              renderInput={renderInput} />
  )
;

export default DateTime;