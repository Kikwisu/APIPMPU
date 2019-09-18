let express = require('express');
let router = express.Router();



const mongoose = require('mongoose')
mongoose.Promise = global.Promise

mongoose.connect("mongodb://localhost:27017/contentDB",  { useNewUrlParser: true, useUnifiedTopology: true })

let Content = require('./content')

/* GET home page. */
router.get('/:category', function(req, res, next) {
  let category = req.params.category
  
  Content.findOne({category}).then((doc) => {
    let Titles = []
    
    if(doc)
      for(let community of doc.communities)
        Titles.push(community.title)
      
    res.send(Titles)
  })
});


router.get('/:category/:community', function(req, res, next) {
  let category = req.params.category
      , communityName = req.params.community
  
  Content.findOne({category}).then((doc) => {
    
    let ResultCommunity = {}
    
    if(doc)
      for(let Community of doc.communities)
        if(Community.profession === communityName){
          ResultCommunity = Community
          break
        }
    
    res.send(ResultCommunity)
  })
});

router.get('/:category/:community/:project', function(req, res, next) {
  let category = req.params.category
      , communityName = req.params.community
      , projectName = req.params.project
  
  Content.findOne({category}).then((doc) => {
    
    let ResultProject= {}
    
    if(doc)
      for(let Community of doc.communities)
        if(Community.profession === communityName){
          for(let Project of Community.projects)
            if(Project.name === projectName){
              ResultProject = Project
              break
            }
        }
    
    res.send(ResultProject)
  })
});

module.exports = router;
