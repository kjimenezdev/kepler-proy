"""
Unit tests for trivia.py
"""

from trivia import app

import unittest
import random

class TriviaTests(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        pass

    @classmethod
    def tearDownClass(cls):
        pass

    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def tearDown(self):
        pass

    # Utils

    def generate_random_data(self, n):
        limit = random.randint(0, n)
        usr = ''
        for i in range(0, limit):
            usr += str(random.randint(0, n))
        return usr

    # Basic tests

    def test_initial_status_code(self):
        res = self.app.get('/')
        self.assertEqual(res.status_code, 200)

    def test_initial_status(self):
        res = self.app.get('/')
        self.assertEqual(res.data, b'Welcome to the jungle')

    # User tests

    def test_get_users(self):
        res = self.app.get('/user')
        if not res.data:
            self.assertEqual(res.status_code, 201)
        else:
            self.assertEqual(res.status_code, 200)

    # def test_user_create(self):
    #     # self.generate_random_data()
    #     print (self.generate_random_data(10))
    #     data = {'username': self.generate_random_data(4),
    #             'password': self.generate_random_data(10)}
        # res = self.app.post('/user', data=data)
        # print(res.data)
        # print(res.status)

    def test_user_detail(self):
        res = self.app.get('/user/1')
        if not res.data:
            self.assertEqual(res.status_code, 201)
        else:
            self.assertEqual(res.status_code, 200)

    # def test_update(self):


if __name__ == '__main__':
    unittest.main()
