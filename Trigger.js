var sheet = SpreadsheetApp.getActiveSheet();

function onChange(e){
  Logger.log(JSON.stringify(e));
  var activeRow = sheet.getActiveCell().getRow();
  var activeColumn = sheet.getActiveCell().getColumn();
  
  switch(activeColumn){
    case 1:
      const isbn = sheet.getRange(activeRow, 1).getValue();
      if(!isbn) removeBook();
      else addBook(isbn, activeRow);
      break;
    case 9:
      const lendUser = sheet.getRange(activeRow, 9).getValue();
      if (!lendUser) returnBook();
      else lendBook();
      break;
  }
}

function doGet(e){ //パラメータ送信時
  const isbn = e.parameter.isbn;
  var insertRow = sheet.getLastRow()+1;
  const result = addBook(isbn, insertRow);
  var text;

  if(result){
    text = '登録完了'
  }else{
    text = '書籍情報が見つかりません'
  }
  
  var htmlTemplate = HtmlService.createTemplateFromFile("index");
  htmlTemplate.isbn = isbn;
  htmlTemplate.text = text;
  
  var html = htmlTemplate.evaluate()
  html
  .setTitle('Book List')
  .addMetaTag('viewport', 'width=device-width, initial-scale=1');
  return html;
}