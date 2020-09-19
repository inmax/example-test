import React from "react";
import App from "./../App";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("App", () => {
  test("integración", () => {
    //1-Montado del componente
    const wrapper = mount(<App />);
    //2- Crear un espía
    const prevent = jest.fn();

    wrapper.find("input").simulate("change", { target: { value: "mi todo!" } });

    wrapper.find("form").simulate("submit", { preventDefault: prevent });

    const res = wrapper.find(".todo").at(0).text().includes("mi todo!");

    expect(res).toEqual(true);
    expect(prevent.mock.calls).toEqual([[]]);
  });
});
