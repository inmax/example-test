import React from "react";
import { render } from "@testing-library/react";
import App, { Todo, TodoForm, useTodos } from "./App";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("App", () => {
  describe("Todo", () => {
    test("Ejecuta el método completeTodo cuando hago click en el botón", () => {
      //TODOS LOS DATOS NECESARIOS
      //primero crear el mock de completeTodo
      const completeTodo = jest.fn();
      //cuántas veces y con cuantos argumentos
      //Ej. [[1],[2,3]]. Fue llamado 2 veces, la primera con arg ==1 y la segunda con 2,3
      // completeTodo.mock.calls === [];
      const removeTodo = jest.fn();
      const index = 5;
      const todo = {
        isComplete: true,
        text: "lala"
      };
      //injectamos
      const wrapper = shallow(
        <Todo
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          index={index}
          todo={todo}
        />
      );

      //QUÉ queremos comprobar
      //simulamos un comportamiento
      wrapper
        .find("button")
        .at(0) // de los dos botones escoge el primero
        .simulate("click");

      //Asertion- lanzamos un error cuando algo no se cumple
      // mock utiliza toEqual para comparar. El mock debería de ser llamado una vez, con el valor de index, que en este caso es 5
      expect(completeTodo.mock.calls).toEqual([[5]]);
      expect(removeTodo.mock.calls).toEqual([]); //quiero que no se ejecute esta función
    });

    test("Ejecuta el método removeTodo cuando hago click sobre X", () => {
      //TODOS LOS DATOS NECESARIOS
      //primero crear el mock de completeTodo
      const completeTodo = jest.fn();
      //cuántas veces y con cuantos argumentos
      //Ej. [[1],[2,3]]. Fue llamado 2 veces, la primera con arg ==1 y la segunda con 2,3
      // completeTodo.mock.calls === [];
      const removeTodo = jest.fn();
      const index = 5;
      const todo = {
        isComplete: true,
        text: "lala"
      };

      const wrapper = shallow(
        <Todo
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          index={index}
          todo={todo}
        />
      );

      //QUÉ queremos comprobar
      wrapper
        .find("button")
        .at(1) // de los dos botones escoge el segundo
        .simulate("click");

      //Asertion- lanzamos un error cuando algo no se cumple
      // mock utiliza toEqual para comparar. El mock debería de ser llamado una vez, con el valor de index, que en este caso es 5
      expect(removeTodo.mock.calls).toEqual([[5]]);
      expect(completeTodo.mock.calls).toEqual([]); //quiero que no se ejecute
    });
  });

  describe("TodoForm", () => {
    test("llamar al método addTodo cuando el formulario cambia su valor", () => {
      //1-Mock
      const addTodo = jest.fn();
      const prevent = jest.fn(); // esto es rizar el rizo

      //2-render
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

  describe("Custom Hook: useTodos", () => {
    describe("addTodo", () => {
      //los hooks no se pueden ir por ahi de parranda ellos solitos, siempre van asociados a un componente
      //1-Definimos dicho componente:
      const Test = props => {
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
      const Test = props => {
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
      console.log(props.todos[0])
      expect(props.todos[0]).toEqual({ text: "Todo 2",isCompleted: false });
    });

    describe("completeTodo", () => {
      //los hooks no se pueden ir por ahi de parranda ellos solitos, siempre van asociados a un componente
      //1-Definimos dicho componente:
      const Test = props => {
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
      expect(props.todos[0]).toEqual({ text:"Todo 1",isCompleted: true });
    });
  });
});
