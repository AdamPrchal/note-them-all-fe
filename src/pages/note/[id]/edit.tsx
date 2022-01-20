import type { NextPage } from "next";
import { HomeIcon } from "@heroicons/react/solid";
import Link from "next/link";
import makeAnimated from "react-select/animated";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { customStyles } from "../../../components/Multiselect";
import { Note, NoteBody, Tag, SelectFormat } from "../../../types/types";
import createNote from "../../../api/createNote";
import { useDispatch, useSelector } from "react-redux";
import { fetchTags } from "../../../app/store/tagsSlice";
import { fetchNotes } from "../../../app/store/notesSlice";
import { toast } from "react-toastify";
import sleep from "../../../utils/sleep";
import { useRouter } from "next/router";
import axios from "axios";

const Add: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const tags: Tag[] = useSelector((state) => state.tags.all);
  const notes: Note[] = useSelector((state) => state.notes.all);

  const fetchedTags = tags.map((tag) => {
    return { value: tag.id, label: tag.name };
  });

  const fetchedNotes = notes.map((note) => {
    return { value: note.id, label: note.topic };
  });

  const [note, setNote] = useState<Note | null>(null);
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<SelectFormat[]>();
  const [selectedNotes, setSelectedNotes] = useState<SelectFormat[]>([]);
  const [oldTags, setOldTags] = useState<SelectFormat[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const animatedComponents = makeAnimated();

  const handleTagsChange = (selectedOption: any) => {
    setSelectedTags(selectedOption);
  };
  const handleNotesChange = (selectedOption: any) => {
    setSelectedNotes(selectedOption);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newNoteData: NoteBody = {
      topic,
      content,
      tags: selectedTags.map((tag) => tag.value),
      links: selectedNotes.map((note) => note.value),
    };
    if (topic) {
      setIsLoading(true);
      await sleep(1000);
      const data = await createNote(newNoteData);
      if (data.id) {
        toast("Note created");
        router.push(`/note/${data.id}`);
      } else {
        setIsLoading(false);
        toast(data);
      }
    } else {
      toast("You must enter the topic");
    }
  };

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
  }, []);

  useEffect(() => {
    if(note){
      setTopic(note.topic)
      setContent(note.content)
    }
  }, [note]);

  useEffect(() => {
    fetchTags(dispatch);
    fetchNotes(dispatch);
  }, []);

  useEffect(() => {
    const origTags = note?.tags.map((tag) => {
      return fetchedTags.find((fTags) => {
        return tag === fTags.value;
      });
    });
    setOldTags(origTags);
    handleTagsChange(origTags);
  }, [note, notes, tags]);

  console.log(selectedTags);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-20 space-y-12">
      <div className="flex space-x-4 items-center">
        <Link href="/">
          <a className="btn">
            <HomeIcon className="w-8 h-8" />
          </a>
        </Link>
        <input
          type="text"
          placeholder="find by topic"
          className="input input-bordered w-80"
        />
      </div>
      <div className="card shadow-lg bg-base-200 w-full lg:4/5 xl:w-3/5 2xl:w-2/5 overflow-visible">
        <div className="card-body overflow-visible">
          <h2 className="my-4 text-4xl font-bold card-title overflow-visible">
            Add new note
          </h2>{" "}
          <form onSubmit={handleSubmit}>
            <div className="p-10 card bg-base-300 overflow-visible">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Topic*</span>
                </label>
                <input
                  type="text"
                  placeholder="Topic of the note"
                  className="input"
                  value={topic}
                  onChange={(e) => {
                    setTopic(e.currentTarget.value);
                  }}
                />

                <label className="label">
                  <span className="label-text">Tags</span>
                </label>
                <Select
                  instanceId="postType"
                  styles={customStyles}
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  defaultValue={oldTags[0]}
                  isMulti
                  options={fetchedTags}
                  onChange={handleTagsChange}
                />

                <label className="label">
                  <span className="label-text">Link to</span>
                </label>
                <Select
                  instanceId="postTypeTwo"
                  styles={customStyles}
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  defaultValue={[]}
                  isMulti
                  options={fetchedNotes}
                  onChange={handleNotesChange}
                />

                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  className="textarea h-24 textarea-bordered mb-8"
                  placeholder="Content"
                  value={content}
                  onChange={(e) => {
                    setContent(e.currentTarget.value);
                  }}
                ></textarea>

                <div className="flex space-x-4 w-full">
                  <button
                    disabled={isLoading}
                    type="submit"
                    className="btn btn-primary disabled w-1/2"
                  >
                    Submit
                  </button>
                  <Link href={"/"}>
                    <a type="button" className="btn btn-secondary w-1/2">
                      Cancle
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add;
