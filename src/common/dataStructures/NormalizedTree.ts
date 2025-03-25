export type NormalizedTreeNode<TData = unknown> = {
  id: string;
  children: string[];
  data: TData;
};

export type NormalizedTree = {
  [key: string]: NormalizedTreeNode;
};

export const iteratePostOrder = (
  tree: NormalizedTree,
  rootId: string,
  callback: (node: NormalizedTreeNode) => void,
) => {
  const stack: string[] = [rootId];

  while (stack.length > 0) {
    const nodeId = stack.pop();
    if (!nodeId) {
      continue;
    }
    const node = tree[nodeId];
    callback(node);
    stack.push(...node.children);
  }
};

// {
//   id: "1",
//   children: ["2", "3"],
// }
// {
//   id: "2",
//   children: ["4"],
// }
// {
//   id: "3",
//   children: [],
// }
// {
//   id: "4",
//   children: [],
// }
