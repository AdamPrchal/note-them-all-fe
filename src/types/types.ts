export type SelectFormat = {
  value: number;
  label: string;
};

export type Tag = {
  id: number;
  name: string;
};

export type NoteBody = {
  topic: string;
  content: string;
  tags: number[];
  links: number[];
};

export type TagBody = {
  name: string;
};

export type Note = {
  id: number;
  topic: string;
  content: string;
  tags: number[];
  links: number[];
};
