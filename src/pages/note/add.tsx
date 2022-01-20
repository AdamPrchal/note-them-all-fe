import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { HomeIcon, PlusIcon } from "@heroicons/react/solid";
import Link from "next/link";
import makeAnimated from "react-select/animated";
import React, { Component, useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { customStyles } from "../../components/Multiselect";
import { NoteBody, Tag, TagSelectFormat } from "../../types/types";
import createNote from "../../api/createNote";
import { useDispatch, useSelector } from "react-redux";
import { fetchTags } from "../../app/store/tagsSlice";
import { fetchNotes } from "../../app/store/notesSlice";

const Add: NextPage = () => {
  const dispatch = useDispatch();
  const tags: Tag[] = useSelector((state) => state.tags.all);

  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<TagSelectFormat[]>([]);
  const fetchedTags = tags.map((tag) => {
    return { value: tag.id, label: tag.name };
  });

  const animatedComponents = makeAnimated();

  const handleChange = (selectedOption: any) => {
    setSelectedTags(selectedOption);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newNoteData: NoteBody = {
      topic: topic.length ? topic : "",
      content: content.length ? content : "",
      tags: selectedTags.map((tag) => tag.value),
    };
    await createNote(newNoteData);
  };

  useEffect(() => {
    fetchTags(dispatch);
    fetchNotes(dispatch);
  }, []);

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
                  <span className="label-text">Topic</span>
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
                  defaultValue={[]}
                  isMulti
                  options={fetchedTags}
                  onChange={handleChange}
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

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add;
