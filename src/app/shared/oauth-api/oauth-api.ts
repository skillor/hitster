export abstract class OauthApi {
  abstract authUrl: string;
  abstract authScope: string;
  abstract authClientId: string;
  abstract authRedirectUri: string;
  abstract authName: string;

  setToken() {
    const urlParams = new URLSearchParams(decodeURIComponent(window.location.hash.substring(2)));
    const access_token = urlParams.get('access_token');
    const expires_in = urlParams.get('expires_in');
    if (access_token) {
      localStorage.setItem(`${this.authName}_token`, access_token);
      localStorage.setItem(`${this.authName}_token_expires`, String(Math.floor(Date.now() / 1000 + Number(expires_in))));
    }
  }

  authorize() {
    const params =  {
      response_type: 'token',
      client_id: this.authClientId,
      scope: this.authScope,
      redirect_uri: this.authRedirectUri,
    };

    const _authUrl = new URL(this.authUrl);

    _authUrl.search = new URLSearchParams(params).toString();
    window.location.href = _authUrl.toString();
  }
}
