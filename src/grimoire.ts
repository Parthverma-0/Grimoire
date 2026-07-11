#!/usr/bin/env node
import { read, write } from "./storage/storage.js";
import type { Project, Entry, Database } from "./types.js";

let entries = process.argv;
let extractedEntries = "";
let keyword: string | undefined = entries[2];
let keyword2: string | undefined = entries[3];
const logs: Database = read();
for (let i = 2; i < entries.length; i++) extractedEntries += entries[i] + " ";
const taskIdentifier = () => {
  if (keyword != undefined) {
    const command: Function | undefined = commands[keyword];
    if (command) command();
    else console.log("Kindly use correct command syntax");
  }
};
const newProject = () => {
  const date = new Date();
  const onlyDate: string = date.toISOString().split("T")[0]!;
  const log: Project = {
    id: Date.now(),
    name: entries[3],
    created: onlyDate,
    logs: [],
  };
  logs.projects.push(log);
  write(logs);
  console.log("Project Registered");
};
const projects = () => {
  let i = 1;
  for (const project of logs.projects) {
    console.log(`${i}. ${project.name}`);
    i++;
  }
};
const useProject = () => {
  if (!keyword2) {
    console.log("Kindly set active project before adding logs");
    return;
  }
  logs.activeProject = keyword2;
  write(logs);
  console.log(`Active project set to ${entries[3]}`);
};

const add = () => {
  if (!logs.activeProject) {
    console.log("Kindly set active project before adding logs");
    return;
  }
  const curr = logs.projects.find(
    (project) => project.name == logs.activeProject,
  );
  if(!curr){
    console.log("Active project no longer exists, try grimoire use <project> again")
    return;
  }
  const log: Entry = {
    id: Date.now(),
    entry: extractedEntries.substring(4),
    timeStamp: new Date(),
  };
  (curr.logs.push(log), write(logs));
  console.log("Entry Registered");
};
const searchP = () => {
  const curr = logs.projects.find((project) => project.name == entries[3]);
  if(!curr){
    console.log("type the correct project name")
    return;
  }
  for (const entry of curr.logs) {
    console.log(entry.entry);
  }
};
const today = () => {
  const today = new Date().toDateString();
  const projects = logs.projects;
  for (const project of projects) {
    const logsToday = project.logs.filter(
      (log) => new Date(log.timeStamp).toDateString() == today,
    );
    console.log(logsToday);
  }
};
const commands: { [key: string]: Function } = {
  add: add,
  today: today,
  logs: searchP,
  new: newProject,
  projects: projects,
  use: useProject,
};
if (keyword != undefined) {
  taskIdentifier();
}
