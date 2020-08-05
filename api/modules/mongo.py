from pymongo import MongoClient

class Mongo :
    def __init__(self, connect_string, db, pool_size):
        self.pool = []
        self.db = db
        i = 0
        while i < pool_size :
            self.pool.append(MongoClient(connect_string))
            i += 1
    
    def find_one(self, col, filter) :
        conn = self.pool.pop()
        result = conn[self.db][col].find_one(filter)
        self.pool.append(conn)
        return result

    def find(self, col, filter) :
        conn = self.pool.pop()
        result = conn[self.db][col].find(filter)
        self.pool.append(conn)
        return result
    
    def insert(self, col, object) :
        conn = self.pool.pop()
        result = conn[self.db][col].insert_one(object)
        self.pool.append(conn)
        return 0