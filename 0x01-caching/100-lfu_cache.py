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
        self.frequency_counter = {}
        self.used_counter = {}

    def put(self, key, item):
        """ Add an item in the cache
        """
        if key is None or item is None:
            return
        if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            lfu_keys = [k for k, v in self.frequency_counter.items(
            ) if v == min(self.frequency_counter.values())]
            if len(lfu_keys) > 1:
                lru_key = min(self.used_counter,
                              key=lambda k: self.used_counter[k])
                self.cache_data.pop(lru_key)
                self.frequency_counter.pop(lru_key)
                self.used_counter.pop(lru_key)
                print("DISCARD:", lru_key)

        self.cache_data[key] = item
        self.used_counter[key] = self.used_counter.get(key, 0) + 1
        self.frequency_counter[key] = self.frequency_counter.get(key, 0) + 1

    def get(self, key):
        """ Get an item by key
        """
        if key is None or key not in self.cache_data:
            return None

        self.used_counter[key] = self.used_counter.get(key, 0) + 1
        self.frequency_counter[key] = self.frequency_counter.get(key, 0) + 1
        return self.cache_data[key]
