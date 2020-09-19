import React from "react";
import Todo from "components/Todo";
import { shallow, configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("Todo", () => {
    test("Ejecuta el método completeTodo cuando hago click en el botón", () => {
      //FASE I ARRANGE. TODOS LOS DATOS NECESARIOS, argumentos.

      //primero crear el mock de completeTodo
      const completeTodo = jest.fn();
      //cuántas veces y con cuantos argumentos
      //Ej. [[1],[2,3]]. Fue llamado 2 veces, la primera con arg ==1 y la segunda con 2,3
      // completeTodo.mock.calls === [];
      const removeTodo = jest.fn();
      const index = 0;
      const todo = {
        isComplete: true,
        text: "lala",
      };

      // injectamos

      const wrapper = shallow(
        <Todo
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          index={index}
          todo={todo}
        />
      );

      //FASE 1 ACT. QUÉ queremos comprobar
      //simulamos un comportamiento
      wrapper
        .find("button")
        .at(0) // de los dos botones escoge el primero
        .simulate("click");

      //Asertion- lanzamos un error cuando algo no se cumple
      // mock utiliza toEqual para comparar. El mock debería de ser llamado una vez, con el valor de index, que en este caso es 5
      expect(completeTodo.mock.calls).toEqual([[0]]);
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
        text: "lala",
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