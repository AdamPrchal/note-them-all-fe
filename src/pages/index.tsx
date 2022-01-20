import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { PlusIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTags } from "../app/store/tagsSlice";
import { fetchNotes } from "../app/store/notesSlice";
import { Note } from "../types/types";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter()
  const dispatch = useDispatch();
  const notes: Note[] = useSelector((state) => state.notes.all);
  const tags: Tag[] = useSelector((state) => state.tags.all);

  useEffect(() => {
    fetchTags(dispatch);
    fetchNotes(dispatch);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-20 space-y-12">
      <div className="flex space-x-4 items-center">
        <input
          type="text"
          placeholder="find by topic"
          className="input input-bordered w-80"
        />
        <div className="divider divider-vertical">or</div>
        <Link href="/note/add">
          <a className="btn">
            <PlusIcon className="w-8 h-8 mr-2" />
            add
          </a>
        </Link>
      </div>
      <div className="overflow-x-auto w-3/4">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Topic</th>
              <th>Tags</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note) => {
              return (
                <tr onClick={()=>{
                  router.push(`/note/${note.id}`)
                }} key={`${note.topic}${note.id}`} className="border-2 border-transparent border-dotted hover:cursor-pointer  hover:border-slate-200 ">
                  <th>{note.id}</th>
                  <td className="truncate">
                    {note.topic.substring(0, 50)}
                    {note.topic.length > 50 ? "..." : null}
                  </td>
                  <td>
                    {
                      <div className="flex space-x-2">
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
                    {note.content.substring(0, 50)}
                    {note.content.length > 50 ? "..." : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
