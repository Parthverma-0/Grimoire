#!/usr/bin/env node
import { read, write } from "./storage/storage.js"

let entries = process.argv
let extractedEntries = ""
let keyword = entries[2];
const logs = read()
for (let i = 2; i < entries.length; i++) extractedEntries += entries[i] + " ";

const taskIdentifier = () => {
    const command = commands[entries[2]];
    if (command) command();
    else console.log("Kindly use correct command syntax");
};
const newProject = () => {
    const date = new Date();
    const onlyDate = date.toISOString().split("T")[0];
    const log = new Object()
    log.id = Date.now()
    log.name = entries[3]
    log.created = onlyDate
    log.logs = []
    logs.projects.push(log)
    write(logs)
    console.log("Project Registered")
}
const projects = () => {
    let i = 1;
    for (const project of logs.projects) {
        console.log(`${i}. ${project.name}`);
        i++;
    }
}
const useProject = () => {
    logs.activeProject = entries[3]
    write(logs)
    console.log(`Active project set to ${entries[3]}`)
}

const add = () => {
    if (!logs.activeProject) {
        console.log("Kindly set active project before adding logs")
        return
    }
    const curr = logs.projects.find(project => project.name == logs.activeProject)
    const log = new Object()
    log.id = Date.now()
    log.entry = extractedEntries.substring(4)
    log.timeStamp = new Date()
    curr.logs.push(log);
    write(logs)
    console.log("Entry Registered")
}
const searchP = () => {
    const curr = logs.projects.find(project => project.name == entries[3])
    for (const entry of curr.logs) {
        console.log(entry.entry)
    }
}
const today = () => {
    const today = new Date().toDateString();
    const projects = logs.projects;
    for(const project of projects){
        const logsToday = project.logs.filter(log => (new Date(log.timeStamp).toDateString() == today))
        console.log(logsToday)
    }
}
const commands = {
    add: add,
    today: today,
    logs: searchP,
    new: newProject,
    projects: projects,
    use: useProject,
};
taskIdentifier()