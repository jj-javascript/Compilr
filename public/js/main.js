var favorite = document.querySelectorAll('.fa-star');
var feedOption = document.getElementById('feedSelect');
var feedName = document.getElementById('feedName')
var feedSubmitButton = document.getElementById('submitNewFeed')
var createFeedButton = document.getElementById('createNewFeed')

feedOption.addEventListener('change', changeFeed)
createFeedButton.addEventListener('click', getFeedOptions)
feedName.addEventListener('input', showSubmit)

function getFeedOptions(){
  feedName.style.display = 'unset'
}

function showSubmit() {
  feedSubmitButton.style.display = 'unset'
}

let feedAssign = document.querySelectorAll('#entryFeedSelect')

Array.from(feedAssign).forEach(function(element) {
  element.addEventListener('change', assignFeed)
});

function assignFeed() {
  const feedID = this.closest('li').querySelector('#entryFeedSelect').value
  const entryID = this.closest('li').querySelector('#entryID').innerText.trim()
  fetch('/feed/assignFeedEntries/', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'feedID': feedID,
      'entryID': entryID,
      'field3': 'field3',
    })
  }) 
}

function changeFeed(){
  if (feedOption.value === 'favorites') {
    console.log('Loading favorites…');
    window.location.href = '/entry/getFavorites';
  } else if (feedOption.value === 'main'){
    window.location.href = '/profile';
  } else {
    window.location.href = '/feed/getFeedEntries?feedID='+ feedOption.value
  }
}

Array.from(favorite).forEach(function(element) {
  element.addEventListener('click', function(){
    const favorite = this.dataset.favorited
    const id = this.dataset.id
    fetch('/entry/favoriteEntry/' + id, {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'favorited': favorite,
      })
    })
    .then(data => {
      console.log(data)
      this.dataset.favorited = String(this.dataset.favorited === 'false')
      if (favorite === 'true') {
        this.classList.remove('fa-solid')
        this.classList.add('fa-regular')
      } else {
        this.classList.add('fa-solid')
        this.classList.remove('fa-regular')
      }
    })
  });
});

function getYouTubeVideoId(url) {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : null;
}

function isYouTubeUrl(url) {
  return url.includes('youtube.com') || url.includes('youtu.be');
}

var articleButton = document.querySelectorAll('#articleButton')

Array.from(articleButton).forEach(function(element){
  let clickCount = 0; 
  
  element.addEventListener('click', function() {
    clickCount++;
    const entryURL = this.closest('li').querySelector('a').href;
    const iframe = this.closest('li').querySelector('iframe');
    
    if(clickCount === 1) {
      // Switch case for YouTube vs regular content
      switch(true) {
        case isYouTubeUrl(entryURL):
          // YouTube video handling
          const videoId = getYouTubeVideoId(entryURL);
          if (videoId) {
            iframe.src = `https://www.youtube.com/embed/${videoId}`;
            iframe.style.display = 'unset';
            iframe.style.height = '450px'; // Better height for YouTube
            this.innerText = "Close";
          } else {
            console.error('Could not extract YouTube video ID');
            clickCount = 0;
          }
          break;
          
        default:
          // Regular webpage handling
          iframe.src = entryURL;
          iframe.style.display = 'unset';
          iframe.style.height = '800px'; // Original height for webpages
          this.innerText = "Close";
          break;
      }
    } else if(clickCount === 2) {
      // Close iframe and reset button text based on content type
      iframe.src = '';
      iframe.style.display = 'none';
      
      // Check if it's YouTube and set appropriate text
      if (isYouTubeUrl(entryURL)) {
        this.innerText = "Watch";
      } else {
        this.innerText = "Read";
      }
      
      clickCount = 0;
    }
  });
});

// Initialize button text on page load
Array.from(articleButton).forEach(function(element){
  const entryURL = element.closest('li').querySelector('a').href;
  
  if (isYouTubeUrl(entryURL)) {
    element.innerText = "Watch";
  } else {
    element.innerText = "Read";
  }
});




