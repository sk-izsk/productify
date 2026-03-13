class AuthStore {
  private static token: string | null = null
  private static isSignedIn: boolean = false

  static setAuth(token: string | null, signedIn: boolean) {
    this.token = token
    this.isSignedIn = signedIn
  }

  static getToken(): string | null {
    return this.isSignedIn ? this.token : null
  }

  static isAuthenticated(): boolean {
    return this.isSignedIn && !!this.token
  }
}

export default AuthStore
