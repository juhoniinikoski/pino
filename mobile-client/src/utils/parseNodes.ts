interface Edge<T> {
  __typename: string;
  cursor: string;
  node: T;
}

const parseNodes = <T>(edges: Edge<T>[]): T[] => {
  return edges.map(e => e.node);
};

export default parseNodes;
