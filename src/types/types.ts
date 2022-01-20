export type TagSelectFormat = {
  value: string;
  label: string;
};

export type Tag = {
  id: string;
  name: string;
};


export type NoteBody = {
  topic: string;
  content: string;
  tags: string[];
};

export type Note = {
  id: number;
  topic: string;
  content: string;
  tags: number[];
  links: number[];
};
