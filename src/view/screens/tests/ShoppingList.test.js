import React from "react";
import renderer from "react-test-renderer";
import { ShoppingListScreen } from "../ShoppingList.jsx";

it('renders correctly', () => {
    const tree = renderer
      .create(<ShoppingListScreen />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
