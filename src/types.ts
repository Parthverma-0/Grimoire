type Project = {
  id: number;
  name: string | undefined;
  created: string;
  logs: Entry[];
};
type Entry = {
  id: number;
  entry: string;
  timeStamp: Date;
};
type Database = {
    activeProject:string,
    projects:Project[]
}

export type { Project, Entry,Database};