const Service = require('@mesg/service')

const mesg = new Service()

mesg
  .listenTask({
    deploy: require('./tasks/deploy'),
    delete: require('./tasks/delete')
  })
  .on('error', error => console.error(error))
