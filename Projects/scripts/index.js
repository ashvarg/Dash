class task {
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
}