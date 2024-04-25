export interface IFacebookClient {
  /**
   * Given a user id, return their list of friends.
   *
   * @param userId the id of the user
   * @return a list of ids of the user's friends
   */
  getFriends: (userId: number) => number[];
}

export class FacebookClient implements IFacebookClient {
  constructor() {}

  getFriends(userId: number): number[] {
    if (userId === 1) return [2, 4, 6];
    if (userId === 2) return [1, 3, 6];
    if (userId === 3) return [2, 4];
    if (userId === 4) return [1, 3, 5];
    if (userId === 5) return [4];
    if (userId === 6) return [1, 2];
    return [];
  }
}

/*
 * @param userId the id of the user
 * @param k the number suggestions to return
 * @return a list of potential friend suggestions
 */
export class FriendSuggester {
  constructor(private readonly facebookClient: IFacebookClient) {
    this.facebookClient = facebookClient;
  }

  getFriendsSuggestions(userId: number, k: number): number[] {
    return [];
  }
}
