import { fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';

test('renders To Do App', () => {
  render(<App />);
  const linkElement = screen.getByText(/To Do App/i);
  expect(linkElement).toBeInTheDocument();
});

function addTodo(todoLabel, priority) {
  const inputElement = screen.getByTestId("addLabel");
  fireEvent.change(inputElement, {
    target: {value: todoLabel}
  })
  const selectElement = screen.getByTestId("addPriority");
  fireEvent.change(selectElement, {
    target: {value: priority}
  })
  fireEvent.click(screen.getByText(/add/i))
}

test('Add new to do using the form', () => {
  const todoLabel = "Shantanu First Todo";
  render(<App />);
  addTodo(todoLabel, 5)
  expect(screen.getByText(todoLabel));
});

test('Add multiple todo and check of they are arranged as per priority', () => {
  const todoLabel1 = "Shantanu First Todo";
  const todoLabel2 = "Shantanu Second Todo";
  const todoLabel3 = "Shantanu Third Todo";
  render(<App />);
  addTodo(todoLabel1, 5)
  addTodo(todoLabel2, 6)
  addTodo(todoLabel3, 1)

  const allTodos = screen.queryAllByTestId("todo");
  expect(within(allTodos[0]).getByText(todoLabel3));
  expect(within(allTodos[1]).getByText(todoLabel1));
  expect(within(allTodos[2]).getByText(todoLabel2));
});

test('Delete exiting todo', () => {
  const todoLabel = "Shantanu First Todo";
  render(<App />);

  // Todo added
  addTodo(todoLabel, 5)

  expect(screen.getByText(todoLabel));

  fireEvent.click(screen.getByText(todoLabel).closest("div").lastChild)
  expect(screen.queryByText(todoLabel)).toBeNull()
});

test('Delete Multiple exiting todo', () => {
  render(<App />);

  // Todo added
  addTodo("Shantanu First Todo", 5)
  addTodo("Shantanu Second Todo", 6)
  addTodo("Shantanu Third Todo", 7)

  fireEvent.click(screen.getByText("Shantanu First Todo").closest("div").firstChild)
  fireEvent.click(screen.getByText("Shantanu Second Todo").closest("div").firstChild)
  fireEvent.click(screen.getByText("Delete Selected"));
  expect(screen.getByText("Shantanu Third Todo"))
  expect(screen.queryByText("Shantanu First Todo")).toBeNull()
  expect(screen.queryByText("Shantanu Second Todo")).toBeNull()
});

test('Edit exiting todo', () => {
  const {debug} = render(<App />);

  // Todo added
  addTodo("Shantanu First Todo", 5)
  addTodo("Shantanu Second Todo", 6)
  addTodo("Shantanu Third Todo", 7)

  fireEvent.doubleClick(screen.getByText("Shantanu First Todo"));

  const editForm = screen.getByTestId("editForm");
  expect(editForm);

  fireEvent.change(editForm.firstElementChild, {
    target: {
      value: "Updated todo"
    }
  })
  fireEvent.click(editForm.lastElementChild)
  expect(screen.getByText("Updated todo"))
  expect(screen.queryByText("Shantanu First Todo")).toBeNull()
});
