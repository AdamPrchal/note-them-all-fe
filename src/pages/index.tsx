import type { NextPage } from "next";
import { PlusIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTags } from "../app/store/tagsSlice";
import { fetchNotes } from "../app/store/notesSlice";
import { Note, Tag } from "../types/types";
import NotesTable from "../components/NotesTable";
import NotesGraph from "../components/NotesGraph";

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const [searchedTopic, setSearchedTopic] = useState("");
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [shownNotesCount, setShownNotesCount] = useState(5);

  const notes: Note[] = useSelector((state) => state.notes.all);

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    const newSearch = e.currentTarget.value;
    setSearchedTopic(newSearch);

    if (newSearch.length) {
      const fittingNotes = notes.filter((note) => {
        return note.topic.toLowerCase().includes(newSearch.toLowerCase());
      });
      setFilteredNotes(fittingNotes);
    } else {
      setFilteredNotes(notes);
    }
  };

  const handleShowMoreNotes = () => {
    setShownNotesCount(shownNotesCount + 5);
  };

  useEffect(() => {
    setFilteredNotes(notes);
  }, [notes]);

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
          value={searchedTopic}
          onChange={handleSearch}
        />
        <div className="divider divider-vertical">or</div>
        <Link href="/note/add">
          <a className="btn">
            <PlusIcon className="w-8 h-8 mr-2" />
            add
          </a>
        </Link>
      </div>
      <div className="w-full flex space-x-4">
        <div className="w-1/2 flex flex-col items-center space-y-4">
          <NotesTable notes={filteredNotes.slice(0, shownNotesCount)} />
          {filteredNotes.length > shownNotesCount ? (
            <button onClick={handleShowMoreNotes} className="btn btn-primary">
              Show more
            </button>
          ) : null}
        </div>
        <div className="w-1/2 max-h-[800px] card card-bordered">
          <NotesGraph notes={notes} />
        </div>
      </div>
    </div>
  );
};

export default Home;
