import './App.scss';
import React, { useEffect, useRef } from 'react';

function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const graph = new mxGraph(containerRef.current!);

    graph.setPanning(true);
    mxEvent.disableContextMenu(containerRef.current!);
    new mxRubberband(graph);

    const model = graph.getModel();
    const parent = graph.getDefaultParent();
    model.beginUpdate();
    try {
      const cell1 = graph.insertVertex(parent, '', 'React', 0, 0, 100, 100);
      const cell2 = graph.insertVertex(parent, '', 'mxGraph', 200, 200, 100, 100);
      graph.insertEdge(parent, '', 'with', cell1, cell2);
    } finally {
      model.endUpdate();
    }
  }, []);

  return (
    <div className="App">
      <div ref={ containerRef }  className="diagram-container"></div>
    </div>
  );
}

export default App;
