

function onPerformanceMetricsLoad(){
    //load data from local storage

    loadlistOfTeamMembers();
    if (listOfTeamMembers == null){
        listOfTeamMembers = [];
        savelistOfTeamMembers()
    }

    loadMemberIndex();
    if (memberIndex == null){
        memberIndex = {index: 0}
        saveMemberIndex();
    }

    displayTeamMemberMetrics();

}

function displayTeamMemberMetrics() {
    //load teamMembers just in case
    loadlistOfTeamMembers();

    let startDate = document.getElementById("metricsStartDateDisplay").value;
    let endDate = document.getElementById("metricsEndDateDisplay").value;

    //if startDate and endDate are not null
    if (startDate != "" && endDate != ""){
        //check start date is not after end date
        if (startDate > endDate){
            alert("Start Date cannot be after End Date!");
            return
        }
    }

    let teamMemberTableRef = document.getElementById("teamMemberTable");

    let teamMemberTableOutput = `<tr>
                                <th>Name</th>
                                <th>Unique Days Worked</th>
                                <th>Total Hours</th>
                                <th>Average Daily Hours</th> 
                                
                            </tr>`;

    for (let i=0; i<listOfTeamMembers.length; i++){
        let teamMember = listOfTeamMembers[i].member;
        //get team Member Worklog
        let workLog = teamMember.workLog;
        //determine hours logged between dates
        let totalHoursLogged = 0;
        let uniqueDaysWorked = 0;
        let uniqueDaysWorkedArray = [];
        let aveargeDailyHours = 0;
        for (let j=0; j<workLog.length; j++) {
            let workLogItem = workLog[j];
            let workLogDate = workLogItem.date;
            let workLogHours = workLogItem.hours;
            //check if worklog date is between start and end date
            if (workLogDate >= startDate && workLogDate <= endDate) {
                totalHoursLogged += workLogHours;
                //determine number unique days worked
                if (uniqueDaysWorkedArray.includes(workLogDate) == false) {
                    uniqueDaysWorkedArray.push(workLogDate);
                    uniqueDaysWorked++;
                }
            }
        //calculate average daily hours
        aveargeDailyHours = totalHoursLogged / uniqueDaysWorked;
        //round to 2 decimal places
        aveargeDailyHours = aveargeDailyHours.toFixed(2);

        //if average daily hours is NaN, set to 0
        if (isNaN(aveargeDailyHours)){
            aveargeDailyHours = 0;
        }

        teamMemberTableOutput += `<tr>
                                <td>${teamMember.name}</td>   
                                <td>${uniqueDaysWorked}</td>    
                                <td>${totalHoursLogged}</td>
                                <td>${aveargeDailyHours}</td>

                            </tr>`;
    }

    teamMemberTableRef.innerHTML = teamMemberTableOutput;

}