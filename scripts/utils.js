'use strict';


const DEFAULT_COLOR = '#66cc66'; // default proxy color

// patterns | proxy
// the local-internal blacklist, always used as a set

// ----------------- Utils ---------------------------------
class Utils {

  static getUniqueId() {
    // We don't need cryptographically secure UUIDs, just something unique
    return Math.random().toString(36).substring(7) + new Date().getTime();
  }

  static stripBadChars(str) {
    return str ? str.replace(/[&<>"']+/g, '') : null;
  }

}
