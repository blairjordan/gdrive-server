var express = require('express');
var router = express.Router();
var fs = require('fs');

const videos = JSON.parse(fs.readFileSync('videos.json', 'utf8'));

videos.map(v => {
  if (!v.hasOwnProperty("images"))
    v.images = [];

  v.images = v.images.map(i => i.name);
  return v;
});

/* 
  example:
   /api/videos?page=1&pageSize=10&qry=myvid
*/
router.get('/', function(req, res, next) {

  let { page = 1, pageSize = 16, qry = "" } = req.query;
  [ page, pageSize ] = [ parseInt(page), parseInt(pageSize) ]; 
  if (videos.length === 0) {
    res.json({ msg: "Query returned no results."})
  }

  const filtered = videos.filter(v => v.name.toLowerCase().includes(qry.toLowerCase()));
  const totalPages = Math.ceil(filtered.length / pageSize);
  const resultCount = filtered.length;
  const startIdx = ( page - 1 ) * ( pageSize );
  
  if (filtered.length < startIdx) {
    res.json({ msg: "Invalid range specified."});
    return;
  }

  const endidx = (((startIdx + pageSize) > resultCount) ? resultCount : startIdx + pageSize);
  const sliced = filtered.slice(startIdx, endidx);

  res.json({page, pageSize, totalPages, resultCount, videos: sliced});

});

module.exports = router;
