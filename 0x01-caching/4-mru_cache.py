#!/usr/bin/env python3
""" 4. MRU Caching
"""


BaseCaching = __import__('base_caching').BaseCaching


class MRUCache(BaseCaching):
    """ MRUCache defines:
      - caching system inherit from BaseCaching
    """

    def __init__(self):
        """ Initiliaze
        """
        super().__init__()
        self.queue = []

    def put(self, key, item):
        """ Add an item in the cache
        """
        if key and item:
            if key in self.cache_data:
                self.queue.remove(key)
            elif len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                discard = self.queue.pop()
                del self.cache_data[discard]
                print("DISCARD: {}".format(discard))
            self.queue.append(key)
            self.cache_data[key] = item

    def get(self, key):
        """ Get an item by key
        """
        if key and key in self.cache_data:
            self.queue.remove(key)
            self.queue.append(key)
            return self.cache_data[key]
        return None
