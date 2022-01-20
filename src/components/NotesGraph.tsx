import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactFlow from "react-flow-renderer";
import { Note } from "../types/types";

type Props = {
  notes: Note[];
};


const style = {
  background: '#793EF9',
  width: '100%',
};

const NotesGraph = ({ notes }: Props) => {
  const router = useRouter();

  const [nodes, setNodes] = useState<any>([]);
  const [edges, setEdges] = useState<any>([]);

  const handleElementClick = (event, element) => {
    router.push(`/note/${element.id}`)
  };

  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
  };

  const getRandomPos = () => {
    return { x: getRandomInt(1000), y: getRandomInt(500) };
  };

  useEffect(() => {
    const newNodes = notes.map((note) => {
      return {
        id: note.id.toString(),
        data: {
          label: <div className="truncate">{note.topic}</div>,
        },
        position: getRandomPos(),
      };
    });

    setNodes(newNodes);

    const newEdges: any = [];
    notes.forEach((note) => {
      note.links.forEach((link) => {
        newEdges.push({
          id: `e${note.id}-${link}`,
          source: note.id.toString(),
          target: link.toString(),
          animated: true,
        });
      });
    });

    setEdges(newEdges);
  }, [notes]);

  return (
    <ReactFlow
      onElementClick={handleElementClick}
      elements={[...nodes, ...edges]}
      style={style}
    />
  );
};

export default NotesGraph;
