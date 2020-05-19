export default () => ({
  Auth: {
    identityPoolId: process.env.REACT_APP_AWS_COGNITO_IDENTITYPOLLID,
    region: process.env.REACT_APP_AWS_COGNITO_REGION,
    userPoolId: process.env.REACT_APP_AWS_USER_POLLID,
    userPoolWebClientId: process.env.REACT_APP_AWS_USER_POLL_WEB_CLIENTID,
    authenticationFlowType: process.env.REACT_APP_AWS_AUTHENTICATION_FLOW_TYPE
  }
});