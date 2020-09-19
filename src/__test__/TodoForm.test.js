import React from "react";
import TodoForm from "components/TodoForm";
import { shallow, configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("TodoForm", () => {
    test("llamar al método addTodo cuando el formulario cambia su valor", () => {
      //1-Mock
      const addTodo = jest.fn();
      const prevent = jest.fn(); // esto es rizar el rizo

      //2-render también llamado espía
      const wrapper = shallow(<TodoForm addTodo={addTodo} />);

      //3-Simular el comportamiento
      wrapper
        .find("input")
        .simulate("change", { target: { value: "mi nuevo to do" } });
      wrapper.find("form").simulate("submit", { preventDefault: prevent });
      //4-Asserts
      expect(addTodo.mock.calls).toEqual([["mi nuevo to do"]]);
      expect(prevent.mock.calls).toEqual([[]]);
    });
  });