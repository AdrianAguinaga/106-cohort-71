function saveTask() {
  console.log("Saving task...");

  // 1. Get values from the DOM
  const title    = $("#txtTitle").val();
  const desc     = $("#txtDescription").val();
  const color    = $("#selColor").val();
  const date     = $("#selDate").val();
  const status   = $("#selStatus").val();
  const budget   = $("#numBudget").val();

  // 2. Create an Object using our Class (Model)
  const taskToSave = new Task(title, desc, color, date, status, budget);
  
  // 3. Log it to verify
  console.log(taskToSave);
  
  // 4. (Coming up next) Display it on screen
  displayTask(taskToSave);
}

function displayTask(task){
  // Create the HTML syntax using values from the task object
  // Note the style="border-color:${task.color}" -> Dynamic Styling!
  let syntax = `
    <div class="task" style="border-color:${task.color}">
      <div class="info">
        <h4>${task.title}</h4>
        <p>${task.desc}</p>
      </div>
      <label class="status">${task.status}</label>
      <div class="date-budget">
        <label>Due: ${task.date}</label>
        <label>Budget: $${task.budget}</label>
      </div>
    </div>`;
    
  // Inject the new HTML into the DOM Tree
  $(".list").append(syntax);
}
const API = "https://106api-b0bnggbsgnezbzcz.westus3-01.azurewebsites.net/api/tasks";

function loadTasks(){
    $.ajax({
        type: "GET",      // HTTP Verb: READ
        url: API,         // Destination
        dataType: "json", // Expected format
        success: function(data) {
            console.log("Server responded with:", data);
            
            // Clear the list to avoid duplicates
            $(".list").empty();
            
            // Loop through the array of tasks
            for(let i=0; i < data.length; i++) {
                displayTask(data[i]); // Reuse our display function!
            }
        },
        error: function(err) {
            console.error("Error fetching data", err);
        }
    });
}

function init(){
  console.log("App initialized");
  
  // Hook up the Save Button
  $("#btnSave").click(saveTask);
  
  // Load data from server immediately
  loadTasks();
}

window.onload = init;


