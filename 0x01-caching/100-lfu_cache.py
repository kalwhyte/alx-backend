#!/usr/bin/env python3
""" 3. LIFO Caching
"""


BaseCaching = __import__('base_caching').BaseCaching


class LFUCache(BaseCaching):
    """ LFUCache defines:
      - caching system inherit from BaseCaching
    """

    def __init__(self):
        """ Initiliaze
        """
        super().__init__()
        self.queue = []
        self.count = {}

    def put(self, key, item):
        """ Add an item in the cache
        """
        if key and item:
            if key in self.cache_data:
                self.queue.remove(key)
            elif len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                discard = self.queue.pop(0)
                del self.cache_data[discard]
                print("DISCARD: {}".format(discard))
            self.queue.append(key)
            self.cache_data[key] = item
            self.count[key] = 0

    def get(self, key):
        """ Get an item by key
        """
        if key and key in self.cache_data:
            self.count[key] += 1
            self.queue.remove(key)
            self.queue.append(key)
            return self.cache_data[key]
        return None
