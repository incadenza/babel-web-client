import React from "react";
import {
  FaFolder,
  FaFolderOpen,
  FaChevronDown,
  FaChevronRight
} from "react-icons/fa";
import styles from "./TreeNode.module.css";
import { Folder } from "./Tree";
import classnames from "classnames/bind";

const cx = classnames.bind(styles);

type Node<T = Folder> = T & { isOpen: boolean };

type Props = {
  node: Node;
  getChildNodes: (node: Node) => Node[];
  level?: number;
  toggleNode: (id: number) => void;
};

const TreeNode: React.FC<Props> = ({
  node,
  getChildNodes,
  level = 0,
  toggleNode
}) => {
  const className = cx("node", `level-${level}`);
  return (
    <>
      <div className={className}>
        <div onClick={() => toggleNode(node.id)} className={styles.icon}>
          {node.isOpen ? <FaChevronDown /> : <FaChevronRight />}
        </div>

        <div className={styles.icon}>
          {node.isOpen ? <FaFolderOpen /> : <FaFolder />}
        </div>

        <span role="button">{node.name}</span>
      </div>

      {node.isOpen &&
        getChildNodes(node).map(childNode => (
          <TreeNode
            key={childNode.id}
            node={childNode}
            level={level + 1}
            getChildNodes={getChildNodes}
            toggleNode={toggleNode}
          />
        ))}
    </>
  );
};

export default TreeNode;
