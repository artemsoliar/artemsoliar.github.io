   ajax = (function() {
     let pages = [];

     function ajax(per_page, callback, prevPage) {
       let page = Math.floor(Math.random() * (100 - 1 + 1) + 1);

       if (prevPage && pages.length < 2) {
         return false
       }
       if (prevPage) {
         page = [...pages].pop();
         pages.splice(-1, 1);
       } else {
         pages.push(page);
       }

       let link = `https://api.flickr.com/services/rest?sort=relevance&parse_tags=1&content_type=7&extras=%2Curl_s%2Cis_marketplace_licensable&per_page=${per_page}&page=${page}&lang=en-US&text=dog&viewerNSID=&method=flickr.photos.search&csrf=&api_key=60eb316a724bbef37d90ea141643a94f&format=json&hermes=1&hermesClient=1&reqId=f866abd5&nojsoncallback=1`;
       let xhr = new XMLHttpRequest();

       xhr.open("GET", link, true);

       xhr.onreadystatechange = function() {
         if (xhr.readyState == 4) {
           if (xhr.status == 200) {
             callback(JSON.parse(xhr.responseText));
           }
         }
       }
       xhr.send();
     }
     return ajax
   })();