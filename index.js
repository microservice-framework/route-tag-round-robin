'use strict'

const debug = {
  log: require('debug')('tag-round-robin:log'),
  debug: require('debug')('tag-round-robin:debug')
};

var latestProcessedRoute = false

module.exports = {
  name: 'round-robin',
  type: 'request',
  handler: function(taggedTargets, config, allTargets, targetRequest){
    debug.debug('processing round-robin %O', config)
    let voteSize = 1000
    if (config && config.voteSize) {
      voteSize = config.voteSize
    }
    for (let i in taggedTargets) {
      if(!latestProcessedRoute) {
        latestProcessedRoute = taggedTargets[i]
        taggedTargets[i].vote += voteSize
        return
      }
      if(latestProcessedRoute.endpointUrl == taggedTargets[i].endpointUrl) {
        if(i < taggedTargets.length - 1) {
          latestProcessedRoute = taggedTargets[i+1]
        } else {
          latestProcessedRoute = taggedTargets[0]
        }
        latestProcessedRoute.vote += voteSize
        debug.debug('Applied vote:%d (total: %d) to %O',voteSize, latestProcessedRoute.vote,
          latestProcessedRoute)
        
      }      
    }
  }
}
