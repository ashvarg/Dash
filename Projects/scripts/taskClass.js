"use strict";
export class task {
    constructor(name, type, storyPoints, tag, priority, assignee, description, status) {
        this._name = name;
        this._type = type;
        this._storyPoints = storyPoints;
        this._tag = tag;
        this._priority = priority;
        this._assignee = assignee;
        this._description = description;
        this._status = status;
    }
    get name() {
        return this._name;
    }
    get type() {
        return this._type;
    }
    get storyPoints() {
        return this._storyPoints;
    }
    get tag() {
        return this._tag;
    }
    get priority() {
        return this._priority;
    }
    get assignee() {
        return this._assignee;
    }
    get description() {
        return this._description;
    }
    get status() {
        return this._status;
    }
    set name(name)  {
        this._name = name;
    }
    set type(type)  {
        this._type = type;
    }
    set storyPoints(storyPoints)  {
        this._storyPoints = storyPoints;
    }
    set tag(tag)  {
        this._tag = tag;
    }
    set priority(priority)  {
        this._priority = priority;
    }
    set assignee(assignee)  {
        this._assignee = assignee;
    }
    set description(description)  {
        this._description = description;
    }
    set status(status)  {
        this._status = status;
    }
}
