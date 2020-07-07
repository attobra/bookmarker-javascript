//listen for form Submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);


//save bookmark
function saveBookmark(e){
  //get form values
  var  siteName = document.getElementById('siteName').value;
  var  siteUrl = document.getElementById('siteUrl').value;

if (!validateForm(siteName, siteUrl)){
  return false;
}

var bookmark = {
  name: siteName,
  url: siteUrl
}

/*
//local storage test. loca; storage only stores strings but we will parse the json
//into a string, then when we need it parse it back to json
localStorage.setItem('test', 'Hello World');
console.log(localStorage.getItem('test'));
localStorage.removeItem('test');
console.log(localStorage.getItem('test'));
*/

//test if bookmark is null
if(localStorage.getItem('bookmarks')=== null){
  //initializr array
  var bookmarks =[];
  bookmarks.push(bookmark);
  //set to local localStorage and turn the json to strings
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
} else {
  //fetch or get from localStorage and turn the string into json
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //add bookmark to array
  bookmarks.push(bookmark);
  //re-set it back to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

}

//clear myForm
document.getElementById('myForm').reset();

//re-fetch bookmarks
fetchBookmarks();


//prevent form from submitting
  e.preventDefault();
}


//Delete Bookmark
function deleteBookmark(url){
//get bookmarks from local storage
var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
//loop through bookmarks
for (var i=0; i<bookmarks.length; i++){
  if (bookmarks[i].url == url){
    //remove from array
    bookmarks.splice(i,1);
  }
}

//re-set it back to localStorage
localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

//re-fetch bookmarks
fetchBookmarks();

}

//Fetch bookmarks
function fetchBookmarks(){
  //fetch or get from localStorage and turn the string into json
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  //get put id
var bookmarksResults = document.getElementById('bookmarksResults');

//build output
bookmarksResults.innerHTML = '';
for (var i = 0; i <bookmarks.length; i++){
  var name = bookmarks[i].name;
  var url = bookmarks[i].url;

// to append all the bookmarks
  bookmarksResults.innerHTML += '<div class="card card-body bg-light">'+
                                '<h3>' + name +
                                '<a class= "btn btn-outline-secondary" target="_blank" href="'+url+'">Visit </a>' +
                                '<a onClick="deleteBookmark(\''+url+ '\')" class= "btn btn-danger" href="#">Delete </a>' +
                                '</h3' +
                                '</div>';

}

}

function validateForm(siteName, siteUrl){
  if (!siteName || !siteUrl){
    alert('Please fill in the form!');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!siteUrl.match(regex)){
      alert('Please use a valid URL');
      return false;
  }

  return true;
}
