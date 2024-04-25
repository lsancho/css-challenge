import { beforeEach, describe, expect, it } from "vitest";
import { FacebookClient, FriendSuggester, IFacebookClient } from "./main";

describe("FriendSuggester", () => {
  let facebookClient: IFacebookClient;
  let friendSuggester: FriendSuggester;

  beforeEach(() => {
    facebookClient = new FacebookClient();
    friendSuggester = new FriendSuggester(facebookClient);
  });

  it.each([[1, 2, [3, 5]]])(
    "should return the correct suggestions for user %s",
    (userId, k, expectedSuggestions) => {
      const result = friendSuggester.getFriendsSuggestions(userId, k);
      expect(expectedSuggestions).toEqual(result);
    }
  );
});
