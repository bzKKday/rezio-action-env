const core = require('@actions/core');
const github = require('@actions/github');
const context = github.context;


// most @actions toolkit packages have async methods
async function run() {
  try {
    let env
    if (context.eventName === 'push') {
      env = context.ref.endsWith('master') ? 'sta' : context.ref.includes('stable/') ? 'uat' : context.ref.includes('feature/') ? 'sit' : null
    } else if (context.eventName === 'release') {
      env = 'prod'
    }
    if (env) {
      core.info('environment is ' + env)
    } else {
      core.info('unknown environment!')
    }
    
    core.info((new Date()).toTimeString());
    core.exportVariable('REZIO_ENV', env)
    core.setOutput('rezio-env', env);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
