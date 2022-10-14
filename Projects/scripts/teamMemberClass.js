class teamMember{
    constructor(name, email, mobile){
        this.name = name;
        this.email = email;
        this.mobile = mobile;
        this.workLog = [];
        this.totalHoursLogged = 0;
    }
    //getters and setters
    get Name(){
        return this.name;
    }
    set Name(name){
        this.name = name;
    }
    get Email(){
        return this.email;
    }
    set Email(email){
        this.email = email;
    }
    get Mobile(){
        return this.mobile;
    }
    set Mobile(mobile){
        this.mobile = mobile;
    }
    get TotalHoursLogged(){
        return this.totalHoursLogged;
    }
    set TotalHoursLogged(hours){
        this.totalHoursLogged = hours;
    }
    
    // static logHours = function(hours){
    //     this.totalHoursLogged += hours;
    //     //get date
    //     let date = new Date();
    //     let day = date.getDate();
    //     let month = date.getMonth() + 1;
    //     let year = date.getFullYear();
    //     let dateString = day + "/" + month + "/" + year;
    //     //add to work log
    //     this.workLog.push({date: dateString, hours: hours});
    //     return;
    // }


    // logHours(hours){
    //     this.totalHoursLogged += hours;
    //     //get date
    //     let date = new Date();
    //     let day = date.getDate();
    //     let month = date.getMonth() + 1;
    //     let year = date.getFullYear();
    //     let dateString = day + "/" + month + "/" + year;
    //     //add to work log
    //     this.workLog.push({date: dateString, hours: hours});
    //     return;
    // }
}
