/* 
    Purpose: Task class structure used for task creation.
    Date Modified: 17/10/2022
    Contributors: Jamie Harrison, Dylan Redman
    Reviewer: Arosh Heenkenda
*/

"use strict";

class task {

    /**
     * Task class constructor
     * 
     * @param {*} name - task name
     * @param {*} type - task type
     * @param {*} storyPoints - task story points
     * @param {*} tag - task tag
     * @param {*} priority - task priority
     * @param {*} assignee - task assignee
     * @param {*} description - task description
     * @param {*} status - task status
     */
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

    /**
     * Getter for task name
     */
    get name() {

        return this._name;
    }

    /**
     * Getter for task type
     */
    get type() {

        return this._type;
    }

    /**
     * Getter for task story points
     */
    get storyPoints() {

        return this._storyPoints;
    }

    /**
     * Getter for task tag
     */
    get tag() {

        return this._tag;
    }

    /**
     * Getter for task priority
     */
    get priority() {

        return this._priority;
    }

    /**
     * Getter for task assignee
     */
    get assignee() {

        return this._assignee;
    }

    /**
     * Getter for task description
     */
    get description() {

        return this._description;
    }

    /**
     * Getter for task status
     */
    get status() {

        return this._status;
    }

    /**
     * Setter for task name
     */
    set name(name)  {

        this._name = name;
    }

    /**
     * Setter for task type
     */
    set type(type)  {

        this._type = type;
    }

    /**
     * Setter for story points
     */
    set storyPoints(storyPoints)  {

        this._storyPoints = storyPoints;
    }

    /**
     * Setter for task tag
     */
    set tag(tag)  {

        this._tag = tag;
    }

    /**
     * Setter for task priority
     */
    set priority(priority)  {

        this._priority = priority;
    }

    /**
     * Setter for task assignee
     */
    set assignee(assignee)  {

        this._assignee = assignee;
    }

    /**
     * Setter for task description
     */
    set description(description)  {

        this._description = description;
    }

    /**
     * Setter for task status
     */
    set status(status)  {

        this._status = status;
    }
}