// var favorite = document.querySelectorAll('.fa-star');
// var feedOption = document.getElementById('feedSelect');
// var feedName = document.getElementById('feedName')
// var feedSubmitButton = document.getElementById('submitNewFeed')
// var createFeedButton = document.getElementById('createNewFeed')

// feedOption.addEventListener('change', changeFeed)


// createFeedButton.addEventListener ('click', getFeedOptions)

// feedName.addEventListener('input', showSubmit)

// // feedSubmitButton.addEventListener('click', createNewFeed )

// function getFeedOptions(){
// feedName.style.display = 'unset'
// }

// function showSubmit () {
//   feedSubmitButton.style.display = 'unset'
// }


// let feedAssign = document.querySelectorAll('#entryFeedSelect')

// Array.from(feedAssign).forEach(function(element) {
//   element.addEventListener('change', assignFeed)
// });


// function assignFeed () {
//   const feedID = this.closest('li').querySelector('#entryFeedSelect').value
//   const entryID = this.closest('li').querySelector('#entryID').innerText.trim()
//   fetch('/feed/assignFeedEntries/', {
//   method: 'put',
//   headers: {'Content-Type': 'application/json'},
//   body: JSON.stringify({
//     'feedID': feedID,
//     'entryID': entryID,
//     'field3': 'field3',
//   })
// }) 
// }




// function changeFeed(){
//   if (feedOption.value === 'favorites') {
//     console.log('Loading favorites…');
//     window.location.href = '/entry/getFavorites';
//   } else if (feedOption.value === 'main'){
//     window.location.href = '/profile';
//   }
//   else {
//   window.location.href = '/feed/getFeedEntries?feedID='+ feedOption.value
//   }
// }

// Array.from(favorite).forEach(function(element) {
//     element.addEventListener('click', function(){
//       const favorite = this.dataset.favorited
//       const id = this.dataset.id
//       fetch('/entry/favoriteEntry/' + id, {
//         method: 'put',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//           'favorited':favorite,
//         })
//       })
//       .then(data => {
//         console.log(data)
//         this.dataset.favorited = String(this.dataset.favorited === 'false')
//        if (favorite === 'true') {
//         this.classList.remove('fa-solid')
//         this.classList.add('fa-regular')
//        } else {
//         this.classList.add('fa-solid')
//         this.classList.remove('fa-regular')
//        }
//       })
//     });
// });


// var articleButton = document.querySelectorAll('#articleButton')

// Array.from(articleButton).forEach(function(element){
//   let clickCount = 0; 
  
//   element.addEventListener('click', function() {
//     clickCount++;
    
//     if(clickCount === 1) {
//       const entryURL = this.closest('li').querySelector('a').href;
//       this.closest('li').querySelector('iframe').src = entryURL;
//       this.closest('li').querySelector('iframe').style.display = 'unset';
//       this.innerText = "Close";
//     } else if(clickCount === 2) {
//       this.closest('li').querySelector('iframe').src = '';
//       this.closest('li').querySelector('iframe').style.display = 'none';
//       this.innerText = "Read";
//       clickCount = 0;
//     }
//   });
// });

// // var clickCount = 0
// // var articleButton= document.querySelectorAll('#articleButton')


// // Array.from(articleButton).forEach(function(element){
// //   element.addEventListener ('click', populateFrame)
// //   clickCount++;

// //   if(clickCount === 2) {
// // this.closest('li').querySelector('iframe').src = ''
// // this.closest('li').querySelector('iframe').style.display = 'none'
// // this.closest('li').querySelector('#articleButton').innerText = "Read Article"
// // clickCount = 0;
// //   }
// // });

// // function populateFrame () {
// // const entryURL = this.closest('li').querySelector('a').href
// // this.closest('li').querySelector('iframe').src = entryURL
// // this.closest('li').querySelector('iframe').style.display = 'unset'
// // this.closest('li').querySelector('#articleButton').innerText = "Close Article"
// // this.closest('li').querySelector('#articleButton').data = "closeNow"
// // }