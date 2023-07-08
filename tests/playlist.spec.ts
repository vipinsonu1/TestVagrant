import { expect, Locator } from "@playwright/test";
class JustnowPlayedStore {
  private capacity: number;
  private store: Record<string, string[]>;

  constructor(initialCapacity: number) {
    this.capacity = initialCapacity;
    this.store = {};
  }

  public playSong(user: string, song: string): void {
    if (!this.store[user]) {
      this.store[user] = [];
    }

    const userSongs = this.store[user];

    const songIndex = userSongs.indexOf(song);
    if (songIndex !== -1) {
      userSongs.splice(songIndex, 1);
    }

    userSongs.push(song);

    if (userSongs.length > this.capacity) {
      userSongs.shift();
    }
  }

  public getJustNowPlayed(user: string): string[] {
    return this.store[user] || [];
  }
}

const store = new JustnowPlayedStore(3);

store.playSong("user1", "S1");
store.playSong("user1", "S2");
store.playSong("user1", "S3");
console.log(store.getJustNowPlayed("user1")); 
// Here I assserted played songs S1, S2, S3.
expect(store.getJustNowPlayed("user1")).toEqual([ 'S1', 'S2', 'S3' ]);
store.playSong("user1", "S4");
// here I assert new played songs.
 expect(store.getJustNowPlayed("user1")).toContain('S4');
console.log(store.getJustNowPlayed("user1")); 
store.playSong("user1", "S2");
console.log(store.getJustNowPlayed("user1")); 

store.playSong("user1", "S1");
console.log(store.getJustNowPlayed("user1")); 