# React TreeMap

![TreeMap Example](https://raw.githubusercontent.com/mmmusavi/react-treemap/main/docs/Screenshot.png)

**React TreeMap** is a highly customizable and interactive TreeMap component for React applications. It allows you to visualize hierarchical data in a nested rectangle format, where each rectangle represents a node in the tree structure. Perfect for data visualization, dashboards, and analytics applications.

---

## Features

-   **Interactive TreeMap**: Supports left-click, right-click, and hover interactions.
-   **Customizable Colors**: Define colors for each node using hex codes.
-   **Tooltips**: Display custom HTML tooltips on hover.
-   **Responsive Design**: Automatically adjusts to the container size.
-   **Lightweight**: Minimal dependencies and easy to integrate.
-   **TypeScript Support**: Includes TypeScript definitions for better developer experience.

---

## Installation

Install the package via **npm** or **yarn**:

```bash
npm install react-treemap
```

or

```bash
yarn add react-treemap
```

---

## Usage

### Basic Example

Here’s a simple example to get you started:

```jsx
import React from "react";
import TreeMap from "react-treemap";

function App() {
    const treeData = {
        children: [
            {
                children: [],
                data: {
                    $area: 10,
                    $color: 1,
                    $hex: "#000000",
                },
                id: "a",
                name: "name-1",
                tooltip: '<div class="mm-tooltip">Tooltip 1</div>',
            },
            {
                children: [],
                data: {
                    $area: 50,
                    $color: 2,
                    $hex: "#9A2C42",
                },
                id: "b",
                name: "name-2",
                tooltip: '<div class="mm-tooltip">Tooltip 2</div>',
            },
            {
                children: [
                    {
                        children: [],
                        data: {
                            $area: 20,
                            $color: 3,
                            $hex: "#1B8B5F",
                        },
                        id: "c1",
                        name: "name-3",
                        tooltip: '<div class="mm-tooltip">Tooltip 3</div>',
                    },
                    {
                        children: [],
                        data: {
                            $area: 20,
                            $color: 3,
                            $hex: "#02AD65",
                        },
                        id: "c2",
                        name: "name-3",
                        tooltip: '<div class="mm-tooltip">Tooltip 3</div>',
                    },
                ],
                data: {
                    $area: 40,
                },
                id: "c",
                name: "name-3",
            },
        ],
        data: { $area: 100 },
        id: "id-0",
        name: "Title",
        tooltip: '<div class="mm-tooltip">Tooltip</div>',
    };

    return (
        <div style={{ width: "800px", height: "400px" }}>
            <TreeMap treeData={treeData} />
        </div>
    );
}

export default App;
```

---

## Props

| Prop Name  | Type   | Description                                                                                                               |
| ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------- |
| `treeData` | Object | The hierarchical data to be visualized. Each node should have `children`, `data`, `id`, `name`, and `tooltip` properties. |

---

## API Documentation

### `TreeMap` Component

The `TreeMap` component accepts the following props:

#### `treeData` (Required)

-   **Type**: `Object`
-   **Description**: The hierarchical data to be visualized. Each node should have:
    -   `children`: Array of child nodes.
    -   `data`: Object containing `$area`, `$color`, and `$hex` properties.
    -   `id`: Unique identifier for the node.
    -   `name`: Display name for the node.
    -   `tooltip`: HTML string to display as a tooltip on hover.

---

## Acknowledgments

-   Built with ❤️ by MirMohammad Musavi.

---
