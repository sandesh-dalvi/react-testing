import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import UserForm from "./UserForm";

test("it shows two inputs and a button", () => {
  // render the component
  render(<UserForm onUserAdd={() => {}} />);

  // Manipulate the component or find an element in it
  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");

  // Assertion - make sure the component is doing
  // what we expect it to do
  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

test("it calls onUserAdd when the form is submitted", async () => {
  // // NOT THE BEST IMPLEMENTATION

  // const argList = [];
  // const callback = (...args) => {
  //   argList.push(args);
  // };
  // // Try to render my component
  // render(<UserForm onUserAdd={callback} />);

  // // Find the two inputs
  // const [nameInput, emailInput] = screen.getAllByRole("textbox");

  // // Simulate typing in a name
  // await user.click(nameInput);
  // await user.keyboard("jane");

  // // Simulate typing in an email
  // await user.click(emailInput);
  // await user.keyboard("jane@jane.com");

  // // Find the button
  // const button = screen.getByRole("button");

  // // Simulate clicking the button
  // user.click(button);

  // // Assertion to make sure 'onUserAdd' gets called with email/name
  // expect(argList).toHaveLength(1);
  // expect(argList[0][0]).toEqual({ name: "jane", email: "jane@jane.com" });

  //
  //

  //
  const mock = jest.fn();
  // Try to render my component
  render(<UserForm onUserAdd={mock} />);

  // Find the two inputs
  // const [nameInput, emailInput] = screen.getAllByRole("textbox");

  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });

  // Simulate typing in a name
  await user.click(nameInput);
  await user.keyboard("jane");

  // Simulate typing in an email
  await user.click(emailInput);
  await user.keyboard("jane@jane.com");

  // Find the button
  const button = screen.getByRole("button");

  // Simulate clicking the button
  user.click(button);

  // Assertion to make sure 'onUserAdd' gets called with email/name
  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith({ name: "jane", email: "jane@jane.com" });
});

test("emptiess the two inputs when form is submitted", async () => {
  render(<UserForm onUserAdd={() => {}} />);

  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });
  const button = screen.getByRole("button");

  await user.click(nameInput);
  await user.keyboard("jane");
  await user.click(emailInput);
  await user.keyboard("jane@jane.com");
  await user.click(button);

  expect(nameInput).toHaveValue("");
  expect(emailInput).toHaveValue("");
});
