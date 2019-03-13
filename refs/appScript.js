//THIS IS THE GAS that powers the spreadsheet to make this application work. 
//Included here for reference, can not be executed from server.

var sheetURL = SpreadsheetApp.getActive().getUrl()
// get the spreadsheet object
var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
// set the first sheet as active
SpreadsheetApp.setActiveSheet(spreadsheet.getSheets()[0]);
// fetch this sheet
var sheet = spreadsheet.getActiveSheet();

// figure out what the last row is
var lastRow = sheet.getLastRow();

// Shared row range
var startRow = 2;
var rowRange = lastRow-startRow+1;


//global vars
var restaurant = sheet.getRange("I2").getValues()[0][0];
var customMsg = sheet.getRange("I3").getValues()[0][0];

var deadlineMinute = sheet.getRange("I5").getValues()[0][0];
var deadlineMinuteStandard = Math.round(deadlineMinute);

var deadlineHour = sheet.getRange("I4").getValues()[0][0];
var deadlineHourInt = Math.round(deadlineHour);

if (deadlineHour > 9) {
var deadlineHourMilitaryAdd = deadlineHour;
} else {
var deadlineHourMilitaryAdd = deadlineHour + 12;
}

var deadlineHourMiliary = Math.round(deadlineHourMilitaryAdd);



function lunchReminder() {
  var curHour = new Date().getHours();

  if (curHour > 17 || curHour < 9) {
    Logger.log("Outside work hours stopping");
    return
  }
  var menuReminderLink = sheet.getRange("I7").getValues()[0][0];
  var completedValues = sheet.getRange(startRow,3,rowRange,1).getValues();
  var slackNames = sheet.getRange(startRow,1,rowRange,1).getValues();
  // Loop over the completed rows
  for (var i = 0; i < completedValues.length; i++) {
    var completed = completedValues[i][0];
    if(completed == "") {
      var name = slackNames[i][0];
       
      //assemble urls
      //open im url
      var openChatURL = 'https://slack.com/api/im.open?token=xoxb-2173034834-568510280833-RhSjEUjRrlLiHyiUVrCWlxO2&user='+name+'&pretty=1'
      //send message url
      var reminderMessage = "You haven't completed your lunch order, don't miss out - view the menu using /hippomenu , order now using /hippoentree !  For more commands and help, type /hippohelp ." 
      var sendChatURL = 'https://slack.com/api/chat.postMessage?token=xoxb-2173034834-568510280833-RhSjEUjRrlLiHyiUVrCWlxO2&channel='+name+'&text='+reminderMessage+'&as_user=TheLunchHippo&pretty=1'

      
      UrlFetchApp.fetch(openChatURL);
      UrlFetchApp.fetch(sendChatURL);
      }
  }
};

function arrivalReminder() {
  var completedValues = sheet.getRange(startRow,3,rowRange,1).getValues();
  var slackNames = sheet.getRange(startRow,1,rowRange,1).getValues();
  
  for (var i = 0; i < completedValues.length; i++) {
    var completed = completedValues[i][0];

    if(completed != "notToday" || completed != "") {
      var name = slackNames[i][0];
       
      //assemble urls
      //open im url
      var openArrivalChatURL = 'https://slack.com/api/im.open?token=xoxb-2173034834-568510280833-RhSjEUjRrlLiHyiUVrCWlxO2&user='+name+'&pretty=1'
      //send message url
      var reminderArrivalMessage = "Hey!  Just a reminder you ordered a lunch yesterday--don't forget to pick it up at the bar and enjoy!" 
      var sendArrivalChatURL = 'https://slack.com/api/chat.postMessage?token=xoxb-2173034834-568510280833-RhSjEUjRrlLiHyiUVrCWlxO2&channel='+name+'&text='+reminderArrivalMessage+'&as_user=TheLunchHippo&pretty=1'

      UrlFetchApp.fetch(openArrivalChatURL);
      UrlFetchApp.fetch(sendArrivalChatURL);
      }
  }
}

function openLunch() {
  Logger.log(startRow)
  var rangeOne = sheet.getRange(startRow, 3, rowRange);
  var rangeTwo = sheet.getRange(startRow, 4, rowRange);
  var rangeThree = sheet.getRange(startRow, 5, rowRange);

  rangeOne.clear();
  rangeTwo.clear();
  rangeThree.clear();

  triggerSlackRequest("hippo", "<!channel>, Time to order Lunch!  Tomorrow we will be having "+ restaurant +". You can view the menu by typing /hippomenu. Please order by "+ deadlineHourInt +":"+ deadlineMinuteStandard +" today!  "+ customMsg +"  If you don't know how to place your order with me, the lunch hippo, just type */hippohelp* !");
  createTimeTriggers(2);
}

function closeLunch() {
  var triggers = ScriptApp.getProjectTriggers();

  triggerSlackRequest("hippo", "Lunch orders are now closed!  Tomorrow--WE FEAST!");

  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() == "lunchReminder") {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
}


function createTimeTriggers() {
  ScriptApp.newTrigger('lunchReminder')
    .timeBased()
    .everyHours(1)
    .create();
    
  var firstDate = new Date();
  var time = firstDate;
  time.setHours(deadlineHourMiliary);
  time.setMinutes(deadlineMinuteStandard);
  ScriptApp.newTrigger('closeLunch')
    .timeBased()
    .at(time)
    .create();
  
  var firstSecondDate = new Date();
  var secondDate = new Date();
  secondDate.setDate(firstSecondDate.getDate()+1);
  var secondTime = secondDate
  secondTime.setHours(12);
  secondTime.setMinutes(0);
  ScriptApp.newTrigger('arrivalReminder')
    .timeBased()
    .at(secondTime)
    .create();
}

function triggerSlackRequest(channel, msg) {
  var slackWebhook = "https://hooks.slack.com/services/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";
  var payload = { "channel": channel, "text": msg, "link_names": 1, "username": "The Lunch Hippo", "icon_emoji": ":hamburger:" };
  var options = { "method": "post", "contentType": "application/json", "muteHttpExceptions": true, "payload": JSON.stringify(payload) };

  Logger.log(UrlFetchApp.fetch(slackWebhook, options));
}
