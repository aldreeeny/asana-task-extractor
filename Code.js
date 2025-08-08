const getData = () => {
  let api = "workspaces/";
  let parameters = "YOUR_WORKSPACE_ID/projects";
  let projectsArr = fetchFromAsanaAPI(api, parameters).data;
  let tasksArr = [];

  api = "projects/";
  projectsArr.forEach(row => {
    Logger.log(row.gid+" - "+row.name);
    parameters = row.gid;
    let projectDetails = fetchFromAsanaAPI(api, parameters).data;
    let teamName = (projectDetails.team != null)? projectDetails.team.name: "";

    parameters = row.gid+"/tasks?opt_fields=assignee.name,due_on,completed,custom_fields&limit=100";
    let tasksData;
    do{
      tasksData = fetchFromAsanaAPI(api, parameters);
      Logger.log(tasksData.next_page);
      Logger.log(tasksData.data.length);
      let tasks = tasksData.data;
      let offsetToken = (tasksData.next_page != null)? tasksData.next_page.offset: "";
      tasks.forEach(row2 => {

        let siteArr = hasSite(row2.custom_fields);
        let assigneeName = (row2.assignee != null)? row2.assignee.name: "";
        let hold = [
          row2.gid+"",
          row2.name,
          row.name,
          assigneeName,
          row2.due_on,
          row2.completed,
          (siteArr.bool)? siteArr.value: "",
          teamName
        ];
        tasksArr.push(hold);
      });
      parameters = row.gid+"/tasks?opt_fields=assignee.name,due_on,completed,custom_fields&limit=5&offset="+offsetToken;
    }while(tasksData.next_page != null)
    
  });

  writeToSpreadsheet(tasksArr);
}
