import { defineStore } from 'pinia'
// constants
const BucketSize = 3

export const useRateLimitStore = defineStore('rateLimitStore', {
  state: () => ({
    inBucket: 0 as number
  }),
  actions: {
    addToBucket() {
      this.inBucket++
    },
    checklimit() {
      if (this.inBucket >= BucketSize) {
        return false
      } else {
        return true
      }
    }
  }
})
