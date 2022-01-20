import type { NextPage } from "next";
import { HomeIcon, PlusIcon } from "@heroicons/react/solid";
import Link from "next/link";
import React, { useState } from "react";
import { TagBody } from "../../types/types";

import { toast } from "react-toastify";
import sleep from "../../utils/sleep";
import { useRouter } from "next/router";
import createTag from "../../api/createTag";

const Add: NextPage = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTagData: TagBody = {
      name,
    };
    if (name) {
      setIsLoading(true);
      await sleep(1000);
      const data = await createTag(newTagData);
      if (data) {
        toast("Tag created");
        router.push("/");
      } else {
        setIsLoading(false);
        toast(data);
      }
    } else {
      toast("You must enter the name");
    }
  };

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
      </div>
      <div className="card shadow-lg bg-base-200 w-full lg:4/5 xl:w-3/5 2xl:w-2/5 overflow-visible">
        <div className="card-body overflow-visible">
          <h2 className="my-4 text-4xl font-bold card-title overflow-visible">
            Add new tag
          </h2>{" "}
          <form onSubmit={handleSubmit}>
            <div className="p-10 card bg-base-300 overflow-visible">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name of the tag"
                  className="input mb-8"
                  value={name}
                  onChange={(e) => {
                    setName(e.currentTarget.value);
                  }}
                />

                <button
                  disabled={isLoading}
                  type="submit"
                  className="btn btn-primary disabled"
                >
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
