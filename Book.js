var sheet = SpreadsheetApp.getActiveSheet();

function addBook(isbn, insertRow){
  const response = UrlFetchApp.fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn + '&country=JP');
  const data = JSON.parse(response.getContentText());
  Logger.log(data);
  
  if(!data.items) return false;
  const bookInfo = data.items[0].volumeInfo;
  if(isbn) sheet.getRange(insertRow,1).setValue(isbn);
  if(bookInfo.imageLinks && bookInfo.imageLinks.thumbnail) sheet.getRange(insertRow,2).setValue(bookInfo.imageLinks.thumbnail);
  if(bookInfo.title) sheet.getRange(insertRow,3).setValue(bookInfo.title);
  if(bookInfo.canonicalVolumeLink) sheet.getRange(insertRow,4).setValue(bookInfo.canonicalVolumeLink);
  if(bookInfo.authors) sheet.getRange(insertRow,5).setValue(bookInfo.authors.join());
  if(bookInfo.publishedDate) sheet.getRange(insertRow,6).setValue(bookInfo.publishedDate);
  
  postSlack(':tada:「' + bookInfo.title+ '」が追加されました！');
  return true;
}

function removeBook(){
  var insertRow = sheet.getActiveCell().getRow();
  sheet.getRange(insertRow, 2, 1, 8).setValue('');
  //postSlack(':wave:削除されました。');
}

function lendBook(){
  var insertRow = sheet.getActiveCell().getRow();
  const booktitle = sheet.getRange(insertRow,3).getValue();
  const user = sheet.getRange(insertRow,9).getValue();
  postSlack(':handshake:' + user + 'は「' + booktitle + '」を借りました！');
}

function returnBook(){
  var insertRow = sheet.getActiveCell().getRow();
  const booktitle = sheet.getRange(insertRow,3).getValue();
  postSlack(':book:「' + booktitle + '」は返却されました！');
}