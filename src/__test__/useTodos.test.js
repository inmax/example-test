import React from "react";
import { useTodos } from "hooks/useTodos.js";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("Custom Hook: useTodos", () => {
  test("addTodo", () => {
    //los hooks no se pueden ir por ahi de parranda ellos solitos, siempre van asociados a un componente
    //1-Definimos dicho componente:
    const Test = (props) => {
      const hook = props.hooks();
      return <div {...hook} />;
    };

    //2-Enzyme render
    const wrapper = shallow(<Test hooks={useTodos} />);
    //preguntamos por las props
    let props = wrapper.find("div").props();
    //ejecución
    props.addTodo("texto de prueba");
    //Ahora el valor inicial que tenía props ha cambiado, por eso necesito volver a llamarlo
    props = wrapper.find("div").props();
    expect(props.todos[0]).toEqual({ text: "texto de prueba" });
  });

  describe("removeTodo", () => {
    //los hooks no se pueden ir por ahi de parranda ellos solitos, siempre van asociados a un componente
    //1-Definimos dicho componente:
    const Test = (props) => {
      const hook = props.hooks();
      return <div {...hook} />;
    };

    //2-Enzyme render
    const wrapper = shallow(<Test hooks={useTodos} />);
    //preguntamos por las props
    let props = wrapper.find("div").props();
    //ejecución
    props.removeTodo(0);
    //Ahora el valor inicial que tenía props ha cambiado, por eso necesito volver a llamarlo
    props = wrapper.find("div").props();
    console.log(props.todos[0]);
    expect(props.todos[0]).toEqual({ text: "Todo 2", isCompleted: false });
  });

  describe("completeTodo", () => {
    //los hooks no se pueden ir por ahi de parranda ellos solitos, siempre van asociados a un componente
    //1-Definimos dicho componente:
    const Test = (props) => {
      const hook = props.hooks();
      return <div {...hook} />;
    };

    //2-Enzyme render
    const wrapper = shallow(<Test hooks={useTodos} />);
    //preguntamos por las props
    let props = wrapper.find("div").props();
    //ejecución
    props.completeTodo(0);
    //Ahora el valor inicial que tenía props ha cambiado, por eso necesito volver a llamarlo
    props = wrapper.find("div").props();
    expect(props.todos[0]).toEqual({ text: "Todo 1", isCompleted: true });
  });
});
