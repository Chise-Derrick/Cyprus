import React, { useState } from "react";
import Select from "react-dropdown-select";

const Selects = ({ options }) => (
  <Select
    multi
    options={options}
    onChange={(values) => this.onChange(values)}
  />
);

export default Selects;
