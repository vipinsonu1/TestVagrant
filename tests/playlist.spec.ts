class RecentlyPlayedStore {
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
  
    public getRecentlyPlayed(user: string): string[] {
      return this.store[user] || [];
    }
  }
  
  const store = new RecentlyPlayedStore(3);
  
  store.playSong("user1", "S1");
  store.playSong("user1", "S2");
  store.playSong("user1", "S3");
  console.log(store.getRecentlyPlayed("user1")); // Output: ["S1", "S2", "S3"]
  
  store.playSong("user1", "S4");
  console.log(store.getRecentlyPlayed("user1")); // Output: ["S2", "S3", "S4"]
  
  store.playSong("user1", "S2");
  console.log(store.getRecentlyPlayed("user1")); // Output: ["S3", "S4", "S2"]
  
  store.playSong("user1", "S1");
  console.log(store.getRecentlyPlayed("user1")); // Output: ["S4", "S2", "S1"]