function postSlack(text){
  const properties = PropertiesService.getScriptProperties();
  const token = properties.getProperty('SLACK_TOKEN');
  const channel = properties.getProperty('SLACK_CHANNEL');
  
  response = UrlFetchApp.fetch(
  'https://slack.com/api/chat.postMessage?'
  + 'token=' + token
  + '&channel=' + channel
  + '&text=' + encodeURIComponent(text)
  + '&icon_emoji=:book:');

  Logger.log(JSON.parse(response.getContentText())); 
}