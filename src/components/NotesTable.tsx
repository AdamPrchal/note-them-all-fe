import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Note, Tag } from "../types/types";

type Props = {
  notes: Note[];
};

const NotesTable = ({ notes }: Props) => {
  const router = useRouter();
  const tags: Tag[] = useSelector((state) => state.tags.all);

  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full table-zebra table-fixed">
        <thead>
          <tr>
            <th className="w-6"></th>
            <th >Topic</th>
            <th >Tags</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => {
            return (
              <tr
                onClick={() => {
                  router.push(`/note/${note.id}`);
                }}
                key={`${note.topic}${note.id}`}
                className="hover:cursor-pointer transition hover:opacity-80 "
              >
                <th>{note.id}</th>
                <td className="truncate">
                  {note.topic}
               
                </td>
                <td>
                  {
                    <div className="flex space-x-2 overflow-hidden">
                      {note.tags.map((tagId) => {
                        return (
                          <div key={tagId} className="badge badge-primary">
                            {
                              tags.find((tag) => {
                                return Number(tag.id) === tagId;
                              })?.name
                            }
                          </div>
                        );
                      })}
                    </div>
                  }
                </td>
                <td className="truncate">
                  {note.content}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default NotesTable