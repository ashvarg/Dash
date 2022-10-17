/* 
    Purpose: Team Member class structure used for team member creation.
    Date Modified: 17/10/2022
    Contributors: Jamie Harrison
    Reviewer: Arosh Heenkenda
*/

class teamMember{

    /**
     * Constructor method for the teamMembber class
     * @param {string} name - team member name
     * @param {string} email - team member email
     * @param {string} mobile - team member mobile number 
     */
    constructor(name, email, mobile){

        this.name = name;
        this.email = email;
        this.mobile = mobile;
        this.workLog = [];
        this.totalHoursLogged = 0;
    }

    /**
     * Get the name of the particular team member
     */
    get Name(){

        return this.name;
    }

    /**
     * Setter for the team member name
     * @param {string} name - team member name
     */
    set Name(name){

        this.name = name;
    }

    /**
     * Get the email of the particular team member
     */
    get Email(){

        return this.email;
    }

    /**
     * Setter for the team member email
     * @param {string} email - team member email
     */
    set Email(email){

        this.email = email;
    }

    /**
     * Get the mobile number of the particular team member
     */
    get Mobile(){

        return this.mobile;
    }

    /**
     * Setter for the team member mobile number
     * @param {string} mobile - team member mobile number
     */
    set Mobile(mobile){

        this.mobile = mobile;
    }

    /**
     * Get the total hours logged by an individual.
     */
    get TotalHoursLogged(){

        return this.totalHoursLogged;
    }

    /**
     * Setter for the total hours logged by a team member.
     * @param {number} hours - total hours logged by a team member
     */
    set TotalHoursLogged(hours){

        this.totalHoursLogged = hours;
    }
}
