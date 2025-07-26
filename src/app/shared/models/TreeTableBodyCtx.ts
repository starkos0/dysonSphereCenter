import { TreeNode } from "primeng/api";
import { DataTree } from "./core/DataTree";

export interface TreeTableBodyCtx {
  $implicit: TreeNode<DataTree>;
  rowNode: TreeNode<DataTree>;
  rowData: DataTree;
}
