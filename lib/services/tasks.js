'use strict';

const schemas = require('./schemas/tasks');

class TasksClient {

  constructor(docker) {
    this.docker = docker;
  }

  list(options = {}) {
    const self = this;

    return self.docker._validate(options, schemas.listOptions).then((params) => {
      return self.docker.modem.get({
        url: '/tasks',
        qs: params,
        successCodes: {
          200: 'no error'
        },
        errorCodes: {
          500: 'server error'
        }
      });
    });
  }

  inspect(id, options = {}) {
    const self = this;

    return self.docker._validate(options, schemas.inspectOptions).then((params) => {
      return self.docker.modem.get({
        url: `/tasks/${id}`,
        qs: params,
        successCodes: {
          200: 'no error'
        },
        errorCodes: {
          404: 'unknown task',
          500: 'server error'
        }
      });
    });
  }

}

module.exports.Client = function(docker) {
  return new TasksClient(docker);
};