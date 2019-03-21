import React from "react";
import { shallow } from "enzyme";
import Cell from "./Cell";
import "./setUpTest";

it("should render successfully", function() {
    shallow(<Cell x/>);
});
