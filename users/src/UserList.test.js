import { render, screen, within } from "@testing-library/react";
import UserList from "./UserList";

function renderComponent() {
  const users = [
    { name: "jane", email: "jane@j.com" },
    { name: "sam", email: "sam@s.com" },
  ];
  render(<UserList users={users} />);

  return { users };
}

test("render one row per user", () => {
  // Render the Component
  renderComponent();

  // const { container } = render(<UserList users={users} />);

  //   screen.logTestingPlaygroundURL();

  // find all rows in the table
  //   using role doesnt work since it takes three rows (includes name email from thead)
  //   const rows = screen.getAllByRole("row");

  // When role doesnt work there are two fallbacks for it

  // fallBack 1- data-testid :-assign a prop to the jsx tag data-testid="users" with value of users
  const rows = within(screen.getByTestId("users")).getAllByRole("row");

  // fallBack 2- container.querySelector()

  // eslint-disable-next-line
  //   const rows = container.querySelectorAll("tbody tr");

  // Assertion: correct no. of rows in the table
  expect(rows).toHaveLength(2);
});

test("render the email and name of each user", () => {
  // Render the Component
  const { users } = renderComponent();

  //
  for (let user of users) {
    const name = screen.getByRole("cell", { name: user.name });
    const email = screen.getByRole("cell", { name: user.email });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});
