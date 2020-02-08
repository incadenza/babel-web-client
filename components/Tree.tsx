import React from "react";
import TreeNode from "./TreeNode";

type Node<T = Folder> = T & { isOpen: boolean };

export type Folder = {
  id: number;
  name: string;
  children: number[];
  userId: number;
  position: number;
  parentId: number;
};

export type Folders = Record<string, Folder>;

type Props = {
  folders: Folders;
};

const buildNodes = (folders: Folders): Record<string, Node> => {
  return Object.entries(folders).reduce(
    (acc, [key, val]) => ({
      ...acc,
      [key]: { ...val, isOpen: false }
    }),
    {}
  );
};

const Tree: React.FC<Props> = ({ folders }) => {
  const [nodes, updateNodes] = React.useState(buildNodes(folders));

  const toggleNode = (id: number) => {
    const selectedNode = nodes[id];
    const opened = { [id]: { ...selectedNode, isOpen: !selectedNode.isOpen } };
    updateNodes({ ...nodes, ...opened });
  };

  const rootNode = Object.values(nodes).find(f => !f.parentId);

  const getChildNodes = node => {
    if (!node.children) return [];
    return node.children.map(id => nodes[id]);
  };

  return rootNode ? (
    <TreeNode
      toggleNode={toggleNode}
      node={rootNode}
      getChildNodes={getChildNodes}
    />
  ) : null;
};

export default Tree;
