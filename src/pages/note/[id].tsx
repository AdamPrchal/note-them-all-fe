import type { NextPage } from "next";
import { PlusIcon, HomeIcon, PencilIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { Note, Tag } from "../../types/types";
import { useEffect, useState } from "react";
import axios from "axios";
import { fetchNotes } from "../../app/store/notesSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchTags } from "../../app/store/tagsSlice";
import NotesTable from "../../components/NotesTable";
import NotesGraph from "../../components/NotesGraph";

const NoteDetail: NextPage = () => {
  const [note, setNote] = useState<Note | null>(null);

  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const tags: Tag[] = useSelector((state) => state.tags.all);
  const notes: Note[] = useSelector((state) => state.notes.all);

  const thisLevelNotes = notes.filter((item) => {
    if (note) {
      if (item.id === note.id) {
        return true;
      }
      console.log(note)
      if(note.links.includes(item.id)){
        return true;
      }
    }
  });

  useEffect(() => {
    const getNoteDetail = async (id: string) => {
      try {
        const response = await axios.get(`http://localhost:8080/note/${id}`);
        setNote(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (id) {
      getNoteDetail(id);
    }
    fetchTags(dispatch);
    fetchNotes(dispatch);
  }, [id]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-20 space-y-12">
      <div className="flex space-x-4 items-center">
        <Link href="/">
          <a className="btn">
            <HomeIcon className="w-8 h-8" />
          </a>
        </Link>
        <div className="divider divider-vertical">or</div>
        <Link href="/note/add">
          <a className="btn">
            <PlusIcon className="w-8 h-8 mr-2" />
            add note
          </a>
        </Link>
        <div className="divider divider-vertical">or</div>

        <Link href="/tag/add">
          <a className="btn">
            <PlusIcon className="w-8 h-8 mr-2" />
            add tag
          </a>
        </Link>
      </div>
      <div className="card shadow-lg bg-base-200 w-full lg:4/5 xl:w-3/5 2xl:w-2/5 overflow-visible">
        {note ? (
          <div className="card-body overflow-visible">
            <div className="flex items-center w-full">
              <h2 className="my-4 text-4xl font-bold card-title overflow-visible">
                {note?.topic}
              </h2>
              <Link href={`/note/${note.id}/edit`}>
                <a className="btn btn-primary ml-auto">
                  <PencilIcon className="w-8 h-8 mr-2" />
                  Edit
                </a>
              </Link>
            </div>
            <div className="flex mb-4 space-x-2">
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
            <div className="p-10 card bg-base-300 overflow-visible mb-4">
              <p>{note.content}</p>
            </div>

            <h3 className="my-4 text-2xl font-bold card-title overflow-visible">
              Linked notes
            </h3>
            <div className="w-full h-[500px] card mb-4">
              <NotesGraph notes={thisLevelNotes} />
            </div>
            <div className="p-10 card bg-base-300 overflow-visible">
              <NotesTable notes={thisLevelNotes.filter((item)=>{
                return item.id !== note.id
              })} />
            </div>
          </div>
        ) : (
          <div className="card-body overflow-visible">
            <h2 className="my-4 text-4xl font-bold card-title overflow-visible">
              Note not found
            </h2>{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteDetail;
