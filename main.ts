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
    const friends = this.facebookClient.getFriends(userId);
    const friendsOfFriends = new Map<number, number[]>();

    for (const friend of friends) {
      const fof = this.facebookClient.getFriends(friend);
      friendsOfFriends.set(friend, fof);
    }

    // console.log({ friendsOfFriends });
    const count = new Map<number, number>();
    for (const [k, v] of Array.from(friendsOfFriends.entries())) {
      for (const m of v) {
        if (!friends.includes(m) && m !== userId) {
          const current = count.get(m) || 0;
          count.set(m, current + 1);
        }
      }
    }

    // console.log({ count });
    const ordered = Array.from(count.entries()).sort((a, b) => b[1] - a[1]);

    return ordered.map((o) => o[0]).slice(0, k);
  }
}
